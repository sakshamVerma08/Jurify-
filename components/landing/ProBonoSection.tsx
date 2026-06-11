// FILE: components/landing/ProBonoSection.tsx
// TYPE: Server Component

import Link from 'next/link'
import { ProBonoPostButton } from '@/components/landing/ProBonoPostButton'
import { PRO_BONO_CASES, PRO_BONO_PROGRAMS } from '@/lib/data/landing'
import { cn } from '@/lib/utils'

const PRIORITY_STYLES = {
  high: 'bg-[rgba(200,98,42,0.2)] text-o2',
  medium: 'bg-white/[0.07] text-[var(--tm)]',
  open: 'bg-white/[0.07] text-[var(--tm)]',
} as const

export function ProBonoSection() {
  const displayedCases = PRO_BONO_CASES.slice(0, 3)

  return (
    <section aria-labelledby="probono-heading" className="bg-bg px-6 py-20 sm:px-10 lg:px-[60px] lg:py-[100px]">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3.5 text-[11px] font-medium uppercase tracking-[2px] text-o">Live opportunities</div>
          <h2
            id="probono-heading"
            className="font-serif text-[clamp(32px,3.5vw,42px)] font-light leading-[1.1] tracking-[-1px] text-[var(--t)]"
          >
            Pro bono <em className="italic text-o2">cases</em>
          </h2>
        </div>
        <Link
          href="/cases"
          className="rounded-lg border border-[rgba(200,98,42,0.3)] bg-[rgba(200,98,42,0.06)] px-5 py-2.5 text-[13px] text-o2 no-underline transition-all duration-200 hover:bg-[rgba(200,98,42,0.15)]"
        >
          View all cases →
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-3">
          {displayedCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="pb-card-accent relative overflow-hidden rounded-2xl border border-white/[0.07] bg-bg2 px-7 py-[26px] transition-all duration-250 hover:translate-x-1.5 hover:border-[rgba(200,98,42,0.3)]"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2.5">
                <span className={cn('rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.5px]', PRIORITY_STYLES[caseItem.priority])}>
                  {caseItem.priorityLabel}
                </span>
                <span className="text-[11px] text-[var(--td)]">
                  {caseItem.practiceArea} · {caseItem.postedAgo}
                </span>
              </div>
              <div className="mb-1 text-[15px] font-medium text-[var(--t)]">{caseItem.title}</div>
              <div className="mb-3 text-xs text-[var(--td)]">
                {caseItem.organization} · {caseItem.location} · {caseItem.contact}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {caseItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.05] bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-[var(--tm)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {PRO_BONO_PROGRAMS.map((program) => (
            <div
              key={program.id}
              className={cn(
                'rounded-2xl border border-white/[0.07] bg-bg2 p-6',
                program.highlighted && 'border-[rgba(200,98,42,0.2)] bg-[rgba(200,98,42,0.07)]'
              )}
            >
              <div className="mb-1.5 text-sm font-medium text-[var(--t)]">{program.title}</div>
              <div className="mb-3.5 text-xs leading-relaxed text-[var(--td)]">{program.description}</div>
              {program.highlighted ? (
                <ProBonoPostButton />
              ) : (
                <div className="flex gap-4 text-[11px] text-[var(--td)]">
                  <div className="flex items-center gap-1">
                    <span className="text-o2">●</span> {program.volunteers} volunteers
                  </div>
                  <div>{program.impact}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
