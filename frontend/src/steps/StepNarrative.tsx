import { useEffect, useMemo, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { StepComponentProps } from '@/types'

const MIN_CHARACTERS = 100

export default function StepNarrative({
  data,
  update,
  next,
  back,
}: StepComponentProps) {
  const count = useMemo(() => data.narrative.length, [data.narrative])
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="space-y-4">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-3xl font-semibold text-cb-gray-100 focus:outline-none"
      >
        Describe what happened
      </h1>
      <p className="text-muted-foreground text-sm">
        Focus on objective facts, quotes, and observable impact. Minimum 100
        characters for better AI output.
      </p>
      <Textarea
        value={data.narrative}
        onChange={(event) => update({ narrative: event.target.value })}
        placeholder="Provide factual information…"
        className="min-h-[180px]"
      />
      <p className="text-muted-foreground text-sm">{count}/100 characters</p>
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
          disabled={count < MIN_CHARACTERS}
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
