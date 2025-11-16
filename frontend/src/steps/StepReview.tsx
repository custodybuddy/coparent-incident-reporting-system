import { useEffect, useRef } from 'react'
import { Info } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import type { AiReport, StepComponentProps } from '@/types'

type StepReviewProps = StepComponentProps & {
  report: AiReport | null
  loading: boolean
  error?: string | null
  onGenerate: () => Promise<AiReport>
  onExport: () => void
}

export default function StepReview({
  data,
  back,
  report,
  loading,
  error,
  onGenerate,
  onExport,
}: StepReviewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])
  const handleGenerate = async () => {
    await onGenerate()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-cb-gold-light">
        <Info className="h-6 w-6" aria-hidden />
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-semibold text-cb-gray-100 focus:outline-none"
        >
          Review & AI summary
        </h1>
      </div>
      <p className="text-sm text-cb-gray300">
        Confirm details before exporting or sharing with counsel.
      </p>

      <section className="rounded-lg border p-4 text-sm">
        <p>
          <strong>Date:</strong> {data.date || 'Not provided'} at{' '}
          {data.time || 'Not provided'}
        </p>
        <p>
          <strong>Jurisdiction:</strong> {data.jurisdiction || 'Not provided'}
        </p>
        <p>
          <strong>Narrative:</strong> {data.narrative || 'Not provided'}
        </p>
        <p>
          <strong>Parties:</strong>{' '}
          {data.parties.length ? data.parties.join(', ') : 'None'}
        </p>
        <p>
          <strong>Evidence items:</strong> {data.evidence.length}
        </p>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">AI summary</h2>
          <p className="text-sm text-muted-foreground">
            The AI summary helps surface severity and legal notes for quick
            review. Always confirm details before sharing.
          </p>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Unable to generate</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {report ? (
          <div className="space-y-2 rounded-lg border p-4">
            <p className="text-sm font-semibold">{report.category}</p>
            <p className="text-sm capitalize">Severity: {report.severity}</p>
            <p className="text-sm">{report.summary}</p>
            <p className="text-xs text-muted-foreground">{report.legal}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No summary yet. Run the AI summary to populate this section.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating…' : 'Run AI summary'}
          </Button>
          <Button variant="secondary" onClick={onExport} disabled={!report}>
            Export HTML
          </Button>
        </div>
      </section>

      <div className="flex justify-start">
        <Button
          variant="outline"
          onClick={() => {
            back?.()
          }}
        >
          Back
        </Button>
      </div>
    </div>
  )
}
