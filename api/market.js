// Vercel serverless function: GET /api/market?discipline=uxr|design|pm
//
// Reassembles Meridian's chunked corpus for the requested discipline (Supabase
// kv_store, user_id="admin", READ-ONLY — never write/update/delete) and
// computes every live market aggregate Tailor uses. AI writes no numbers here;
// this file is 100% deterministic aggregation.
//
// Env vars required (server-side only, never exposed to the browser):
//   SUPABASE_URL, SUPABASE_SERVICE_KEY
const { fetchDiscipline } = require("./_lib/supabase");
const { DISCIPLINES, canonicalMethodName, toolsInRecord, respThemeCounts, SENIORITY_ORDER, normalizeSeniorityForTailor, percentile } = require("./_lib/taxonomy");

const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_SALARY_SAMPLE = 8;
const MIN_YEARS_SAMPLE = 5;

function splitCsv(raw) {
  if (!raw || typeof raw !== "string") return [];
  const low = raw.trim().toLowerCase();
  if (!low || low === "none mentioned" || low === "n/a" || low === "not specified") return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function recordDate(job) {
  // Prefer date_posted (date the role went live); fall back to date_sourced
  // (when Meridian's pull captured it) if the posting date is missing.
  const raw = job.date_posted || (job.date_sourced ? job.date_sourced.slice(0, 10) : null);
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

function pctOf(count, total) {
  return total > 0 ? Math.round((count / total) * 100) : 0;
}

function topList(countMap, total, limit) {
  return Object.keys(countMap)
    .map((name) => ({ name, pct: pctOf(countMap[name], total) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, limit || 10);
}

function distOf(values) {
  if (!values.length) return null;
  const sorted = values.slice().sort((a, b) => a - b);
  return {
    p25: Math.round(percentile(sorted, 0.25)),
    p50: Math.round(percentile(sorted, 0.5)),
    p75: Math.round(percentile(sorted, 0.75)),
    p90: Math.round(percentile(sorted, 0.9)),
  };
}

function computeAggregate(jobs, internal) {
  const total = jobs.length;

  // ── topMethods: canonicalize each posting's methods_mentioned tokens ──
  const methodCounts = {};
  const methodsPerJob = jobs.map((job) => {
    const names = new Set();
    splitCsv(job.methods_mentioned).forEach((tok) => {
      const canon = canonicalMethodName(tok, internal);
      if (canon) names.add(canon);
    });
    names.forEach((n) => { methodCounts[n] = (methodCounts[n] || 0) + 1; });
    return names;
  });

  // ── topSoftSkills: raw normalized phrase frequency (no taxonomy exists) ──
  const skillCounts = {};
  jobs.forEach((job) => {
    const seen = new Set();
    splitCsv(job.soft_skills).forEach((raw) => {
      const key = raw.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      // Preserve the first-seen casing as the display label.
      skillCounts[key] = skillCounts[key] || { label: raw, count: 0 };
      skillCounts[key].count++;
    });
  });
  const topSoftSkills = Object.values(skillCounts)
    .map((s) => ({ name: s.label, pct: pctOf(s.count, total) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 8);

  // ── topTools: alias-match combined free text against the tool registry ──
  const toolCounts = {};
  jobs.forEach((job) => {
    toolsInRecord(job, internal).forEach((name) => { toolCounts[name] = (toolCounts[name] || 0) + 1; });
  });
  const topTools = topList(toolCounts, total, 8);

  // ── topResponsibilities: keyword-theme bucketing (Meridian's own method) ──
  const respCounts = respThemeCounts(jobs, internal);
  const topResponsibilities = respCounts
    .map((r) => ({ name: r.name, pct: pctOf(r.count, total) }))
    .slice(0, 8);

  const aiMentionCount = jobs.filter((j) => j.ai_mentioned === true).length;
  const degreeCount = jobs.filter((j) => j.degree_required === true).length;

  // ── salaryRanges: p25 of stated lows, p75 of stated highs, per level ──
  const salaryRanges = {};
  SENIORITY_ORDER.forEach((level) => {
    const lows = [];
    const highs = [];
    jobs.forEach((j) => {
      if (normalizeSeniorityForTailor(j.seniority) !== level) return;
      if (typeof j.salary_low !== "number" && typeof j.salary_high !== "number") return;
      const lo = typeof j.salary_low === "number" ? j.salary_low : j.salary_high;
      const hi = typeof j.salary_high === "number" ? j.salary_high : j.salary_low;
      lows.push(lo);
      highs.push(hi);
    });
    if (lows.length >= MIN_SALARY_SAMPLE) {
      const lowsSorted = lows.slice().sort((a, b) => a - b);
      const highsSorted = highs.slice().sort((a, b) => a - b);
      salaryRanges[level] = [
        Math.round(percentile(lowsSorted, 0.25)),
        Math.round(percentile(highsSorted, 0.75)),
      ];
    }
  });

  // ── requirementsCountDist: distinct methods + distinct soft skills per posting ──
  const requirementsCounts = jobs.map((job, i) => {
    const methodCount = methodsPerJob[i].size;
    const skillCount = new Set(splitCsv(job.soft_skills).map((s) => s.toLowerCase())).size;
    return methodCount + skillCount;
  }).filter((n) => n > 0);
  const requirementsCountDist = distOf(requirementsCounts);

  // ── responsibilityCountDist: comma-separated phrase count per posting ──
  const responsibilityCounts = jobs
    .map((j) => splitCsv(j.responsibilities).length)
    .filter((n) => n > 0);
  const responsibilityCountDist = distOf(responsibilityCounts);

  // ── yearsBySeniority: years_experience_low distribution per level ──
  const yearsBySeniority = {};
  SENIORITY_ORDER.forEach((level) => {
    const years = jobs
      .filter((j) => normalizeSeniorityForTailor(j.seniority) === level && typeof j.years_experience_low === "number")
      .map((j) => j.years_experience_low);
    if (years.length >= MIN_YEARS_SAMPLE) {
      const sorted = years.slice().sort((a, b) => a - b);
      yearsBySeniority[level] = {
        p25: Math.round(percentile(sorted, 0.25)),
        p50: Math.round(percentile(sorted, 0.5)),
        p75: Math.round(percentile(sorted, 0.75)),
      };
    }
  });

  // ── updatedAt: max record date in corpus ──
  const dates = jobs.map(recordDate).filter(Boolean);
  const updatedAt = dates.length
    ? new Date(Math.max.apply(null, dates.map((d) => d.getTime()))).toISOString().slice(0, 10)
    : null;

  return {
    total,
    topMethods: topList(methodCounts, total, 10),
    topSoftSkills,
    topTools,
    topResponsibilities,
    aiMentionRate: pctOf(aiMentionCount, total),
    degreeRate: pctOf(degreeCount, total),
    salaryRanges,
    requirementsCountDist,
    responsibilityCountDist,
    yearsBySeniority,
    updatedAt,
    methodCounts, // kept internally for trend computation below
  };
}

// Current 90 days vs prior 90 days, bucketed by recordDate(). Postings with no
// usable date are excluded from trend windows (they still count in the
// whole-corpus aggregates above).
function computeTrends(jobs, internal, wholeCorpusMethodCounts, totalAll) {
  const now = Date.now();
  const currentStart = now - 90 * DAY_MS;
  const priorStart = now - 180 * DAY_MS;

  const current = jobs.filter((j) => { const d = recordDate(j); return d && d.getTime() >= currentStart; });
  const prior = jobs.filter((j) => { const d = recordDate(j); const t = d && d.getTime(); return t && t >= priorStart && t < currentStart; });

  const aiRate = (arr) => pctOf(arr.filter((j) => j.ai_mentioned === true).length, arr.length);

  const methodPctByWindow = (arr) => {
    const counts = {};
    arr.forEach((job) => {
      const names = new Set();
      splitCsv(job.methods_mentioned).forEach((tok) => {
        const canon = canonicalMethodName(tok, internal);
        if (canon) names.add(canon);
      });
      names.forEach((n) => { counts[n] = (counts[n] || 0) + 1; });
    });
    const out = {};
    Object.keys(counts).forEach((n) => { out[n] = pctOf(counts[n], arr.length); });
    return out;
  };

  const currentMethodPct = methodPctByWindow(current);
  const priorMethodPct = methodPctByWindow(prior);
  const allMethodNames = new Set([...Object.keys(currentMethodPct), ...Object.keys(priorMethodPct)]);
  const methods = [...allMethodNames]
    .map((name) => ({ name, currentPct: currentMethodPct[name] || 0, priorPct: priorMethodPct[name] || 0 }))
    .filter((m) => Math.abs(m.currentPct - m.priorPct) >= 3)
    .sort((a, b) => Math.abs(b.currentPct - b.priorPct) - Math.abs(a.currentPct - a.priorPct))
    .slice(0, 8);

  return {
    aiMentionRate: { current: aiRate(current), prior: aiRate(prior) },
    methods,
    postingVolume: { current: current.length, prior: prior.length },
  };
}

module.exports = async function handler(req, res) {
  const discipline = (req.query && req.query.discipline) || "";
  const config = DISCIPLINES[discipline];
  if (!config) {
    res.status(400).json({ error: "Unknown or missing discipline. Use uxr, design, or pm." });
    return;
  }

  try {
    const jobs = await fetchDiscipline(config.storageKey);
    const agg = computeAggregate(jobs, config.internal);
    const trends = computeTrends(jobs, config.internal, agg.methodCounts, agg.total);
    delete agg.methodCounts;

    const body = {
      discipline,
      postingCount: agg.total,
      updatedAt: agg.updatedAt,
      topMethods: agg.topMethods,
      topSoftSkills: agg.topSoftSkills,
      topTools: agg.topTools,
      topResponsibilities: agg.topResponsibilities,
      aiMentionRate: agg.aiMentionRate,
      degreeRate: agg.degreeRate,
      salaryRanges: agg.salaryRanges,
      requirementsCountDist: agg.requirementsCountDist,
      responsibilityCountDist: agg.responsibilityCountDist,
      yearsBySeniority: agg.yearsBySeniority,
      trends,
    };

    res.status(200)
      .setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400")
      .json(body);
  } catch (err) {
    res.status(503).json({ error: (err && err.message) || "Market data unavailable" });
  }
};
