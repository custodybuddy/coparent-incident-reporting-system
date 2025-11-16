import { useEffect, useRef } from 'react'

import SectionCard from '@/components/SectionCard'
import { FormFieldGrid, FormFieldStack } from '@/components/FormFieldStack'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { StepComponentProps } from '@/types'

export default function StepDateTime({
  data,
  update,
  next,
  back,
}: StepComponentProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const canContinue = Boolean(data.date && data.time)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/CalendarClock.png"
          alt=""
          className="mx-auto mb-6 h-20 w-24"
          aria-hidden="true"
        />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-bold text-cb-gold focus:outline-none sm:text-4xl"
        >
          When did this happen?
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-cb-gray300">
          Capture the exact date and the best-estimate time so investigators can understand the sequence of events.
        </p>
      </div>

      <SectionCard className="space-y-6">
        <FormFieldGrid columns={2}>
          <FormFieldStack label="Date" required htmlFor="incident-date">
            <Input
              id="incident-date"
              type="date"
              value={data.date || ''}
              onChange={(event) => update({ date: event.target.value })}
            />
          </FormFieldStack>

          <FormFieldStack label="Time" required htmlFor="incident-time">
            <Input
              id="incident-time"
              type="time"
              value={data.time || ''}
              onChange={(event) => update({ time: event.target.value })}
            />
          </FormFieldStack>
        </FormFieldGrid>

        <p className="text-xs text-cb-gray400">
          Tip: Approximate time is okay—note what you remember most clearly.
        </p>
      </SectionCard>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={() => back?.()}
          className="w-full rounded-full border border-white/20 bg-transparent px-8 py-3 text-cb-gray200 hover:bg-white/5 sm:w-auto"
        >
          ← Back
        </Button>

        <Button
          disabled={!canContinue}
          onClick={() => next?.()}
          className="w-full rounded-full bg-cb-gold px-8 py-3 font-semibold text-cb-navy hover:bg-cb-gold-light disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
