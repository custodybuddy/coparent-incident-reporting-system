import Header from '@/components/Header'
import SectionCard from '@/components/SectionCard'
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

  const steps = [
    'Consent',
    'Date & Time',
    'What Happened',
    'Who Was Involved',
    'Location & Evidence',
    'Review & Export',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-cb-navy-dark via-[#060f21] to-[#01040c] text-cb-gray-100">
      <Header onCreateNewReport={handleCreateNewReport} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <SectionCard className="max-w-none space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide text-cb-gray300">
              Step {step} of {steps.length}
            </p>
            <p className="text-sm text-cb-gray400">Complete each section to build your report.</p>
          </div>
          <Progress
            value={(step / steps.length) * 100}
            className="h-2 rounded-full bg-white/10"
            indicatorClassName="bg-gradient-to-r from-cb-gold to-cb-gold-light"
          />
          <ol className="grid grid-cols-2 gap-2 text-[0.7rem] text-cb-gray400 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((label, index) => {
              const isComplete = step > index + 1
              const isActive = step === index + 1

              return (
                <li
                  key={label}
                  className={`flex items-center gap-2 rounded-2xl border border-white/5 px-3 py-2 ${
                    isActive ? 'bg-white/10 text-white' : isComplete ? 'bg-white/5 text-cb-gold' : ''
                  }`}
                >
                  <span className="text-xs font-semibold">{index + 1}</span>
                  <span className="truncate text-[0.75rem] font-medium">{label}</span>
                </li>
              )
            })}
          </ol>
        </SectionCard>

        <div className="mx-auto w-full max-w-4xl">
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
