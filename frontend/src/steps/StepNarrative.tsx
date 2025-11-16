import { useEffect, useRef } from 'react'
import { Mic } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import type { StepComponentProps } from '@/types'

const MIN_CHARACTERS = 100

export default function StepNarrative({
  data,
  update,
  next,
  back,
}: StepComponentProps) {
  const count = data.narrative.length
  const tooShort = count < MIN_CHARACTERS
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <Card className="rounded-2xl border border-cb-gray700 bg-cb-navy shadow-[0_0_0_1px_rgba(0,0,0,0.6),0_18px_45px_rgba(0,0,0,0.75)]">
      <CardHeader className="space-y-2 pt-8 text-center">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-xl font-semibold tracking-wide text-cb-gold focus:outline-none"
        >
          The Incident Narrative
        </h2>
        <p className="mx-auto max-w-xl text-sm text-cb-gray300">
          Describe the incident objectively. Our AI will filter out emotional
          language for the professional report.
        </p>
      </CardHeader>

      <CardContent className="space-y-6 pb-6">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between text-xs text-cb-gray300">
            <span>Incident Description (Min 100 characters) *</span>
            <span className={tooShort ? 'text-cb-warning' : 'text-green-400'}>
              {count} / 100 characters
            </span>
          </div>
          <Textarea
            className="min-h-[220px] resize-vertical rounded-xl border-cb-gray700 bg-cb-navy-dark text-cb-gray100 focus-visible:ring-cb-gold"
            value={data.narrative}
            onChange={(event) => update({ narrative: event.target.value })}
            placeholder="Write what happened in your own words. Include dates, times, quotes, and specific behaviour. Avoid guessing what the other person felt or intended."
          />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-cb-gray700 bg-[rgba(1,10,26,0.9)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-cb-gray300">
            <div className="font-medium text-cb-gray100">Voice dictation</div>
            <div>Tap start and dictate your narrative hands-free.</div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2 border-cb-gold text-cb-gold hover:bg-cb-navy-light"
          >
            <Mic className="h-4 w-4" />
            Start dictation
          </Button>
        </div>

        <Separator className="bg-cb-gray700" />

        <div className="flex items-start gap-2 rounded-xl border border-cb-gold/40 bg-[rgba(13,36,73,0.8)] px-4 py-3 text-xs text-cb-gray100">
          <div className="mt-1 h-2 w-2 rounded-full bg-cb-gold" />
          <p>
            <span className="mr-1 font-semibold">Focus on facts.</span>
            The more detail, the better. State what you saw or heard, not how
            you felt about it.
          </p>
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

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="border-cb-gray700 text-cb-gray300 hover:bg-cb-navy-light"
            onClick={() => update({ narrative: '' })}
          >
            Cancel &amp; Reset
          </Button>
          <Button
            type="button"
            className="bg-cb-gold px-6 font-semibold text-cb-navy hover:bg-cb-gold-light"
            disabled={tooShort}
            onClick={() => next?.()}
          >
            Next Step →
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
