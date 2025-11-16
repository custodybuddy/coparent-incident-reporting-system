import StepConsent from '@/steps/StepConsent'
import StepDateTime from '@/steps/StepDateTime'
import StepNarrative from '@/steps/StepNarrative'
import StepParties from '@/steps/StepParties'
import StepJurisdiction from '@/steps/StepJurisdiction'
import StepReview from '@/steps/StepReview'
import { Progress } from '@/components/ui/progress'
import { useWizard } from '@/hooks/useWizard'
import { exportHtml } from '@/services/exportHtml'

export default function App() {
  const {
    step,
    totalSteps,
    data,
    update,
    next,
    back,
    report,
    aiLoading,
    aiError,
    goToReviewAndGenerate,
  } = useWizard()

  const progressValue = (step / totalSteps) * 100

  const handleExport = () => {
    if (report) {
      exportHtml(report, data)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Progress
        value={progressValue}
        className="h-2 rounded-cb-sm bg-cb-navy-light"
        indicatorClassName="bg-cb-gold shadow-cb-glow"
      />

      {step === 1 && (
        <StepConsent data={data} update={update} next={next} />
      )}
      {step === 2 && (
        <StepDateTime data={data} update={update} next={next} back={back} />
      )}
      {step === 3 && (
        <StepNarrative data={data} update={update} next={next} back={back} />
      )}
      {step === 4 && (
        <StepParties data={data} update={update} next={next} back={back} />
      )}
      {step === 5 && (
        <StepJurisdiction data={data} update={update} next={next} back={back} />
      )}
      {step === 6 && (
        <StepReview
          data={data}
          update={update}
          back={back}
          report={report}
          loading={aiLoading}
          error={aiError}
          onGenerate={goToReviewAndGenerate}
          onExport={handleExport}
        />
      )}
    </div>
  )
}
