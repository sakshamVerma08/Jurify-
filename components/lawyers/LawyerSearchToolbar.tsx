// FILE: components/lawyers/LawyerSearchToolbar.tsx
// TYPE: Client Component

'use client'

import { LAWYER_SORT_OPTIONS } from '@/lib/data/lawyerSearch'
import { cn } from '@/lib/utils'
import { useLawyerSearchStore } from '@/stores/lawyerSearchStore'
import type { LawyerSearchSortOption, LawyerSearchViewMode } from '@/types'

interface LawyerSearchToolbarProps {
  count: number
}

export function LawyerSearchToolbar({ count }: LawyerSearchToolbarProps) {
  const sortBy = useLawyerSearchStore((s) => s.sortBy)
  const viewMode = useLawyerSearchStore((s) => s.viewMode)
  const setSortBy = useLawyerSearchStore((s) => s.setSortBy)
  const setViewMode = useLawyerSearchStore((s) => s.setViewMode)

  return (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
      <p className="text-[13px] text-[var(--td)]">
        Showing <strong className="font-medium text-[var(--tm)]">{count}</strong> lawyer{count !== 1 ? 's' : ''}
      </p>
      <div className="flex items-center gap-2.5">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as LawyerSearchSortOption)}
          className="login-input cursor-pointer rounded-[9px] border border-white/[0.08] bg-card px-3.5 py-2 font-sans text-[13px] text-[var(--tm)] outline-none transition-colors duration-200 hover:border-white/[0.15]"
        >
          {LAWYER_SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>
    </div>
  )
}

function ViewToggle({
  viewMode,
  onChange,
}: {
  viewMode: LawyerSearchViewMode
  onChange: (mode: LawyerSearchViewMode) => void
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] p-[3px]">
      <button
        type="button"
        title="Grid view"
        onClick={() => onChange('grid')}
        className={cn(
          'flex h-7 w-[30px] cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-[var(--td)] transition-all duration-150',
          viewMode === 'grid' && 'bg-white/[0.08] text-[var(--tm)]'
        )}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
          <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
          <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
          <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>
      <button
        type="button"
        title="List view"
        onClick={() => onChange('list')}
        className={cn(
          'flex h-7 w-[30px] cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-[var(--td)] transition-all duration-150',
          viewMode === 'list' && 'bg-white/[0.08] text-[var(--tm)]'
        )}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <line x1="1" y1="3.5" x2="13" y2="3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="1" y1="10.5" x2="13" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
