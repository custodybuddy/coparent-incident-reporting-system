import { useCallback, useEffect, useMemo, useState } from 'react'

import type { IncidentData } from '@/types'

const STORAGE_KEY = 'incident-data'

const createDefaultData = (): IncidentData => ({
  consent: false,
  date: null,
  time: null,
  narrative: '',
  parties: [],
  children: [],
  jurisdiction: null,
  caseNumber: '',
  evidence: [],
})

const getInitialData = (): IncidentData => {
  if (typeof window === 'undefined') return createDefaultData()

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as IncidentData) : createDefaultData()
  } catch (error) {
    console.warn('Failed to parse saved incident data', error)
    return createDefaultData()
  }
}

export function useIncidentState() {
  const initial = useMemo(getInitialData, [])

  const [data, setData] = useState<IncidentData>(initial)

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const update = useCallback((patch: Partial<IncidentData>) => {
    setData((prev: IncidentData) => ({
      ...prev,
      ...patch,
      parties: patch.parties ?? prev.parties,
      children: patch.children ?? prev.children,
      evidence: patch.evidence ?? prev.evidence,
    }))
  }, [])

  const reset = useCallback(() => {
    setData(createDefaultData())
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  return { data, update, reset }
}
