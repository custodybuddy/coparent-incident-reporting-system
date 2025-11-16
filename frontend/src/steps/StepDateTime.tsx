import { useEffect, useRef } from 'react'
import { CalendarClock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
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

  const isDisabled = !data.date || !data.time

  return (
    <Card className="rounded-2xl border border-cb-gray700 bg-cb-navy shadow-[0_0_0_1px_rgba(0,0,0,0.6),0_18px_45px_rgba(0,0,0,0.75)]">
      <CardHeader className="space-y-2 pt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-cb-gold-light">
          <CalendarClock className="h-5 w-5" aria-hidden />
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-xl font-semibold tracking-wide text-cb-gold focus:outline-none"
          >
            When did this occur?
          </h2>
        </div>
        <p className="mx-auto max-w-xl text-sm text-cb-gray300">
          Add the most accurate date and time you have. This helps the court see
          patterns, especially if incidents repeat.
        </p>
      </CardHeader>

      <CardContent className="space-y-6 pb-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-medium text-cb-gray300">
              Date *
            </label>
            <Input
              type="date"
              value={data.date ?? ''}
              onChange={(event) => update({ date: event.target.value })}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-cb-gray300">
              Time *
            </label>
            <Input
              type="time"
              value={data.time ?? ''}
              onChange={(event) => update({ time: event.target.value })}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="rounded-xl border border-cb-gray700 bg-[rgba(1,10,26,0.9)] px-4 py-3 text-xs text-cb-gray300">
          <p className="font-medium text-cb-gray100">Tip: timezone clarity</p>
          <p>
            If you’re coordinating across time zones, mention the location in
            your narrative to avoid confusion later.
          </p>
        </div>

        <Separator className="bg-cb-gray700" />

        <div className="rounded-xl border border-cb-gold/30 bg-[rgba(13,36,73,0.75)] px-4 py-3 text-xs text-cb-gray100">
          Consistency matters. If you don’t know the exact time, record your
          best estimate and explain why in the narrative.
        </div>
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
          disabled={isDisabled}
          onClick={() => next?.()}
        >
          Continue →
        </Button>
      </CardFooter>
    </Card>
  )
}
