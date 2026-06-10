// FILE: components/cases/CasesPageHeader.tsx
// TYPE: Client Component

'use client'

import { useCasesStore } from '@/stores/casesStore'

export function CasesPageHeader() {
  const viewRole = useCasesStore((s) => s.viewRole)
  const openPostModal = useCasesStore((s) => s.openPostModal)

  return (
    <header className="flex flex-wrap items-end justify-between gap-5 border-b border-white/[0.06] bg-gradient-to-b from-o/[0.04] to-transparent px-[60px] pb-9 pt-[52px] max-md:px-6 max-md:pb-7 max-md:pt-10">
      <div>
        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-[5px] text-[11px] tracking-wide text-[rgba(245,240,234,0.5)]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="rgba(245,240,234,0.4)" strokeWidth="1" />
            <line x1="3.5" y1="4.5" x2="8.5" y2="4.5" stroke="rgba(245,240,234,0.4)" strokeWidth="0.9" />
            <line x1="3.5" y1="6.5" x2="8.5" y2="6.5" stroke="rgba(245,240,234,0.4)" strokeWidth="0.9" />
          </svg>
          Legal Case Board
        </div>
        <h1 className="mb-2 font-serif text-[48px] font-light leading-[1.08] tracking-[-1px] text-[var(--t)] max-md:text-[36px]">
          Browse &amp; Manage <em className="italic text-o2">Cases</em>
        </h1>
        <p className="text-sm font-light leading-relaxed text-[var(--tm)]">
          Connect lawyers with those who need help — pro bono opportunities, active cases, and more.
        </p>
      </div>
      {viewRole === 'client' && (
        <button
          type="button"
          onClick={openPostModal}
          className="btn-gradient-nav inline-flex cursor-pointer items-center gap-2 rounded-[10px] border-none px-6 py-[13px] font-sans text-[13.5px] font-medium text-white transition-all duration-200 hover:-translate-y-px hover:opacity-92"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Post a Case
        </button>
      )}
    </header>
  )
}
