import { useEffect, useRef } from 'react'

import SectionCard from '@/components/SectionCard'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { StepComponentProps } from '@/types'

export default function StepParties({
  data,
  update,
  next,
  back,
}: StepComponentProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => headingRef.current?.focus(), [])

  const toggle = (list: string[] = [], item: string) =>
    list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item]

  const isAddDisabled = !data.newParty?.trim()
  const helperId = 'party-extra-helper'

  return (
    <div className="space-y-8">
      <div className="text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/PeopleIcon.png"
          alt=""
          className="mx-auto mb-4 h-20 w-24"
        />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-bold text-cb-gold sm:text-4xl"
        >
          Who was involved?
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-cb-gray300">
          Identify everyone connected to the incident. Include yourself, the other parent, children, or any witnesses.
        </p>
      </div>

      <SectionCard className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-cb-gray400">People *</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {['You', 'Other Parent', 'Child 1', 'Child 2'].map((person) => (
              <label key={person} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                <Checkbox
                  checked={data.parties?.includes(person)}
                  onCheckedChange={() => update({ parties: toggle(data.parties, person) })}
                  className="border-cb-gold text-cb-gold data-[state=checked]:bg-cb-gold data-[state=checked]:text-cb-navy"
                />
                {person}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="w-full space-y-2">
            <Label htmlFor="party-extra" className="text-cb-gray300">
              Add another person
            </Label>
            <Input
              id="party-extra"
              placeholder="Add another person"
              value={data.newParty || ''}
              onChange={(event) => update({ newParty: event.target.value })}
              aria-describedby={helperId}
              aria-invalid={isAddDisabled}
              className={cn(
                'w-full rounded-2xl border-white/10 bg-cb-navy text-cb-gray100 focus-visible:ring-cb-gold',
                isAddDisabled && 'border-cb-danger focus-visible:ring-cb-danger'
              )}
            />
            <p
              id={helperId}
              className={cn('text-xs text-cb-gray400', isAddDisabled && 'text-cb-danger')}
            >
              {isAddDisabled
                ? 'Enter a name to enable the Add button.'
                : 'Type a name and press Add.'}
            </p>
          </div>
          <Button
            onClick={() => {
              if (!data.newParty?.trim()) return
              update({
                parties: [...(data.parties || []), data.newParty.trim()],
                newParty: '',
              })
            }}
            disabled={isAddDisabled}
            className="w-full rounded-full bg-cb-gold px-5 text-cb-navy hover:bg-cb-gold-light sm:w-auto"
          >
            Add
          </Button>
        </div>
      </SectionCard>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={() => back?.()}
          className="w-full rounded-full border border-white/20 bg-transparent px-8 py-3 text-cb-gray200 hover:bg-white/5 sm:w-auto"
        >
          ← Back
        </Button>
        <Button
          disabled={!data.parties?.length}
          onClick={() => next?.()}
          className="w-full rounded-full bg-cb-gold px-8 py-3 text-cb-navy hover:bg-cb-gold-light disabled:opacity-50 sm:w-auto"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
