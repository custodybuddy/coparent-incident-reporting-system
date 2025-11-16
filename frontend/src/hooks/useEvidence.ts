import { useCallback } from 'react'

import type { EvidenceItem } from '@/types'

type UseEvidenceOptions = {
  evidence: EvidenceItem[]
  onChange: (items: EvidenceItem[]) => void
}

export function useEvidence({ evidence, onChange }: UseEvidenceOptions) {
  const addEvidence = useCallback(
    (item: Omit<EvidenceItem, 'id'> & { id?: string }) => {
      const id =
        item.id ??
        (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`)
      onChange([...evidence, { ...item, id }])
    },
    [evidence, onChange]
  )

  const removeEvidence = useCallback(
    (id: string) => {
      onChange(evidence.filter((item) => item.id !== id))
    },
    [evidence, onChange]
  )

  const updateEvidence = useCallback(
    (id: string, patch: Partial<EvidenceItem>) => {
      onChange(
        evidence.map((item) => (item.id === id ? { ...item, ...patch } : item))
      )
    },
    [evidence, onChange]
  )

  return { evidence, addEvidence, removeEvidence, updateEvidence }
}
