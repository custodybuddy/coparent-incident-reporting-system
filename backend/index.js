import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const META_PROMPT = `
You are CustodyBuddy AI — a trauma-informed family-law report assistant.
Rules:
- Neutral, factual, plain language.
- No first-person.
- No legal advice.
- JSON ONLY.
`;

function safeParse(text, fallback) {
  try { return JSON.parse(text); } catch { return fallback; }
}

app.post("/api/report", async (req, res) => {
  try {
    const incident = req.body.incident;

    const prompt = `
${META_PROMPT}

INCIDENT:
${JSON.stringify(incident, null, 2)}

Return JSON:
{
  "summary": "...",
  "key_facts": [],
  "timeline": [],
  "impact": "...",
  "category": "...",
  "severity": "...",
  "legal_context": "...",
  "disclaimer": "Informational only, not legal advice."
}
`;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.3,
    });

    const text = response.output_text || "";
    res.json(safeParse(text, { summary: text }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI Failure" });
  }
});

app.post("/api/evidence", async (req, res) => {
  try {
    const { base64, filename, mime, narrative } = req.body;

    const content = [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Analyze this evidence. Return JSON with description, relevance, limitations. Narrative: ${narrative}`,
          }
        ]
      }
    ];

    if (mime.startsWith("image/")) {
      content[0].content.push({ type: "input_image", image_url: base64 });
    } else {
      content[0].content.push({ type: "input_file", file_url: base64 });
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: content,
      temperature: 0.2,
    });

    const text = response.output_text || "";
    res.json(safeParse(text, { description: text }));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Evidence analysis failed" });
  }
});

app.listen(process.env.PORT, () =>
  console.log("Backend running on port", process.env.PORT)
);
