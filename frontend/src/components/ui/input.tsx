import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-cb-sm border border-cb-gray500 bg-cb-gray700 px-3 py-2 text-base text-white shadow-cb-sm transition-colors placeholder:text-cb-gray500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-gold focus-visible:ring-offset-2 focus-visible:border-cb-gold disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
