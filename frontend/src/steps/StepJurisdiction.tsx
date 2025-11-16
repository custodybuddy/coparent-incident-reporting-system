import { useEffect, useRef } from 'react'

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
    <div className="space-y-10">
      <div className="text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/LocationIcon.png"
          alt=""
          className="mx-auto mb-4 h-24 w-28"
        />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mb-2 text-3xl font-bold text-cb-gold sm:text-4xl"
        >
          Jurisdiction & Evidence
        </h1>

        <p className="mx-auto max-w-lg text-sm text-cb-gray300">
          Select your legal jurisdiction and upload any evidence related to the
          incident.
        </p>
      </div>

      <div className="mx-auto space-y-8 rounded-2xl border border-cb-gray700 bg-cb-navy-dark/70 p-6 shadow-lg max-w-3xl">
        <div className="space-y-2">
          <label className="text-sm text-cb-gray100">Jurisdiction *</label>
          <Select
            value={data.jurisdiction || ''}
            onValueChange={(value) => update({ jurisdiction: value })}
          >
            <SelectTrigger className="rounded-xl border-cb-gray700 bg-cb-navy text-cb-gray100">
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent className="border-cb-gray700 bg-cb-navy-dark text-cb-gray100">
              <SelectItem value="Ontario">Ontario</SelectItem>
              <SelectItem value="British Columbia">British Columbia</SelectItem>
              <SelectItem value="Alberta">Alberta</SelectItem>
              <SelectItem value="Quebec">Quebec</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <label className="text-sm text-cb-gray100">Evidence (optional)</label>

          <Input
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (!file) return
              update({
                evidence: [...(data.evidence || []), createEvidenceItem(file)],
              })
            }}
            className="rounded-xl border-cb-gray700 bg-cb-navy py-2 text-cb-gray100"
          />

          {data.evidence?.length ? (
            <ul className="space-y-2 rounded-xl border border-cb-gray700 bg-cb-navy/40 p-4 text-sm text-cb-gray100">
              {data.evidence.map((file: EvidenceItem) => (
                <li key={file.id} className="flex justify-between">
                  <span>{file.name}</span>
                  <button
                    onClick={() =>
                      update({
                        evidence: data.evidence.filter(
                          (existing) => existing.id !== file.id
                        ),
                      })
                    }
                    className="text-cb-warning hover:text-cb-danger"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl justify-between">
        <Button
          onClick={() => back?.()}
          className="rounded-xl border border-cb-gold bg-cb-navy px-6 py-3 text-cb-gold hover:bg-cb-navy-light"
        >
          ← Back
        </Button>
        <Button
          disabled={!hasJurisdiction}
          onClick={() => next?.()}
          className="rounded-xl bg-cb-gold px-6 py-3 text-cb-navy hover:bg-cb-gold-light disabled:opacity-50"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
