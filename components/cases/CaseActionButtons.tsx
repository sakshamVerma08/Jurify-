// FILE: components/cases/CaseActionButtons.tsx
// TYPE: Client Component

'use client'

import { cn } from '@/lib/utils'
import { useCasesStore } from '@/stores/casesStore'
import type { UserRole } from '@/types'

interface CaseActionButtonsProps {
  caseId: string
  viewRole: UserRole
}

export function CaseActionButtons({ caseId, viewRole }: CaseActionButtonsProps) {
  const openDetailModal = useCasesStore((s) => s.openDetailModal)

  return (
    <div className="flex gap-2">
      {viewRole === 'lawyer' && (
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-gradient-to-br from-og to-[#b8521e] px-5 py-2 text-[12.5px] font-medium text-white shadow-[0_3px_12px_rgba(200,98,42,0.25)] transition-all duration-200 hover:-translate-y-px hover:opacity-90 hover:shadow-[0_6px_18px_rgba(200,98,42,0.35)]"
          onClick={(e) => {
            e.stopPropagation()
            openDetailModal(caseId)
          }}
        >
          Apply
        </button>
      )}
      <button
        type="button"
        className={cn(
          'cursor-pointer rounded-lg border border-white/10 bg-white/[0.05] px-5 py-2 text-[12.5px] font-normal text-[var(--t)] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.09]'
        )}
        onClick={(e) => {
          e.stopPropagation()
          openDetailModal(caseId)
        }}
      >
        View
      </button>
    </div>
  )
}
