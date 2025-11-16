import { useEffect, useRef } from 'react'

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
    <div className="space-y-10">
      <div className="text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/CalendarClock.png"
          alt=""
          className="mx-auto mb-6 h-24 w-32"
          aria-hidden="true"
        />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mb-2 text-3xl font-bold text-cb-gold focus:outline-none sm:text-4xl"
        >
          When Did This Happen?
        </h1>

        <p className="mx-auto max-w-md text-sm text-cb-gray300">
          Record the exact date and approximate time of the incident.
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-6 rounded-xl border border-cb-gray700 bg-cb-navy-dark/70 p-6 shadow-lg">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cb-gray100">Date *</label>
          <Input
            type="date"
            value={data.date || ''}
            onChange={(event) => update({ date: event.target.value })}
            className="border-cb-gray700 bg-cb-navy text-cb-gray100 focus-visible:ring-cb-gold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cb-gray100">Time *</label>
          <Input
            type="time"
            value={data.time || ''}
            onChange={(event) => update({ time: event.target.value })}
            className="border-cb-gray700 bg-cb-navy text-cb-gray100 focus-visible:ring-cb-gold"
          />
        </div>
      </div>

      <div className="mx-auto flex max-w-2xl justify-between">
        <Button
          onClick={() => back?.()}
          className="rounded-xl border border-cb-gold bg-cb-navy px-6 py-3 text-cb-gold hover:bg-cb-navy-light"
        >
          ← Back
        </Button>

        <Button
          disabled={!canContinue}
          onClick={() => next?.()}
          className="rounded-xl bg-cb-gold px-6 py-3 font-semibold text-cb-navy hover:bg-cb-gold-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
