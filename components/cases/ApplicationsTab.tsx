// FILE: components/cases/ApplicationsTab.tsx
// TYPE: Server Component

import { CASE_APPLICATIONS } from '@/lib/data/cases'
import { cn } from '@/lib/utils'
import type { ApplicationStatus } from '@/types'

export function ApplicationsTab() {
  return (
    <div className="px-[60px] pb-[60px] pt-8 max-md:px-6">
      <TabSectionHeader
        title="My Applications"
        subtitle="Track cases you've applied to as a lawyer"
        count={`${CASE_APPLICATIONS.length} applications`}
      />
      <div className="flex max-w-[900px] flex-col gap-3">
        {CASE_APPLICATIONS.map((app, index) => (
          <article
            key={app.id}
            className={cn(
              'case-card-in flex items-center justify-between gap-4 rounded-[14px] border border-white/[0.07] bg-card p-5 transition-colors duration-200 hover:border-white/[0.13] max-md:flex-col max-md:items-start',
              `case-card-in-${(index % 6) + 1}`
            )}
          >
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-[15px] font-medium text-[var(--t)]">{app.title}</h3>
              <div className="flex flex-wrap items-center gap-3.5">
                <span className="text-[11.5px] text-[var(--td)]">{app.category}</span>
                <span className="text-[11.5px] text-[var(--td)]">{app.location}</span>
                <span className="text-[11.5px] text-[var(--td)]">Applied {app.appliedAgo}</span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <StatusBadge status={app.status} label={app.statusLabel} />
              <button
                type="button"
                className="cursor-pointer whitespace-nowrap rounded-lg border border-og/20 bg-og/10 px-4 py-[7px] font-sans text-xs text-o2 transition-all duration-200 hover:border-og/35 hover:bg-og/15"
              >
                View Case
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status, label }: { status: ApplicationStatus; label: string }) {
  const classes: Record<ApplicationStatus, string> = {
    pending: 'bg-warn/10 text-warn border-warn/25',
    accepted: 'bg-success/10 text-success border-success/25',
    rejected: 'bg-danger/10 text-danger border-danger/25',
  }
  return (
    <span
      className={cn(
        'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] font-medium',
        classes[status]
      )}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
      {label}
    </span>
  )
}

function TabSectionHeader({
  title,
  subtitle,
  count,
}: {
  title: string
  subtitle: string
  count: string
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--t)]">{title}</h2>
        <p className="mt-1 text-[13px] font-light text-[var(--td)]">{subtitle}</p>
      </div>
      <span className="rounded-full border border-white/[0.08] bg-white/[0.06] px-3 py-1 text-xs text-[var(--tm)]">
        {count}
      </span>
    </div>
  )
}
