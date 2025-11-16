import { useEffect, useRef } from 'react'

import SectionCard from '@/components/SectionCard'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { StepComponentProps } from '@/types'

export default function StepConsent({
  data,
  update,
  next,
}: StepComponentProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="space-y-8 animate-[fade-in_0.6s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]">
      <div className="text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/AgreeIcon.png"
          alt="Document consent icon"
          className="mx-auto mb-6 h-20 w-24 object-contain"
          aria-hidden="true"
        />
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-bold text-cb-gold focus:outline-none sm:text-4xl"
        >
          Before We Begin
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-cb-gray300">
          Review and acknowledge the legal terms below so we can keep every report transparent and compliant.
        </p>
      </div>

      <SectionCard className={`transition-colors duration-300 ${data.consent ? 'border-cb-gold/40' : ''}`}>
        <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="mr-2 h-5 w-5 text-cb-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 11 3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          Required acknowledgment
        </h2>
        <div className="flex flex-col gap-4 text-sm text-cb-gray300 sm:flex-row sm:items-start">
          <Checkbox
            checked={data.consent}
            onCheckedChange={(value) => update({ consent: Boolean(value) })}
            className="border-cb-gold text-cb-gold data-[state=checked]:bg-cb-gold data-[state=checked]:text-cb-navy"
          />
          <p className="leading-relaxed">
            I acknowledge that I have read and agree to the{' '}
            <a
              href="https://custodybuddy.com/incident-report/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cb-gold underline-offset-2 hover:underline"
            >
              Privacy Policy
            </a>
            ,{' '}
            <a
              href="https://custodybuddy.com/incident-report/terms-of-use/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cb-gold underline-offset-2 hover:underline"
            >
              Terms of Service
            </a>
            , and{' '}
            <a
              href="https://custodybuddy.com/incident-report/legal-disclaimer/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cb-gold underline-offset-2 hover:underline"
            >
              Legal Disclaimer
            </a>
            . I understand this tool provides informational summaries only and does not offer legal advice.
          </p>
        </div>
      </SectionCard>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          disabled={!data.consent}
          onClick={() => next?.()}
          className="w-full rounded-full bg-cb-gold px-8 py-3 font-semibold text-cb-navy transition hover:bg-cb-gold-light focus-visible:ring-2 focus-visible:ring-cb-gold-light sm:w-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
