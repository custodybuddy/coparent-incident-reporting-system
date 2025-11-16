import { Progress } from '@/components/ui/progress'

type ProgressBarProps = {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const value = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(value)}%</span>
      </div>
      <Progress value={value} />
    </div>
  )
}
