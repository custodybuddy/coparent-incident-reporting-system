import { type HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type H1Props = HTMLAttributes<HTMLHeadingElement>

export default function H1({ className, ...props }: H1Props) {
  return (
    <h1
      className={cn(
        'text-2xl font-semibold tracking-tight text-cb-gray-100 sm:text-3xl',
        className
      )}
      {...props}
    />
  )
}
