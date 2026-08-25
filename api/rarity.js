// Vercel serverless function: POST /api/rarity
// Body: { discipline: "uxr"|"design"|"pm", skills: ["...", "..."] }  (2-4 items)
// Returns: { pctRequiringAll, postingCount }
//
// Read-only against Meridian's Supabase corpus, same as /api/market. Computes
// the fraction of postings whose combined text mentions ALL of the given
// skills — normalized the same way the frontend's coverage() helper does
// (lowercase, strip non-alphanumerics, substring-tolerant).
const { fetchDiscipline } = require("./_lib/supabase");
const { DISCIPLINES } = require("./_lib/taxonomy");

function norm(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

function combinedNormText(job) {
  const parts = [job.title, job.summary, job.responsibilities, job.soft_skills, job.methods_mentioned, job.ai_context]
    .map((f) => (typeof f === "string" ? f : ""))
    .filter(Boolean);
  return norm(parts.join(" "));
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { discipline, skills } = req.body || {};
  const config = DISCIPLINES[discipline];
  if (!config) {
    res.status(400).json({ error: "Unknown or missing discipline. Use uxr, design, or pm." });
    return;
  }
  if (!Array.isArray(skills) || skills.length < 2 || skills.length > 4 || skills.some((s) => typeof s !== "string" || !s.trim())) {
    res.status(400).json({ error: "skills must be an array of 2 to 4 non-empty strings." });
    return;
  }

  try {
    const jobs = await fetchDiscipline(config.storageKey);
    const normSkills = skills.map(norm).filter(Boolean);
    const matching = jobs.filter((job) => {
      const text = combinedNormText(job);
      return normSkills.every((s) => text.includes(s));
    });

    res.status(200)
      .setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400")
      .json({
        pctRequiringAll: jobs.length ? Math.round((matching.length / jobs.length) * 100) : 0,
        postingCount: jobs.length,
      });
  } catch (err) {
    res.status(503).json({ error: (err && err.message) || "Rarity data unavailable" });
  }
};
