import Header from '@/components/Header'
import { Progress } from '@/components/ui/progress'
import { useWizard } from '@/hooks/useWizard'
import { exportHtml } from '@/services/exportHtml'
import StepConsent from '@/steps/StepConsent'
import StepDateTime from '@/steps/StepDateTime'
import StepNarrative from '@/steps/StepNarrative'
import StepParties from '@/steps/StepParties'
import StepJurisdiction from '@/steps/StepJurisdiction'
import StepReview from '@/steps/StepReview'

export default function App() {
  const {
    step,
    data,
    update,
    next,
    back,
    report,
    aiLoading,
    aiError,
    reset,
    goToStep,
    goToReviewAndGenerate,
  } = useWizard()

  const handleExport = () => {
    if (report) {
      exportHtml(report, data)
    }
  }

  const handleCreateNewReport = () => {
    reset()
    goToStep(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-cb-navy-dark text-cb-gray-100">
      <Header onCreateNewReport={handleCreateNewReport} />

      <main className="mx-auto flex max-w-5xl flex-col space-y-6 px-4 pb-12 pt-8">
        <div className="space-y-3">
          <Progress
            value={(step / 6) * 100}
            className="h-1 bg-cb-navy-light"
            indicatorClassName="bg-cb-gold"
          />
          <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs text-cb-gray300 sm:justify-between">
            {[
              'Consent',
              'Date & Time',
              'What Happened',
              'Who Was Involved',
              'Location & Evidence',
              'Review & Export',
            ].map((label, index) => (
              <span
                key={label}
                className={`min-w-0 px-1 sm:px-0 ${step >= index + 1 ? 'text-cb-gold' : ''}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          {step === 1 && <StepConsent data={data} update={update} next={next} />}
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
      </main>
    </div>
  )
}
