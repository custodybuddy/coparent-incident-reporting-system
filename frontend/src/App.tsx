import { useWizard } from '@/hooks/useWizard'
import { exportHtml } from '@/services/exportHtml'
import StepConsent from '@/steps/StepConsent'
import StepDateTime from '@/steps/StepDateTime'
import StepNarrative from '@/steps/StepNarrative'
import StepParties from '@/steps/StepParties'
import StepJurisdiction from '@/steps/StepJurisdiction'
import StepReview from '@/steps/StepReview'

const STEP_LABELS = [
  'Consent',
  'Date & Time',
  'What Happened',
  'Who Was Involved',
  'Location & Law',
  'Review',
]

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
    <div className="flex min-h-screen flex-col bg-[#010A1A] text-white">
      <header className="w-full border-b border-[#2a3347] bg-[#050816]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-[#D4A83B]/40 bg-[#D4A83B]/10" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-[#D4A83B]">
                Report An Incident
              </p>
              <p className="text-xs text-slate-300">
                Transform toxic behaviour into court-ready evidence.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-4 py-10">
        <div className="w-full max-w-4xl space-y-6">
          <div className="mb-6 flex justify-between text-xs font-medium text-slate-300">
            {STEP_LABELS.map((label, index) => {
              const n = index + 1
              const isActive = n === step
              const isDone = n < step
              return (
                <div
                  key={label}
                  className="flex w-full flex-col items-center gap-1"
                >
                  <div
                    className={[
                      'flex h-10 w-10 items-center justify-center rounded-full border text-sm',
                      isActive
                        ? 'bg-[#00C27A] border-[#00C27A]'
                        : isDone
                        ? 'bg-[#D4A83B] border-[#D4A83B]'
                        : 'bg-[#101827] border-[#1f2937]',
                    ].join(' ')}
                  >
                    {isDone ? '✓' : n}
                  </div>
                  <span className="max-w-[80px] truncate text-center text-[11px] text-slate-300">
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="rounded-3xl border border-[#2a3347] bg-[#050816] px-6 py-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)] sm:px-8">
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
        </div>
      </main>
    </div>
  )
}
