// FILE: components/cases/CasesGrid.tsx
// TYPE: Client Component

'use client'

import { CaseCard } from '@/components/cases/CaseCard'
import type { LegalCase, UserRole } from '@/types'

interface CasesGridProps {
  cases: LegalCase[]
  viewRole: UserRole
}

export function CasesGrid({ cases, viewRole }: CasesGridProps) {
  if (cases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-card px-8 py-16 text-center">
        <p className="mb-2 font-serif text-2xl font-light text-[var(--t)]">No cases found</p>
        <p className="text-[13px] text-[var(--tm)]">Try adjusting your filters or search query.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3.5">
      {cases.map((legalCase, index) => (
        <CaseCard key={legalCase.id} legalCase={legalCase} viewRole={viewRole} index={index} />
      ))}
    </div>
  )
}
