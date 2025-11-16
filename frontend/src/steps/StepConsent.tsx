import { useEffect, useRef } from 'react'

import { Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { StepComponentProps } from '@/types'

export default function StepConsent({ data, update, next }: StepComponentProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-cb-gold-light">
        <Shield className="h-6 w-6" aria-hidden />
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-semibold text-cb-gray-100 focus:outline-none"
        >
          Consent & Acknowledgment
        </h1>
      </div>
      <p className="text-muted-foreground text-sm">
        Confirm you understand this tool provides informational summaries only
        and that sensitive information should be stored responsibly.
      </p>
      <div className="flex items-start space-x-3 rounded-md border p-4">
        <Checkbox
          checked={data.consent}
          onCheckedChange={(value) => update({ consent: Boolean(value) })}
        />
        <p className="text-sm text-muted-foreground">
          I have consent to record these events and understand this is not legal
          advice.
        </p>
      </div>
      <Button
        disabled={!data.consent}
        onClick={() => {
          next?.()
        }}
      >
        Continue
      </Button>
    </div>
  )
}
