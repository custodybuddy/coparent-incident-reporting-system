import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
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

  return (
    <div className="space-y-10">
      <div className="mb-4 text-center">
        <img
          src="https://custodybuddy.com/incident-report/img/PeopleIcon.png"
          alt=""
          className="mx-auto mb-4 h-24 w-28"
        />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mb-2 text-3xl font-bold text-cb-gold sm:text-4xl"
        >
          Who Was Involved?
        </h1>
        <p className="mx-auto max-w-lg text-sm text-cb-gray300">
          Select all relevant people involved in the incident, including yourself
          and any children.
        </p>
      </div>

      <div className="mx-auto space-y-8 rounded-2xl border border-cb-gray700 bg-cb-navy-dark/70 p-6 shadow-lg max-w-3xl">
        <div className="space-y-4">
          <div className="font-semibold text-cb-gray100">People *</div>

          {['You', 'Other Parent', 'Child 1', 'Child 2'].map((person) => (
            <label key={person} className="flex items-center gap-3 text-cb-gray100">
              <Checkbox
                checked={data.parties?.includes(person)}
                onCheckedChange={() =>
                update({ parties: toggle(data.parties, person) })
              }
              className="border-cb-gold text-cb-gold data-[state=checked]:bg-cb-gold data-[state=checked]:text-cb-navy"
            />
            {person}
          </label>
          ))}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Add another person"
              value={data.newParty || ''}
              onChange={(event) => update({ newParty: event.target.value })}
              className="w-full rounded-xl border-cb-gray700 bg-cb-navy text-cb-gray100 focus-visible:ring-cb-gold"
            />
            <Button
              onClick={() => {
                if (!data.newParty?.trim()) return
                update({
                  parties: [...(data.parties || []), data.newParty.trim()],
                  newParty: '',
                })
              }}
              className="sm:w-auto w-full rounded-xl bg-cb-gold px-5 text-cb-navy hover:bg-cb-gold-light"
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
        <Button
          onClick={() => back?.()}
          className="w-full sm:w-auto rounded-xl border border-cb-gold bg-cb-navy px-6 py-3 text-cb-gold hover:bg-cb-navy-light"
        >
          ← Back
        </Button>
        <Button
          disabled={!data.parties?.length}
          onClick={() => next?.()}
          className="w-full sm:w-auto rounded-xl bg-cb-gold px-6 py-3 text-cb-navy hover:bg-cb-gold-light disabled:opacity-50"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
