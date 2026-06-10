// FILE: components/lawyers/LawyerSearchEmpty.tsx
// TYPE: Client Component

'use client'

import { useLawyerSearchStore } from '@/stores/lawyerSearchStore'
import { useUiStore } from '@/stores/uiStore'

export function LawyerSearchEmpty() {
  const resetFilters = useLawyerSearchStore((s) => s.resetFilters)
  const showToast = useUiStore((s) => s.showToast)

  function handleClear() {
    resetFilters()
    showToast('Filters cleared', 'info')
  }

  return (
    <div className="col-span-full flex flex-col items-center gap-4 px-10 py-20 text-center">
      <div className="mb-1 flex h-[100px] w-[100px] items-center justify-center rounded-3xl border border-og/20 bg-og/[0.08]">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <circle cx="22" cy="17" r="8" stroke="rgba(212,133,58,0.5)" strokeWidth="1.5" />
          <path d="M6 38c0-8 7.2-14 16-14s16 6 16 14" stroke="rgba(212,133,58,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="34" cy="12" r="5" stroke="rgba(212,133,58,0.3)" strokeWidth="1.2" />
          <path d="M32 22c3.5 1 6 4 6 7.5" stroke="rgba(212,133,58,0.3)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="font-serif text-[28px] font-light text-[var(--t)]">No lawyers found</h3>
      <p className="max-w-[360px] text-sm font-light leading-relaxed text-[var(--tm)]">
        Try adjusting your filters or search terms. Our network grows every day — check back soon.
      </p>
      <button
        type="button"
        onClick={handleClear}
        className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-og/25 bg-og/10 px-6 py-3 font-sans text-[13.5px] font-medium text-o2 transition-all duration-200 hover:border-og/40 hover:bg-og/[0.18]"
      >
        Clear all filters
      </button>
    </div>
  )
}
