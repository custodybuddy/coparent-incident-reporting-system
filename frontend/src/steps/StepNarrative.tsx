import { useEffect, useRef } from 'react'
import { Mic } from 'lucide-react'

import SectionCard from '@/components/SectionCard'
import { FormFieldStack } from '@/components/FormFieldStack'
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
    <div className="space-y-8">
      <div className="text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/WriteIcon.png"
          alt=""
          className="mx-auto mb-4 h-20 w-24"
        />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-bold text-cb-gold sm:text-4xl"
        >
          The incident narrative
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-cb-gray300">
          Describe what happened in the order it occurred. Stick to neutral language and what you saw, heard, or documented.
        </p>
      </div>

      <SectionCard className="space-y-8">
        <FormFieldStack
          label="Incident description"
          required
          helperText={
            <div className="flex flex-wrap items-center justify-between text-xs uppercase tracking-wide text-cb-gray400">
              <span>Minimum 100 characters</span>
              <span className={tooShort ? 'text-cb-warning' : 'text-cb-success'}>{count}/100</span>
            </div>
          }
          htmlFor="incident-narrative"
        >
          <Textarea
            id="incident-narrative"
            value={data.narrative}
            onChange={(event) => update({ narrative: event.target.value })}
            placeholder="Write the narrative here. Include specifics such as quotes, actions, and any relevant sequence of events."
          />
        </FormFieldStack>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-cb-gray300">
            <div className="font-semibold text-white">Voice dictation</div>
            <p className="text-xs text-cb-gray400">Tap start and dictate your narrative hands-free.</p>
          </div>
          <Button variant="outline" className="gap-2 rounded-full border-cb-gold text-cb-gold hover:bg-cb-navy-light">
            <Mic className="h-4 w-4" /> Start dictation
          </Button>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex items-start gap-3 rounded-2xl border border-cb-gold/40 bg-cb-navy-light/10 px-4 py-4 text-sm text-cb-gray100">
          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cb-gold" />
          <p>
            <strong className="text-cb-gold">Tip:</strong> Stick to facts. Avoid emotional interpretations or assumptions.
          </p>
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
          disabled={tooShort}
          onClick={() => next?.()}
          className="w-full rounded-full bg-cb-gold px-8 py-3 text-cb-navy hover:bg-cb-gold-light disabled:opacity-50 sm:w-auto"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
