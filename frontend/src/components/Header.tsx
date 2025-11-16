import type { FC } from 'react'

import H1 from './ui/H1'

interface HeaderProps {
  onCreateNewReport: () => void
}

const navLinks = [
  { href: 'https://custodybuddy.com/', label: 'Home' },
  { href: 'https://custodybuddy.com/contact/', label: 'Contact' },
]

const Header: FC<HeaderProps> = ({ onCreateNewReport }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-cb-navy-dark/80 text-sm shadow-[0_5px_25px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
            <img
              src="https://custodybuddy.com/incident-report/img/ReportIncidentIcon.png"
              alt="Incident Report Icon"
              className="h-7 w-7 object-contain"
            />
          </div>
          <div className="min-w-0">
            <H1 className="text-left text-base font-semibold uppercase tracking-wide text-cb-gold">
              Report an Incident
            </H1>
            <p className="text-sm text-cb-gray300">
              Catch toxic behavior in real time with a court-ready record.
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-3 text-xs font-semibold">
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 text-cb-gray300">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-1 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-gold"
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={onCreateNewReport}
            className="inline-flex items-center justify-center rounded-full bg-cb-gold px-4 py-2 text-cb-navy-dark transition-colors duration-200 hover:bg-cb-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white/10"
          >
            Create New Report
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
