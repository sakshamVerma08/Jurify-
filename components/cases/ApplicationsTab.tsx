// FILE: components/cases/ApplicationsTab.tsx
// TYPE: Server Component

'use client'

import { useEffect, useState } from 'react'
import { getMyApplicationsAction } from '@/actions/cases/lawyer'
import { useCasesStore } from '@/stores/casesStore'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'
import type { ApplicationStatus, CaseApplication } from '@/types'

export function ApplicationsTab() {
  const [applications, setApplications] = useState<CaseApplication[]>([])
  const [loading, setLoading] = useState(true)

  const openDetailModal = useCasesStore((s) => s.openDetailModal)
  const showToast = useUiStore((s) => s.showToast)

  useEffect(() => {
    async function fetchApps() {
      setLoading(true)
      const res = await getMyApplicationsAction()
      if (res.success && res.applications) {
        setApplications(res.applications as any)
      } else {
        showToast(res.error || 'Failed to fetch applications', 'err')
      }
      setLoading(false)
    }
    fetchApps()
  }, [showToast])

  return (
    <div className="px-[60px] pb-[60px] pt-8 max-md:px-6">
      <TabSectionHeader
        title="My Applications"
        subtitle="Track cases you've applied to as a lawyer"
        count={`${applications.length} applications`}
      />
      {loading ? (
        <div className="flex max-w-[900px] flex-col gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 rounded-[14px] border border-white/[0.07] bg-card p-5">
              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-4 w-1/3 animate-pulse rounded bg-white/10" />
                <div className="flex gap-3">
                  <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
                  <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />
                <div className="h-[34px] w-[88px] animate-pulse rounded-lg bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h3 className="text-base font-medium text-[var(--t)]">No Applications Yet</h3>
          <p className="mt-1 text-xs text-[var(--td)] max-w-xs leading-relaxed font-light">
            You haven't applied to any cases yet. Browse open cases to find clients.
          </p>
        </div>
      ) : (
        <div className="flex max-w-[900px] flex-col gap-3">
          {applications.map((app, index) => (
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
                  onClick={() => openDetailModal(app.caseId)}
                  className="cursor-pointer whitespace-nowrap rounded-lg border border-og/20 bg-og/10 px-4 py-[7px] font-sans text-xs text-o2 transition-all duration-200 hover:border-og/35 hover:bg-og/15"
                >
                  View Case
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
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
