"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  state?: "default" | "error" | "success"
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, state = "default", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-field-state={state !== "default" ? state : undefined}
    aria-invalid={state === "error" ? true : undefined}
    className={cn(
      "peer grid h-5 w-5 shrink-0 place-content-center rounded-cb-sm border border-cb-gray500 bg-cb-gray700 text-white shadow-cb-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:bg-cb-gold data-[state=checked]:text-cb-navy-dark data-[field-state=error]:border-cb-danger data-[field-state=error]:ring-cb-danger data-[field-state=success]:border-cb-success data-[field-state=success]:ring-cb-success",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="grid place-content-center text-current">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
