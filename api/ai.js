// Vercel serverless function. Lives at /api/ai and is called by the browser
// as a plain POST — no framework, no build step, matching how Ledger and
// Loupe are deployed. This is the one piece of server-side code Tailor needs:
// it holds the Anthropic key so it is never exposed to visitors.
//
// IMPORTANT: verify "claude-sonnet-4-6" below is still a current, valid model
// id on your Anthropic account before relying on this in production — model
// names are periodically retired. Check https://docs.claude.com for the
// current list if calls start failing with a model-not-found error.
const MODEL = "claude-sonnet-4-6";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: { message: "Method not allowed" } });
    return;
  }

  const { prompt, max_tokens } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    res.status(400).json({ error: { message: "Missing prompt" } });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: { message: "Server is not configured with an API key." } });
    return;
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: Math.min(Math.max(Number(max_tokens) || 4096, 256), 8192),
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const text = await upstream.text();

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: { message: "Anthropic API error: " + text.slice(0, 500) } });
      return;
    }

    // Pass the Anthropic response straight through. The front end already
    // knows how to read { content: [{ type: "text", text: "..." }] }.
    res.status(200).setHeader("Content-Type", "application/json").send(text);
  } catch (err) {
    res.status(500).json({ error: { message: err && err.message ? err.message : "Unexpected server error" } });
  }
};
