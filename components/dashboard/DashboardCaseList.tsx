// FILE: components/dashboard/DashboardCaseList.tsx
// TYPE: Server Component

import { CompactProgressTrack } from '@/components/dashboard/CompactProgressTrack'
import { cn } from '@/lib/utils'
import type { DashboardCaseItem } from '@/types'

const STAGE_CLASSES = {
  hearing: 'border-[rgba(100,180,255,0.3)] bg-[rgba(100,180,255,0.07)] text-[rgba(120,180,255,0.85)]',
  investigation: 'border-[rgba(255,180,80,0.3)] bg-[rgba(255,170,50,0.07)] text-[rgba(255,190,100,0.85)]',
  trial: 'border-[rgba(240,100,100,0.3)] bg-[rgba(220,60,60,0.07)] text-[rgba(240,130,130,0.85)]',
  open: 'border-white/10 text-[var(--td)]',
  default: 'border-white/10 text-[var(--tm)]',
}

export function DashboardCaseList({ cases }: { cases: DashboardCaseItem[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {cases.map((item) => (
        <article
          key={item.id}
          className="cursor-pointer rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 transition-colors duration-200 hover:border-og/20"
        >
          <div className="mb-2.5 flex items-start justify-between gap-2.5">
            <div>
              <h4 className="text-[13.5px] font-medium text-[var(--t)]">{item.title}</h4>
              <div className="mt-[3px] flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-og/20 bg-og/10 px-2 py-0.5 text-[10px] font-medium text-o2">
                  {item.category}
                </span>
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[10px] font-medium',
                    STAGE_CLASSES[item.stageVariant ?? 'default']
                  )}
                >
                  {item.stage}
                </span>
              </div>
            </div>
            <span
              className={cn(
                'flex shrink-0 items-center gap-[5px] text-[11px] text-[var(--td)]',
                item.deadlineUrgent && 'text-[rgba(240,130,100,0.8)]'
              )}
            >
              <ClockIcon />
              {item.deadline}
            </span>
          </div>
          {item.lawyerNote && (
            <p className="mb-2 text-[11.5px] text-[var(--td)]">
              {item.lawyerNote.split('Adv. Priya Mehta ✓')[0]}
              <span className="text-o2">Adv. Priya Mehta ✓</span>
            </p>
          )}
          {item.applicantNote && (
            <p className="mb-2 text-[11.5px] text-[var(--td)]">
              3 lawyers applied — <span className="cursor-pointer text-o2">Review applications</span>
            </p>
          )}
          <CompactProgressTrack steps={item.steps} />
        </article>
      ))}
    </div>
  )
}

function ClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1" />
      <path d="M5.5 3v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}
