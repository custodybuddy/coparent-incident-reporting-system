import { useEffect, useRef } from 'react'

import SectionCard from '@/components/SectionCard'
import { FormFieldStack } from '@/components/FormFieldStack'
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
        <FormFieldStack label="People" required helperText="Select everyone who was present or involved.">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {['You', 'Other Parent', 'Child 1', 'Child 2'].map((person) => (
              <label
                key={person}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                <Checkbox
                  checked={data.parties?.includes(person)}
                  onCheckedChange={() => update({ parties: toggle(data.parties, person) })}
                  className="border-cb-gold text-cb-gold data-[state=checked]:bg-cb-gold data-[state=checked]:text-cb-navy"
                />
                {person}
              </label>
            ))}
          </div>
        </FormFieldStack>

        <FormFieldStack
          label="Add another person"
          helperText="Use this for witnesses or supporters not listed above."
          htmlFor="additional-party"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="additional-party"
              placeholder="Add another person"
              value={data.newParty || ''}
              onChange={(event) => update({ newParty: event.target.value })}
            />
            <Button
              onClick={() => {
                if (!data.newParty?.trim()) return
                update({
                  parties: [...(data.parties || []), data.newParty.trim()],
                  newParty: '',
                })
              }}
              className="w-full rounded-full bg-cb-gold px-5 text-cb-navy hover:bg-cb-gold-light sm:w-auto"
            >
              Add
            </Button>
          </div>
        </FormFieldStack>
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
