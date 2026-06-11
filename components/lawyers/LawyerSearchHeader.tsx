// FILE: components/lawyers/LawyerSearchHeader.tsx
// TYPE: Client Component

'use client'

import { cn } from '@/lib/utils'
import { useLawyerSearchStore } from '@/stores/lawyerSearchStore'

export function LawyerSearchHeader() {
  const viewRole = useLawyerSearchStore((s) => s.viewRole)
  const setViewRole = useLawyerSearchStore((s) => s.setViewRole)

  return (
    <header className="flex flex-wrap items-end justify-between gap-5 border-b border-white/[0.06] bg-gradient-to-b from-o/[0.04] to-transparent px-8 py-12 pb-9 max-lg:px-6 max-md:px-4">
      <div>
        <span className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.05] px-3.5 py-[5px] text-[11px] tracking-[0.4px] text-[rgba(245,240,234,0.45)]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="5" cy="4" r="2" stroke="rgba(245,240,234,0.4)" strokeWidth="1" />
            <circle cx="8.5" cy="4" r="2" stroke="rgba(245,240,234,0.4)" strokeWidth="1" />
            <path d="M1 10c0-2 1.8-3.5 4-3.5" stroke="rgba(245,240,234,0.4)" strokeWidth="1" strokeLinecap="round" />
            <path d="M6.5 10c0-2 1.8-3.5 4-3.5" stroke="rgba(245,240,234,0.4)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          Verified Legal Professionals
        </span>
        <h1 className="mb-2 font-serif text-[clamp(36px,4vw,52px)] font-light leading-[1.08] tracking-[-1px] text-[var(--t)]">
          Find a <em className="italic text-o2">Lawyer</em>
        </h1>
        <p className="max-w-[480px] text-sm font-light leading-relaxed text-[var(--tm)]">
          Browse verified advocates across 18+ practice areas. Connect directly or explore pro bono availability.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2.5 rounded-[10px] border border-white/[0.08] bg-white/[0.04] p-1">
        <button
          type="button"
          onClick={() => setViewRole('client')}
          className={cn(
            'cursor-pointer rounded-[7px] border border-transparent px-[18px] py-[7px] font-sans text-[12.5px] font-medium text-[var(--tm)] transition-all duration-200',
            viewRole === 'client' && 'border-og/30 bg-og/[0.18] text-o2'
          )}
        >
          Client
        </button>
        <button
          type="button"
          onClick={() => setViewRole('lawyer')}
          className={cn(
            'cursor-pointer rounded-[7px] border border-transparent px-[18px] py-[7px] font-sans text-[12.5px] font-medium text-[var(--tm)] transition-all duration-200',
            viewRole === 'lawyer' && 'border-og/30 bg-og/[0.18] text-o2'
          )}
        >
          Lawyer
        </button>
      </div>
    </header>
  )
}
