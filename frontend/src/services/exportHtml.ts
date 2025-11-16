import type { AiReport, EvidenceItem, IncidentData } from '@/types'

export function exportHtml(report: AiReport, incident: IncidentData) {
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Incident Report</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:wght@600;700&display=swap');
      :root {
        color-scheme: light;
        font-family: 'Inter', Arial, sans-serif;
      }
      body {
        margin: 0;
        padding: 32px;
        background: #ffffff;
        color: #0d2449;
        font-family: 'Inter', Arial, sans-serif;
        line-height: 1.6;
      }
      h1, h2, h3 {
        font-family: 'Lora', Georgia, serif;
        color: #0d2449;
        margin-bottom: 0.5rem;
      }
      section {
        margin-bottom: 1.75rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #d4a83b55;
      }
      .accent-line {
        height: 4px;
        width: 60px;
        background: #d4a83b;
        border-radius: 2px;
        margin: 0.5rem 0 1rem;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        font-size: 0.95rem;
      }
      th {
        text-align: left;
        background: #f8fafc;
        color: #0d2449;
      }
      th, td {
        border: 1px solid #d4a83b55;
        padding: 8px 12px;
      }
      .pill {
        display: inline-block;
        background: #fff9eb;
        color: #a67d2c;
        border: 1px solid #ffd677;
        border-radius: 999px;
        padding: 4px 10px;
        margin: 4px 4px 0 0;
        font-size: 0.85rem;
      }
    </style>
  </head>
  <body>
    <h1>Incident Report</h1>
    <div class="accent-line"></div>
    <section>
      <h2>AI Summary</h2>
      <p><strong>Category:</strong> ${report.category}</p>
      <p><strong>Severity:</strong> ${report.severity}</p>
      <p>${report.summary}</p>
      <p>${report.legal}</p>
    </section>
    <section>
      <h2>Incident Details</h2>
      <p><strong>Date:</strong> ${incident.date ?? 'N/A'}</p>
      <p><strong>Time:</strong> ${incident.time ?? 'N/A'}</p>
      <p><strong>Jurisdiction:</strong> ${incident.jurisdiction ?? 'N/A'}</p>
      <p><strong>Narrative:</strong></p>
      <p>${incident.narrative || 'No narrative provided.'}</p>
    </section>
    <section>
      <h2>Parties</h2>
      <div>
        ${
          incident.parties.length
            ? incident.parties
                .map((party: string) => `<span class="pill">${party}</span>`)
                .join('')
            : '<p>No parties provided.</p>'
        }
      </div>
    </section>
    <section>
      <h2>Evidence</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Type</th></tr>
        </thead>
        <tbody>
          ${
            incident.evidence.length
              ? incident.evidence
                  .map(
                    (item: EvidenceItem) =>
                      `<tr><td>${item.name}</td><td>${item.type}</td></tr>`
                  )
                  .join('')
              : '<tr><td colspan="2">No evidence uploaded.</td></tr>'
          }
        </tbody>
      </table>
    </section>
  </body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const popup = window.open(url, '_blank')

  if (!popup) {
    URL.revokeObjectURL(url)
    throw new Error('Popup blocked. Please allow popups for this site.')
  }
}
