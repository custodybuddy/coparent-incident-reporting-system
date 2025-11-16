import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-cb-sm border border-cb-gray500 bg-cb-gray700 px-3 py-3 text-base text-white shadow-cb-sm placeholder:text-cb-gray500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-gold focus-visible:ring-offset-2 focus-visible:border-cb-gold disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
