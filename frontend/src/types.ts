export interface EvidenceItem {
  id: string
  name: string
  type: string
  base64?: string
  analysis?: string
}

export interface IncidentData {
  consent: boolean
  date: string | null
  time: string | null
  narrative: string
  parties: string[]
  children: string[]
  jurisdiction: string | null
  newParty?: string
  caseNumber?: string
  evidence: EvidenceItem[]
  uploads?: File[]
}

export interface AiReport {
  summary: string
  category: string
  severity: 'low' | 'medium' | 'high'
  legal: string
  keyFacts?: string[]
}

export type WizardStepId =
  | 'consent'
  | 'dateTime'
  | 'narrative'
  | 'parties'
  | 'jurisdiction'
  | 'review'

export interface WizardStep {
  id: WizardStepId
  title: string
  description: string
}

export interface StepComponentProps {
  data: IncidentData
  update: (patch: Partial<IncidentData>) => void
  next?: () => void
  back?: () => void
}
