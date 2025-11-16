import { useEffect, useRef, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { StepComponentProps } from '@/types'

export default function StepParties({
  data,
  update,
  next,
  back,
}: StepComponentProps) {
  const [partyInput, setPartyInput] = useState('')
  const [childInput, setChildInput] = useState('')
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const addEntry = (value: string, key: 'parties' | 'children') => {
    const trimmed = value.trim()
    if (!trimmed) return
    const nextValue =
      key === 'parties'
        ? { parties: [...data.parties, trimmed] }
        : { children: [...data.children, trimmed] }
    update(nextValue)
  }

  const removeEntry = (name: string, key: 'parties' | 'children') => {
    const nextValue =
      key === 'parties'
        ? { parties: data.parties.filter((entry) => entry !== name) }
        : { children: data.children.filter((entry) => entry !== name) }
    update(nextValue)
  }

  return (
    <div className="space-y-8">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-3xl font-semibold text-cb-gray-100 focus:outline-none"
      >
        Who was involved?
      </h1>
      <p className="text-muted-foreground text-sm">
        Add parents, caregivers, and children referenced in this report.
      </p>

      <section className="space-y-3">
        <p className="text-sm font-medium">Adults / caregivers</p>
        <div className="flex gap-2">
          <Input
            value={partyInput}
            placeholder="Add a name"
            onChange={(event) => setPartyInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addEntry(partyInput, 'parties')
                setPartyInput('')
              }
            }}
          />
          <Button
            type="button"
            onClick={() => {
              addEntry(partyInput, 'parties')
              setPartyInput('')
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.parties.map((party) => (
            <Badge
              key={party}
              variant="secondary"
              className="flex items-center gap-2"
            >
              {party}
              <button
                type="button"
                aria-label={`Remove ${party}`}
                className="text-xs"
                onClick={() => removeEntry(party, 'parties')}
              >
                ×
              </button>
            </Badge>
          ))}
          {!data.parties.length && (
            <p className="text-sm text-muted-foreground">
              No adults added yet.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-sm font-medium">Children</p>
        <div className="flex gap-2">
          <Input
            value={childInput}
            placeholder="Add a child"
            onChange={(event) => setChildInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addEntry(childInput, 'children')
                setChildInput('')
              }
            }}
          />
          <Button
            type="button"
            onClick={() => {
              addEntry(childInput, 'children')
              setChildInput('')
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.children.map((child) => (
            <Badge
              key={child}
              variant="outline"
              className="flex items-center gap-2"
            >
              {child}
              <button
                type="button"
                aria-label={`Remove ${child}`}
                className="text-xs"
                onClick={() => removeEntry(child, 'children')}
              >
                ×
              </button>
            </Badge>
          ))}
          {!data.children.length && (
            <p className="text-sm text-muted-foreground">
              No children added yet.
            </p>
          )}
        </div>
      </section>

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
