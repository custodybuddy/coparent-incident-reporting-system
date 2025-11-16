import { useEffect, useRef } from 'react'

import SectionCard from '@/components/SectionCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { EvidenceItem, StepComponentProps } from '@/types'

export default function StepJurisdiction({
  data,
  update,
  next,
  back,
}: StepComponentProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  const createEvidenceItem = (file: File): EvidenceItem => ({
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${file.name}-${Date.now()}`,
    name: file.name,
    type: file.type || 'upload',
  })

  useEffect(() => headingRef.current?.focus(), [])

  const hasJurisdiction = Boolean(data.jurisdiction)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/LocationIcon.png"
          alt=""
          className="mx-auto mb-4 h-20 w-24"
        />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-bold text-cb-gold sm:text-4xl"
        >
          Jurisdiction & evidence
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-cb-gray300">
          Tell us where this case applies and attach any files that support your narrative.
        </p>
      </div>

      <SectionCard className="space-y-8">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-cb-gray400">Jurisdiction *</label>
          <Select value={data.jurisdiction || ''} onValueChange={(value) => update({ jurisdiction: value })}>
            <SelectTrigger className="rounded-2xl border-white/10 bg-cb-navy text-cb-gray100">
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-cb-navy-dark text-cb-gray100">
              <SelectItem value="Ontario">Ontario</SelectItem>
              <SelectItem value="British Columbia">British Columbia</SelectItem>
              <SelectItem value="Alberta">Alberta</SelectItem>
              <SelectItem value="Quebec">Quebec</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <label className="text-xs uppercase tracking-wide text-cb-gray400">Evidence (optional)</label>

          <Input
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (!file) return
              update({
                evidence: [...(data.evidence || []), createEvidenceItem(file)],
              })
            }}
            className="rounded-2xl border-white/10 bg-cb-navy py-2 text-cb-gray100"
          />

          {data.evidence?.length ? (
            <ul className="space-y-3 text-sm text-cb-gray100">
              {data.evidence.map((file: EvidenceItem) => (
                <li
                  key={file.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="truncate pr-4">{file.name}</span>
                  <button
                    onClick={() =>
                      update({
                        evidence: data.evidence.filter((existing) => existing.id !== file.id),
                      })
                    }
                    className="text-xs font-semibold text-cb-warning hover:text-cb-danger"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-cb-gray400">Upload screenshots, call logs, or other supporting proof.</p>
          )}
        </div>
      </SectionCard>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={() => back?.()}
          className="w-full rounded-full border border-white/20 bg-transparent px-8 py-3 text-cb-gray200 hover:bg-white/5 sm:w-auto"
        >
          ← Back
        </Button>
        <Button
          disabled={!hasJurisdiction}
          onClick={() => next?.()}
          className="w-full rounded-full bg-cb-gold px-8 py-3 text-cb-navy hover:bg-cb-gold-light disabled:opacity-50 sm:w-auto"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
