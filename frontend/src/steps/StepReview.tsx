import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import type { AiReport, StepComponentProps } from '@/types'

type StepReviewProps = StepComponentProps & {
  report: AiReport | null
  loading: boolean
  error?: string | null
  onGenerate: () => Promise<AiReport> | void
  onExport: () => void
}

export default function StepReview({
  report,
  loading,
  error,
  onGenerate,
  onExport,
  back,
}: StepReviewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => headingRef.current?.focus(), [])

  return (
    <div className="space-y-10">
      <div className="text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/ReviewIcon.png"
          alt=""
          className="mx-auto mb-4 h-24 w-28"
        />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mb-2 text-3xl font-bold text-cb-gold focus:outline-none sm:text-4xl"
        >
          Review & Export
        </h1>

        <p className="mx-auto max-w-lg text-sm text-cb-gray300">
          Review the AI-generated summary and export your report as a court-ready
          document.
        </p>
      </div>

      <div className="mx-auto space-y-6 rounded-2xl border border-cb-gray700 bg-cb-navy-dark/70 p-6 shadow-lg max-w-3xl">
        {!report ? (
          <div className="text-center text-cb-gray300">
            {error && <p className="mb-2 text-cb-warning">{error}</p>}
            <p className="mb-4">
              Generate your professional summary based on the information
              provided.
            </p>
            <Button
              onClick={onGenerate}
              disabled={loading}
              className="rounded-xl bg-cb-gold px-6 py-3 text-cb-navy hover:bg-cb-gold-light disabled:opacity-50"
            >
              {loading ? 'Generating…' : 'Generate Summary'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 text-cb-gray100">
            <div>
              <h2 className="text-xl font-semibold text-cb-gold">Summary</h2>
              <p className="text-sm text-cb-gray300">{report.summary}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-cb-gray100">
                Key Facts
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-cb-gray300">
                {(report.keyFacts || []).map((fact, index) => (
                  <li key={`${fact}-${index}`}>{fact}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-cb-gray100">
                Severity
              </h3>
              <p className="capitalize text-cb-gray300">{report.severity}</p>
            </div>

            <p className="text-xs text-cb-gray500">{report.legal}</p>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-3xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
        <Button
          onClick={() => back?.()}
          className="w-full sm:w-auto rounded-xl border border-cb-gold bg-cb-navy px-6 py-3 text-cb-gold hover:bg-cb-navy-light"
        >
          ← Back
        </Button>

        {report ? (
          <Button
            onClick={onExport}
            className="w-full sm:w-auto rounded-xl bg-cb-gold px-6 py-3 text-cb-navy hover:bg-cb-gold-light"
          >
            Print / Save PDF
          </Button>
        ) : (
          <Button
            onClick={onGenerate}
            disabled={loading}
            className="w-full sm:w-auto rounded-xl border border-cb-gold bg-transparent px-6 py-3 text-cb-gold hover:bg-cb-navy-light disabled:opacity-50"
          >
            {loading ? 'Generating…' : 'Generate Summary'}
          </Button>
        )}
      </div>
    </div>
  )
}
