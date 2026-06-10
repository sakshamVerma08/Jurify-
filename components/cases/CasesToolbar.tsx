// FILE: components/cases/CasesToolbar.tsx
// TYPE: Client Component

'use client'

import { useCasesStore } from '@/stores/casesStore'
import type { CaseSortOption } from '@/types'

interface CasesToolbarProps {
  count: number
}

const SORT_OPTIONS: { value: CaseSortOption; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'deadline', label: 'Deadline soonest' },
  { value: 'relevant', label: 'Most urgent' },
]

export function CasesToolbar({ count }: CasesToolbarProps) {
  const search = useCasesStore((s) => s.filters.search)
  const sort = useCasesStore((s) => s.filters.sort)
  const setSearch = useCasesStore((s) => s.setSearch)
  const setSort = useCasesStore((s) => s.setSort)

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <div className="relative max-w-[400px] flex-1">
          <svg
            className="pointer-events-none absolute left-[13px] top-1/2 -translate-y-1/2 opacity-40"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search cases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="login-input w-full rounded-[10px] border border-white/[0.08] bg-card py-[11px] pl-10 pr-3.5 text-[13.5px] text-[var(--t)] outline-none transition-all focus:border-og/35 focus:shadow-[0_0_0_3px_rgba(212,133,58,0.08)]"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as CaseSortOption)}
          className="cursor-pointer rounded-[10px] border border-white/[0.08] bg-card px-3.5 py-2.5 font-sans text-[13px] text-[var(--tm)] outline-none transition-colors hover:border-white/[0.16] hover:text-[var(--t)]"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-bg3 text-[var(--t)]">
              {opt.label}
            </option>
          ))}
        </select>
        <span className="whitespace-nowrap text-[12.5px] text-[var(--td)]">
          {count} case{count !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}
