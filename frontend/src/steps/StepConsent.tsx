import { useEffect, useRef } from 'react'

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
    <div className="space-y-10 animate-[fade-in_0.6s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]">
      <div className="mb-8 text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/AgreeIcon.png"
          alt="Document consent icon"
          className="mx-auto mb-6 h-24 w-36 object-contain"
          aria-hidden="true"
        />
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mb-2 text-3xl font-bold text-cb-gold focus:outline-none sm:text-4xl"
        >
          Before We Begin
        </h1>
        <p className="mx-auto max-w-md text-sm text-cb-gray300">
          Please review and acknowledge our terms before documenting your
          incident. This ensures transparency and legal compliance.
        </p>
      </div>

      <div
        className={`mx-auto max-w-2xl rounded-xl border bg-cb-navy-dark/70 p-6 shadow-lg transition-all duration-300 ${
          !data.consent ? 'border-cb-gray700' : 'border-cb-gold/50'
        }`}
      >
        <h3 className="mb-4 flex items-center font-bold text-cb-gray100">
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
          Required Acknowledgment
        </h3>
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={data.consent}
            onCheckedChange={(value) => update({ consent: Boolean(value) })}
            className="border-cb-gold text-cb-gold data-[state=checked]:bg-cb-gold data-[state=checked]:text-cb-navy"
          />
          <p className="text-sm text-cb-gray300 leading-relaxed">
            I acknowledge that I have read and agree to the{' '}
            <a
              href="https://custodybuddy.com/incident-report/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cb-gold hover:underline"
            >
              Privacy Policy
            </a>
            ,{' '}
            <a
              href="https://custodybuddy.com/incident-report/terms-of-use/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cb-gold hover:underline"
            >
              Terms of Service
            </a>
            , and{' '}
            <a
              href="https://custodybuddy.com/incident-report/legal-disclaimer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cb-gold hover:underline"
            >
              Legal Disclaimer
            </a>
            . I understand this tool provides informational summaries only and
            does not offer legal advice.
          </p>
        </div>
      </div>

      <Button
        disabled={!data.consent}
        onClick={() => next?.()}
        className="mx-auto block w-full rounded-xl bg-cb-gold px-6 py-3 font-semibold text-cb-navy transition hover:bg-cb-gold-light sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </Button>
    </div>
  )
}
