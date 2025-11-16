import { useEffect, useRef, useState } from 'react'
import { FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEvidence } from '@/hooks/useEvidence'
import type { StepComponentProps } from '@/types'

const JURISDICTIONS = [
  'State court',
  'County court',
  'Family court',
  'Pending',
] as const

export default function StepJurisdiction({
  data,
  update,
  next,
  back,
}: StepComponentProps) {
  const [evidenceName, setEvidenceName] = useState('')
  const [evidenceType, setEvidenceType] = useState('')
  const { evidence, addEvidence, removeEvidence } = useEvidence({
    evidence: data.evidence,
    onChange: (items) => update({ evidence: items }),
  })
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const handleAdd = () => {
    if (!evidenceName.trim() || !evidenceType.trim()) return
    addEvidence({ name: evidenceName.trim(), type: evidenceType.trim() })
    setEvidenceName('')
    setEvidenceType('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-cb-gold-light">
        <FileText className="h-6 w-6" aria-hidden />
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-semibold text-cb-gray-100 focus:outline-none"
        >
          Jurisdiction & evidence
        </h1>
      </div>
      <p className="text-muted-foreground text-sm">
        Provide legal context and log any evidence tied to this incident.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Jurisdiction</Label>
          <Select
            value={data.jurisdiction ?? undefined}
            onValueChange={(value) => update({ jurisdiction: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select jurisdiction" />
            </SelectTrigger>
            <SelectContent>
              {JURISDICTIONS.map((entry) => (
                <SelectItem key={entry} value={entry}>
                  {entry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="case-number">Case number (optional)</Label>
          <Input
            id="case-number"
            value={data.caseNumber ?? ''}
            placeholder="e.g. 2024-FM-0123"
            onChange={(event) => update({ caseNumber: event.target.value })}
          />
        </div>
      </div>

      <section className="space-y-3">
        <p className="text-sm font-medium">Evidence log</p>
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            value={evidenceName}
            placeholder="Filename or description"
            onChange={(event) => setEvidenceName(event.target.value)}
          />
          <Input
            value={evidenceType}
            placeholder="Type (photo, message, etc.)"
            onChange={(event) => setEvidenceType(event.target.value)}
          />
          <Button type="button" onClick={handleAdd}>
            Save
          </Button>
        </div>
        <div className="rounded-md border">
          <div className="grid grid-cols-[2fr,1fr,auto] gap-2 border-b px-4 py-2 text-sm font-medium text-muted-foreground">
            <span>Name</span>
            <span>Type</span>
            <span className="text-right">Actions</span>
          </div>
          {evidence.length ? (
            evidence.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[2fr,1fr,auto] items-center gap-2 px-4 py-2 text-sm"
              >
                <span>{item.name}</span>
                <span>{item.type}</span>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEvidence(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="px-4 py-6 text-sm text-muted-foreground">
              No evidence logged yet.
            </p>
          )}
        </div>
      </section>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            back?.()
          }}
          disabled={!back}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            next?.()
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
