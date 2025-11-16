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
    goToReviewAndGenerate,
  } = useWizard()

  const handleExport = () => {
    if (report) {
      exportHtml(report, data)
    }
  }

  return (
    <div className="min-h-screen bg-cb-navy-dark text-cb-gray-100">
      <header className="flex items-center justify-between border-b border-cb-gray700 bg-cb-navy px-6 py-4 text-sm">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-cb-gold" />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-cb-gold">Report An Incident</span>
            <span className="text-xs text-cb-gray300">
              Transform toxic behaviour into court-ready documentation.
            </span>
          </div>
        </div>
        <button className="rounded-full bg-cb-gold px-4 py-2 text-xs font-semibold text-cb-navy transition hover:bg-cb-gold-light">
          Create New Report
        </button>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col space-y-6 px-4 pb-12 pt-8">
        <div className="space-y-3">
          <Progress
            value={(step / 6) * 100}
            className="h-1 bg-cb-navy-light"
            indicatorClassName="bg-cb-gold"
          />
          <div className="flex justify-between text-xs text-cb-gray300">
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
                className={step >= index + 1 ? 'text-cb-gold' : undefined}
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
