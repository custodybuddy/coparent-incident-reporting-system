import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

export type SectionCardProps = PropsWithChildren<HTMLAttributes<HTMLElement>>

export default function SectionCard({ children, className, ...rest }: SectionCardProps) {
  return (
    <section
      {...rest}
      className={cn(
        'mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-cb-navy-dark/70 p-6 text-left shadow-[0_20px_45px_rgba(3,6,23,0.55)] backdrop-blur sm:p-8',
        className,
      )}
    >
      {children}
    </section>
  )
}
