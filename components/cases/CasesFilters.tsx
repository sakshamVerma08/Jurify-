// FILE: components/cases/CasesFilters.tsx
// TYPE: Client Component

'use client'

import { FilterPanel } from '@/components/cases/FilterPanel'
import { useCasesStore } from '@/stores/casesStore'

export function CasesFilters() {
  const resetFilters = useCasesStore((s) => s.resetFilters)

  return (
    <aside className="sticky top-[88px] overflow-hidden rounded-2xl border border-white/[0.07] bg-card">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-[18px]">
        <h2 className="text-[13px] font-medium text-[var(--t)]">Filters</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="cursor-pointer border-none bg-transparent font-sans text-[11.5px] text-o2 hover:underline"
        >
          Reset all
        </button>
      </div>
      <FilterPanel />
    </aside>
  )
}
