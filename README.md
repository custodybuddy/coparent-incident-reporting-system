# ✅ **CUSTODYBUDDY LITE — PRODUCTION-READY ARCHITECTURE BLUEPRINT**

### *Using: React + Vite + OpenAI GPT-4o-mini + Local Storage + IndexedDB + Modular Hooks*

Clean, maintainable, 6-step workflow, improved accessibility, minimal bloat.

---

# 1. **High-Level System Architecture**

```
React SPA
│
├── App.tsx
│     └── useWizard() orchestration
│
├── Steps/
│     ├── StepConsent
│     ├── StepDateTime
│     ├── StepNarrative
│     ├── StepParties
│     ├── StepJurisdiction
│     └── StepReview
│
├── Hooks/
│     ├── useWizard.ts
│     ├── useIncidentState.ts
│     ├── useAiReport.ts
│     ├── useEvidence.ts
│     └── useSpeech.js (optional)
│
├── Services/
│     ├── openaiClient.ts
│     ├── aiSummary.ts
│     ├── aiEvidence.ts
│     ├── htmlExport.ts
│     └── legalPostprocess.ts
│
└── Storage/
      ├── localStorageState.ts
      └── indexedDbEvidence.ts
```

**Key simplifications**

* Replaced 5–6 hooks with **3 core hooks**.
* Removed cross-hook orchestration complexity.
* Evidence pipeline reduced to one hook + one service file.
* AI prompts unified in one place for easier maintenance.
* Strong focus on accessibility (ARIA, keyboard flow, contrast, readable semantics).

---

# 2. **Core Data Models**

Use simple stable TypeScript interfaces:

```ts
export interface IncidentData {
  consent: boolean;
  date: string | null;
  time: string | null;
  narrative: string;
  parties: string[];
  children: string[];
  jurisdiction: string | null;
  caseNumber?: string;
  evidence: EvidenceItem[];
}

export interface EvidenceItem {
  id: string;
  name: string;
  type: string;
  base64?: string;      
  analysis?: string;    
}

export interface AiReport {
  summary: string;
  category: string;
  severity: "low" | "medium" | "high";
  legal: string;     
}
```

---

# 3. **The 3 Essential Hooks (Partial Code)**

---

# 🔵 **HOOK 1 — useIncidentState**

Handles:

* All form fields
* Validation
* Local persistence
* Navigation gating

```ts
import { useEffect, useState } from "react";

export function useIncidentState() {
  const [data, setData] = useState<IncidentData>(() => {
    const saved = localStorage.getItem("incident");
    return saved ? JSON.parse(saved) : {
      consent: false,
      date: null,
      time: null,
      narrative: "",
      parties: [],
      children: [],
      jurisdiction: null,
      evidence: []
    };
  });

  const [step, setStep] = useState(1);

  useEffect(() => {
    localStorage.setItem("incident", JSON.stringify(data));
  }, [data]);

  const update = (patch: Partial<IncidentData>) =>
    setData(prev => ({ ...prev, ...patch }));

  const validateStep = (n: number) => {
    switch (n) {
      case 1: return data.consent;
      case 2: return data.date && data.time;
      case 3: return data.narrative.length >= 100;
      case 4: return data.parties.length > 0;
      case 5: return data.jurisdiction != null;
      default: return true;
    }
  };

  const next = () => validateStep(step) && setStep(step + 1);
  const back = () => setStep(step - 1);

  return { data, update, step, next, back };
}
```

---

# 🔵 **HOOK 2 — useEvidence**

Handles:

* File → base64
* ID generation
* Optional AI analysis trigger
* IndexedDB stub (simple version)

```ts
import { useState } from "react";

export function useEvidence() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const ingest = async (file: File) => {
    const id = crypto.randomUUID();
    const base64 = await fileToBase64(file);
    return { id, name: file.name, type: file.type, base64 };
  };

  const analyze = async (item: EvidenceItem, runAnalysis: (b64: string, type: string) => Promise<string>) => {
    setLoadingId(item.id);
    const result = await runAnalysis(item.base64!, item.type);
    setLoadingId(null);
    return result;
  };

  return { ingest, analyze, loadingId };
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

---

# 🔵 **HOOK 3 — useAiReport**

Handles:

* AI summary
* Category + severity
* Legal insights
* Web search integration (if needed)

This uses the Responses API (from JS examples in your uploaded docs).

```ts
import OpenAI from "openai";

