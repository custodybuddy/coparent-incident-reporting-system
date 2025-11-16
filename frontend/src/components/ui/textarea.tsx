import * as React from "react"

import { cn } from "@/lib/utils"

type TextareaProps = React.ComponentProps<"textarea"> & {
  state?: "default" | "error" | "success"
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state = "default", ...props }, ref) => {
    const dataState = state !== "default" ? state : undefined

    return (
      <textarea
        data-state={dataState}
        aria-invalid={state === "error" ? true : undefined}
        className={cn("form-field-token min-h-[120px]", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
