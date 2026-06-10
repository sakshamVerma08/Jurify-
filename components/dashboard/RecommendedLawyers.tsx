// FILE: components/dashboard/RecommendedLawyers.tsx
// TYPE: Client Component

'use client'

import { RECOMMENDED_LAWYERS } from '@/lib/data/dashboard'
import { useUiStore } from '@/stores/uiStore'

export function RecommendedLawyers() {
  const showToast = useUiStore((s) => s.showToast)

  return (
    <div className="flex flex-col gap-2">
      {RECOMMENDED_LAWYERS.map((lawyer) => (
        <div
          key={lawyer.id}
          className="flex cursor-pointer items-center gap-3 rounded-[11px] border border-white/[0.06] bg-white/[0.03] px-3 py-[11px] transition-colors duration-200 hover:border-og/20"
        >
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-og/30 bg-og/15 font-serif text-base font-semibold text-og">
            {lawyer.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-[var(--t)]">{lawyer.name}</p>
            <p className="mt-0.5 text-[11px] text-[var(--td)]">{lawyer.meta}</p>
          </div>
          <span className="shrink-0 rounded-full border border-success/20 bg-success/10 px-2 py-0.5 text-[10px] text-success">
            {lawyer.match}
          </span>
          <button
            type="button"
            onClick={() => showToast('Profile opened', 'info')}
            className="shrink-0 cursor-pointer rounded-[7px] border border-og/20 bg-og/[0.08] px-3 py-[5px] font-sans text-[11.5px] text-og transition-all duration-150 hover:bg-og/[0.16]"
          >
            View
          </button>
        </div>
      ))}
    </div>
  )
}
