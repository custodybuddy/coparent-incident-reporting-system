import { useEffect, useRef, useState } from 'react'
import { FileText, UploadCloud } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
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
    <Card className="rounded-2xl border border-cb-gray700 bg-cb-navy shadow-[0_0_0_1px_rgba(0,0,0,0.6),0_18px_45px_rgba(0,0,0,0.75)]">
      <CardHeader className="space-y-2 pt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-cb-gold-light">
          <FileText className="h-5 w-5" aria-hidden />
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-xl font-semibold tracking-wide text-cb-gold focus:outline-none"
          >
            Jurisdiction & Evidence
          </h2>
        </div>
        <p className="mx-auto max-w-2xl text-sm text-cb-gray300">
          Note which court has authority and log exhibits tied to this incident.
          Organized evidence helps judges follow the timeline.
        </p>
      </CardHeader>

      <CardContent className="space-y-6 pb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs text-cb-gray300">Jurisdiction *</Label>
            <Select
              value={data.jurisdiction ?? undefined}
              onValueChange={(value) => update({ jurisdiction: value })}
            >
              <SelectTrigger className="rounded-xl">
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
            <Label className="text-xs text-cb-gray300" htmlFor="case-number">
              Case number (optional)
            </Label>
            <Input
              id="case-number"
              value={data.caseNumber ?? ''}
              placeholder="e.g. 2024-FM-0123"
              onChange={(event) => update({ caseNumber: event.target.value })}
              className="rounded-xl"
            />
          </div>
        </div>

        <Separator className="bg-cb-gray700" />

        <div className="rounded-xl border border-cb-gray700 bg-[rgba(1,10,26,0.9)] px-4 py-4 text-xs text-cb-gray300">
          <p className="font-medium text-cb-gray100">What counts as evidence?</p>
          <p>
            Screenshots, call logs, police reports, therapy notes, or any other
            digital file. Add a short label so you can find it quickly later.
          </p>
        </div>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <UploadCloud className="h-4 w-4 text-cb-gold-light" aria-hidden />
            <p className="text-sm font-medium text-cb-gray100">
              Evidence log
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Input
              value={evidenceName}
              placeholder="Filename or description"
              onChange={(event) => setEvidenceName(event.target.value)}
              className="rounded-xl"
            />
            <Input
              value={evidenceType}
              placeholder="Type (photo, message, etc.)"
              onChange={(event) => setEvidenceType(event.target.value)}
              className="rounded-xl"
            />
            <Button type="button" onClick={handleAdd}>
              Save
            </Button>
          </div>
          <div className="rounded-xl border border-cb-gray700">
            <div className="grid grid-cols-[2fr,1fr,auto] gap-2 border-b border-cb-gray700 px-4 py-2 text-xs font-medium text-cb-gray300">
              <span>Name</span>
              <span>Type</span>
              <span className="text-right">Actions</span>
            </div>
            {evidence.length ? (
              evidence.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2fr,1fr,auto] items-center gap-2 px-4 py-2 text-sm text-cb-gray100"
                >
                  <span>{item.name}</span>
                  <span>{item.type}</span>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-cb-gray300 hover:text-cb-gold"
                      onClick={() => removeEvidence(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="px-4 py-6 text-sm text-cb-gray300">
                No evidence logged yet.
              </p>
            )}
          </div>
        </section>
      </CardContent>

      <CardFooter className="flex items-center justify-between rounded-b-2xl border-t border-cb-gray700 bg-[rgba(1,10,26,0.9)] px-6 py-4">
        <Button
          type="button"
          variant="outline"
          className="border-cb-gold text-cb-gold hover:bg-cb-navy-light"
          onClick={() => back?.()}
          disabled={!back}
        >
          ← Back
        </Button>
        <Button
          type="button"
          className="bg-cb-gold px-6 font-semibold text-cb-navy hover:bg-cb-gold-light"
          onClick={() => next?.()}
        >
          Next Step →
        </Button>
      </CardFooter>
    </Card>
  )
}
