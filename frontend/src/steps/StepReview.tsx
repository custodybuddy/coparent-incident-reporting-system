import { useEffect, useRef } from 'react'

import SectionCard from '@/components/SectionCard'
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
    <div className="space-y-8">
      <div className="text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/ReviewIcon.png"
          alt=""
          className="mx-auto mb-4 h-20 w-24"
        />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-bold text-cb-gold focus:outline-none sm:text-4xl"
        >
          Review & export
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-cb-gray300">
          Generate your AI summary, double-check the highlights, and export a polished PDF for court or counsel.
        </p>
      </div>

      <SectionCard className="space-y-6">
        {!report ? (
          <div className="text-center text-cb-gray300">
            {error && <p className="mb-2 text-cb-warning">{error}</p>}
            <p className="mb-5">Generate your professional summary based on the information provided.</p>
            <Button
              onClick={onGenerate}
              disabled={loading}
              className="rounded-full bg-cb-gold px-8 py-3 text-cb-navy hover:bg-cb-gold-light disabled:opacity-50"
            >
              {loading ? 'Generating…' : 'Generate Summary'}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 text-cb-gray100">
            <div>
              <h2 className="text-xl font-semibold text-cb-gold">Summary</h2>
              <p className="mt-2 text-sm text-cb-gray300">{report.summary}</p>
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-cb-gray400">Severity</h3>
                <p className="mt-1 capitalize text-white">{report.severity}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-cb-gray400">Legal note</h3>
                <p className="mt-1 text-xs text-cb-gray300">{report.legal}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Key facts</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-cb-gray300">
                {(report.keyFacts || []).map((fact, index) => (
                  <li key={`${fact}-${index}`}>{fact}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </SectionCard>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={() => back?.()}
          className="w-full rounded-full border border-white/20 bg-transparent px-8 py-3 text-cb-gray200 hover:bg-white/5 sm:w-auto"
        >
          ← Back
        </Button>

        {report ? (
          <Button
            onClick={onExport}
            className="w-full rounded-full bg-cb-gold px-8 py-3 text-cb-navy hover:bg-cb-gold-light sm:w-auto"
          >
            Print / Save PDF
          </Button>
        ) : (
          <Button
            onClick={onGenerate}
            disabled={loading}
            className="w-full rounded-full border border-cb-gold px-8 py-3 text-cb-gold hover:bg-white/5 disabled:opacity-50 sm:w-auto"
          >
            {loading ? 'Generating…' : 'Generate Summary'}
          </Button>
        )}
      </div>
    </div>
  )
}
