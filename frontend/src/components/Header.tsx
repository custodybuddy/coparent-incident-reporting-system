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
    <header className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/30 bg-slate-800/50 shadow-2xl transition-transform duration-500 hover:rotate-6">
              <img
                src="https://custodybuddy.com/incident-report/img/ReportIncidentIcon.png"
                alt="Incident Report Icon"
                className="h-7 w-7 object-contain"
              />
            </div>
            <div>
              <H1 className="font-black !text-left text-lg tracking-tight text-[#FFD700] sm:text-xl">
                Report An Incident:{' '}
                <span className="font-raleway font-medium text-white">
                  Catch Them&nbsp;Red-Handed.
                </span>
              </H1>
              <p className="mt-1 hidden text-xs font-medium text-slate-300 sm:block">
                Transform toxic behavior into court-ready evidence with guided
                documentation.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 text-sm font-semibold sm:gap-3 md:gap-4">
            <nav
              aria-label="Primary"
              className="flex flex-wrap items-center gap-2 text-sm sm:gap-3 md:gap-4"
            >
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="relative inline-flex items-center rounded-lg px-3 py-1.5 text-slate-100/90 transition-colors duration-200 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={onCreateNewReport}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/60 bg-amber-400 px-4 py-2 text-sm font-semibold tracking-wide text-black shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
            >
              Create New Report
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
