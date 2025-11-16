import { useEffect, useRef } from 'react'
import { Clock } from 'lucide-react'

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-cb-gold-light">
        <Clock className="h-6 w-6" aria-hidden />
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-semibold text-cb-gray-100 focus:outline-none"
        >
          When did this occur?
        </h1>
      </div>
      <p className="text-muted-foreground text-sm">
        Use the best information you have. You can always edit this later.
      </p>
      <Input
        type="date"
        value={data.date ?? ''}
        onChange={(event) => update({ date: event.target.value })}
      />
      <Input
        type="time"
        value={data.time ?? ''}
        onChange={(event) => update({ time: event.target.value })}
      />
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
          disabled={!data.date || !data.time}
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