const client = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_KEY });

export function useAiReport() {
  const generate = async (incident: IncidentData) => {
    const res = await client.responses.create({
      model: "gpt-4o-mini",
      tools: [{ type: "web_search" }],                 // integrates live info
      input: buildPrompt(incident),
      temperature: 0.3
    });

    const text = res.output_text || "";
    return parseAiOutput(text);
  };

  return { generate };
}

function buildPrompt(d: IncidentData) {
  return `
You are a Family Law Report Assistant… (meta prompt omitted for brevity)

FACTS:
Date: ${d.date}
Time: ${d.time}
Parties: ${d.parties.join(", ")}
Children: ${d.children.join(", ")}
Narrative: ${d.narrative}

TASK:
Return JSON ONLY:
{
  "summary": "...",
  "category": "...",
  "severity": "...",
  "legal": "..."
}
`;
}

function parseAiOutput(text: string): AiReport {
  try { return JSON.parse(text); }
  catch { return { summary: text, category: "unknown", severity: "medium", legal: "" }; }
}
```

---

# 4. **AI Evidence Analyzer (Partial Code)**

Uses an image or file input (pattern directly from your `Javascript - OPENAI` file: )

```ts
export async function aiAnalyzeEvidence(base64: string, mime: string) {
  const res = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: "Analyze this evidence and explain its relevance." },
          { type: "input_image", image_url: base64 }
        ]
      }
    ]
  });

  return res.output_text;
}
```

For PDFs or other docs:

```ts
{ type: "input_file", file_url: base64 }
```

---

# 5. **Simplified Wizard Orchestration (Partial Code)**

```ts
export function useWizard() {
  const { data, update, step, next, back } = useIncidentState();
  const { generate } = useAiReport();
  const [report, setReport] = useState<AiReport | null>(null);

  const runAi = async () => {
    const r = await generate(data);
    setReport(r);
  };

  return { step, next, back, data, update, report, runAi };
}
```

---

# 6. **Partial HTML Export Service**

```ts
export function exportHtml(report: AiReport, incident: IncidentData) {
  const html = `
<html><body>
<h1>Incident Report</h1>
<p>${report.summary}</p>
<h2>Evidence</h2>
${incident.evidence.map(e => `<div>${e.name}</div>`).join("")}
</body></html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const w = window.open(url, "_blank");
  if (!w) alert("Popup blocked—please allow popups.");
}
```

---

# 7. **Accessibility Improvements (Built-In)**

### ✔ Keyboard-first

* Arrow keys to move timeline
* Enter to continue
* Escape closes modals

### ✔ Focus management

Each step calls:

```ts
useEffect(() => {
  stepRef.current?.focus();
}, [step]);
```

### ✔ High contrast mode

* Navy background replaced with **matte dark gray**
* Gold replaced with **WCAG AA amber**
* Text always min contrast **4.5:1**

### ✔ Screen reader labels

All icons use:

```html
<span role="img" aria-label="Next step">➡</span>
```

### ✔ Narration / mic button includes live region

```html
<div aria-live="polite">{interimTranscript}</div>
```

---

# 8. **Simplified Step Flow (User-Friendly)**

### Step 1 — Consent

Single checkbox, keyboard + verbal feedback.

### Step 2 — Date & Time

Single combined widget:
"Select date and time" → one calendar → one time wheel.

### Step 3 — Narrative

Full-width textarea, character counter, dictation.

### Step 4 — Who is involved

Simplified checkboxes, large targets, “+ Add custom”.

### Step 5 — Jurisdiction & Evidence

Two-column layout for desktop, stacked on mobile.

### Step 6 — AI Review

* Smooth loading
* Summary first
* Evidence log
* Legal references
* Export buttons pinned


