import { useEffect, useRef } from 'react'
import { Mic } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import type { StepComponentProps } from '@/types'

export default function StepNarrative({
  data,
  update,
  next,
  back,
}: StepComponentProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const count = data.narrative.length
  const tooShort = count < 100

  useEffect(() => headingRef.current?.focus(), [])

  return (
    <div className="space-y-10">
      <div className="mb-4 text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/WriteIcon.png"
          alt=""
          className="mx-auto mb-4 h-24 w-28"
        />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mb-2 text-3xl font-bold text-cb-gold sm:text-4xl"
        >
          The Incident Narrative
        </h1>
        <p className="mx-auto max-w-lg text-sm text-cb-gray300">
          Describe the incident objectively. Avoid emotional language—focus on
          what was seen, heard, or documented.
        </p>
      </div>

      <div className="mx-auto space-y-8 rounded-2xl border border-cb-gray700 bg-cb-navy-dark/70 p-6 shadow-lg max-w-3xl">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-cb-gray300">
            <span>Incident Description (min 100 characters) *</span>
            <span className={tooShort ? 'text-cb-warning' : 'text-cb-success'}>
              {count}/100
            </span>
          </div>

          <Textarea
            value={data.narrative}
            onChange={(event) => update({ narrative: event.target.value })}
            placeholder="Write the narrative here. Include specifics such as quotes, actions, and any relevant sequence of events."
            className="min-h-[220px] rounded-xl border-cb-gray700 bg-cb-navy text-cb-gray100 focus-visible:ring-cb-gold"
          />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-cb-gray700 bg-cb-navy-dark/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-cb-gray300">
            <div className="font-medium text-cb-gray100">Voice dictation</div>
            <div>Tap start and dictate your narrative hands-free.</div>
          </div>
          <Button
            variant="outline"
            className="gap-2 border-cb-gold text-cb-gold hover:bg-cb-navy-light"
          >
            <Mic className="h-4 w-4" /> Start dictation
          </Button>
        </div>

        <Separator className="bg-cb-gray700" />

        <div className="flex gap-2 rounded-xl border border-cb-gold/40 bg-cb-navy-light/20 px-4 py-3 text-xs text-cb-gray100">
          <div className="mt-1 h-2 w-2 rounded-full bg-cb-gold" />
          <p>
            <strong className="text-cb-gold">Tip:</strong> Stick to facts. Avoid
            emotional interpretations or assumptions.
          </p>
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
          disabled={tooShort}
          onClick={() => next?.()}
          className="rounded-xl bg-cb-gold px-6 py-3 text-cb-navy hover:bg-cb-gold-light disabled:opacity-50"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
