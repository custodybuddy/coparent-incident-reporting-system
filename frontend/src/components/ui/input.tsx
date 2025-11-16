import * as React from "react"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  state?: "default" | "error" | "success"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", state = "default", ...props }, ref) => {
    const dataState = state !== "default" ? state : undefined

    return (
      <input
        type={type}
        data-state={dataState}
        aria-invalid={state === "error" ? true : undefined}
        className={cn("form-field-token flex items-center", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
