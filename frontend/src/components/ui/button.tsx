import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-cb-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 shadow-cb-sm [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-cb-gold text-cb-navy hover:bg-cb-gold-light",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-cb-gold bg-transparent text-cb-gold hover:bg-cb-navy-light/40",
        secondary:
          "bg-cb-navy-light text-cb-gray-100 shadow-cb-md hover:bg-cb-navy",
        ghost: "hover:bg-cb-navy-light/50 text-cb-gray-100",
        link: "text-cb-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-2",
        sm: "px-4 text-sm",
        lg: "rounded-cb-xl px-8 py-3 text-base",
        icon: "h-11 w-11 rounded-cb-md p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
