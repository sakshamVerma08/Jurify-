// FILE: components/cases/ActiveCasesTab.tsx
// TYPE: Server Component

'use client'

import { useEffect, useState } from 'react'
import { ProgressTracker } from '@/components/ui/ProgressTracker'
import { getActiveCasesAction } from '@/actions/cases/lawyer'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'
import type { ActiveCaseItem } from '@/types'

import { CaseCardSkeleton } from '@/components/ui/CaseCardSkeleton'

export function ActiveCasesTab() {
  const [activeCases, setActiveCases] = useState<ActiveCaseItem[]>([])
  const [loading, setLoading] = useState(true)
  const showToast = useUiStore((s) => s.showToast)

  useEffect(() => {
    async function fetchActive() {
      setLoading(true)
      const res = await getActiveCasesAction()
      if (res.success && res.cases) {
        setActiveCases(res.cases as any)
      } else {
        showToast(res.error || 'Failed to fetch active cases', 'err')
      }
      setLoading(false)
    }
    fetchActive()
  }, [showToast])

  return (
    <div className="px-[60px] pb-[60px] pt-8 max-md:px-6">
      <TabSectionHeader
        title="Active Cases"
        subtitle="Cases you're currently representing"
        count={`${activeCases.length} active`}
      />
      {loading ? (
        <div className="flex max-w-[900px] flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <CaseCardSkeleton key={i} index={i} />
          ))}
        </div>
      ) : activeCases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h3 className="text-base font-medium text-[var(--t)]">No Active Cases</h3>
          <p className="mt-1 text-xs text-[var(--td)] max-w-xs leading-relaxed font-light">
            You are not currently representing any clients. Keep applying to find new work!
          </p>
        </div>
      ) : (
        <div className="flex max-w-[900px] flex-col gap-4">
          {activeCases.map((item, index) => (
            <article
              key={item.id}
              className={cn(
                'case-card-in overflow-hidden rounded-2xl border border-white/[0.07] bg-card',
                `case-card-in-${(index % 6) + 1}`
              )}
            >
              <div className="flex items-start justify-between gap-3 border-b border-white/[0.05] px-6 py-5">
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1.5 text-[15px] font-medium text-[var(--t)]">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-3.5">
                    <span className="text-[11.5px] text-[var(--td)]">{item.category}</span>
                    <span className="text-[11.5px] text-[var(--td)]">{item.location}</span>
                    <span className="text-[11.5px] text-[var(--td)]">Client: {item.clientName}</span>
                    <span className="text-[11.5px] text-[var(--td)]">{item.nextEvent}</span>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[10px] text-[var(--tm)]">
                  {item.stageLabel}
                </span>
              </div>
              <div className="px-6 py-5">
                <ProgressTracker currentStep={item.progressStep} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
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
