import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

interface FormFieldStackProps {
  label: string
  htmlFor?: string
  required?: boolean
  helperText?: ReactNode
  children: ReactNode
  className?: string
}

export function FormFieldStack({
  label,
  htmlFor,
  required,
  helperText,
  children,
  className,
}: FormFieldStackProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="space-y-1">
        <Label
          htmlFor={htmlFor}
          className="text-xs font-semibold uppercase tracking-wide text-cb-gray300"
        >
          {label}
          {required && (
            <span className="ml-1 text-cb-warning" aria-hidden="true">
              *
            </span>
          )}
        </Label>
        {helperText ? (
          <div className="text-sm text-cb-gray400">{helperText}</div>
        ) : null}
      </div>
      {children}
    </div>
  )
}

type ColumnCount = 1 | 2 | 3

interface FormFieldGridProps {
  children: ReactNode
  columns?: ColumnCount
  className?: string
}

const columnClassMap: Record<ColumnCount, string> = {
  1: 'space-y-4',
  2: 'space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0',
  3: 'space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0',
}

export function FormFieldGrid({
  children,
  columns = 1,
  className,
}: FormFieldGridProps) {
  return <div className={cn(columnClassMap[columns], className)}>{children}</div>
}
