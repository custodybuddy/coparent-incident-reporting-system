import { useCallback, useMemo, useState } from 'react'

import type { WizardStep } from '@/types'
import { useAiReport } from './useAiReport'
import { useIncidentState } from './useIncidentState'

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'consent',
    title: 'Consent & disclaimer',
    description: 'Acknowledge privacy and confirm you have consent to share.',
  },
  {
    id: 'dateTime',
    title: 'Date & time',
    description: 'Record when the incident occurred.',
  },
  {
    id: 'narrative',
    title: 'Narrative',
    description: 'Describe the incident in your own words.',
  },
  {
    id: 'parties',
    title: 'Who was involved',
    description: 'Identify parents, children, and other parties.',
  },
  {
    id: 'jurisdiction',
    title: 'Jurisdiction & evidence',
    description: 'Add legal context and upload any evidence.',
  },
  {
    id: 'review',
    title: 'Review & AI summary',
    description: 'Generate an AI summary and export the report.',
  },
]

export function useWizard() {
  const { data, update, reset } = useIncidentState()
  const { report, isLoading, error, generate } = useAiReport()
  const [stepIndex, setStepIndex] = useState(0)

  const totalSteps = WIZARD_STEPS.length
  const currentStep = useMemo(() => WIZARD_STEPS[stepIndex], [stepIndex])

  const nextStep = useCallback(() => {
    setStepIndex((index) => Math.min(index + 1, totalSteps - 1))
  }, [totalSteps])

  const previousStep = useCallback(() => {
    setStepIndex((index) => Math.max(index - 1, 0))
  }, [])

  const goToStep = useCallback((index: number) => {
    setStepIndex(Math.min(Math.max(index, 0), totalSteps - 1))
  }, [totalSteps])

  const goToReviewAndGenerate = useCallback(() => {
    setStepIndex(totalSteps - 1)
    return generate(data)
  }, [data, generate, totalSteps])

  return {
    data,
    update,
    reset,
    steps: WIZARD_STEPS,
    stepIndex,
    step: stepIndex + 1,
    totalSteps,
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    next: nextStep,
    back: previousStep,
    aiReport: report,
    report,
    aiLoading: isLoading,
    aiError: error,
    loading: isLoading,
    runAi: generate,
    goToReviewAndGenerate,
  }
}
