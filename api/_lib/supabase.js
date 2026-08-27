// Read-only access to Meridian's chunked kv_store table. Tailor never writes,
// updates, or deletes anything here — GET requests against PostgREST only.
const READ_BATCH_SIZE = 5; // mirrors Meridian's own storage.js read batching

async function fetchRows(storageKey) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("Supabase credentials not configured");

  const headers = { apikey: key, Authorization: "Bearer " + key };
  let rows = [];
  for (let from = 0; ; from += READ_BATCH_SIZE) {
    const q =
      url + "/rest/v1/kv_store?select=value,idx,updated_at&key=eq." + encodeURIComponent(storageKey) +
      "&user_id=eq.admin&shared=eq.false&order=idx.asc&offset=" + from + "&limit=" + READ_BATCH_SIZE;
    const res = await fetch(q, { headers });
    if (!res.ok) throw new Error("Supabase read failed: " + res.status);
    const data = await res.json();
    if (!data.length) break;
    rows = rows.concat(data);
    if (data.length < READ_BATCH_SIZE) break;
  }
  if (!rows.length) throw new Error("No data found for key " + storageKey);
  return rows;
}

// A single logical value's chunks are written in one batch: idx 0..N-1,
// contiguous, all in the same fraction of a second. In production some keys
// (design, pm) carry orphaned chunks from an earlier or partial write that
// were never cleaned up — they always sit past a gap in idx and carry a
// different updated_at. Concatenating past that point corrupts the JSON, so
// reassembly stops at the first index gap or timestamp jump (>60s from the
// first chunk) rather than trusting every row returned for the key.
const STALE_CHUNK_WINDOW_MS = 60 * 1000;

function currentValueRows(rows) {
  const refTime = new Date(rows[0].updated_at).getTime();
  const valid = [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].idx !== i) break;
    if (Math.abs(new Date(rows[i].updated_at).getTime() - refTime) > STALE_CHUNK_WINDOW_MS) break;
    valid.push(rows[i]);
  }
  return valid;
}

async function fetchDiscipline(storageKey) {
  const rows = await fetchRows(storageKey);
  const current = currentValueRows(rows);
  if (!current.length) throw new Error("No contiguous data found for key " + storageKey);
  const combined = current.map((r) => r.value).join("");
  const parsed = JSON.parse(combined);
  const jobs = Array.isArray(parsed) ? parsed : Array.isArray(parsed.jobs) ? parsed.jobs : [];
  return jobs;
}

module.exports = { fetchDiscipline, fetchRows, currentValueRows };
