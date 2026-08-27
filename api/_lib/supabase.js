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

async function fetchDiscipline(storageKey) {
  const rows = await fetchRows(storageKey);
  const combined = rows.map((r) => r.value).join("");
  const parsed = JSON.parse(combined);
  const jobs = Array.isArray(parsed) ? parsed : Array.isArray(parsed.jobs) ? parsed.jobs : [];
  return jobs;
}

module.exports = { fetchDiscipline, fetchRows };
