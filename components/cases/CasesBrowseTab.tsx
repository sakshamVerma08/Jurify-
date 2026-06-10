// FILE: components/cases/CasesBrowseTab.tsx
// TYPE: Client Component

'use client'

import { useMemo, useState } from 'react'
import { CasesFilters } from '@/components/cases/CasesFilters'
import { CasesGrid } from '@/components/cases/CasesGrid'
import { CasesToolbar } from '@/components/cases/CasesToolbar'
import { useCasesStore } from '@/stores/casesStore'

const INITIAL_VISIBLE = 6

export function CasesBrowseTab() {
  const viewRole = useCasesStore((s) => s.viewRole)
  const filters = useCasesStore((s) => s.filters)
  const filteredCases = useMemo(
    () => useCasesStore.getState().getFilteredCases(),
    [filters]
  )
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  const visibleCases = filteredCases.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCases.length

  return (
    <div className="grid grid-cols-1 items-start gap-7 px-[60px] pb-[60px] pt-8 lg:grid-cols-[280px_1fr] max-md:px-6">
      <CasesFilters />
      <div>
        <CasesToolbar count={filteredCases.length} />
        <CasesGrid cases={visibleCases} viewRole={viewRole} />
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}
              className="cursor-pointer rounded-[10px] border border-white/10 bg-white/[0.04] px-9 py-[13px] font-sans text-[13.5px] font-normal text-[var(--tm)] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-[var(--t)]"
            >
              Load more cases
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
