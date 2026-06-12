// FILE: components/cases/CasesRoleBar.tsx
// TYPE: Client Component

'use client'

import { cn } from '@/lib/utils'
import { useCasesStore } from '@/stores/casesStore'
import type { CasesTab, UserRole } from '@/types'

const LAWYER_TABS: { id: CasesTab; label: string }[] = [
  { id: 'browse', label: 'Browse Cases' },
  { id: 'applications', label: 'My Applications' },
  { id: 'active', label: 'Active Cases' },
]

const CLIENT_TABS: { id: CasesTab; label: string }[] = [
  { id: 'browse', label: 'Browse Cases' },
  { id: 'mycases', label: 'My Cases' },
]

export function CasesRoleBar({ userRole }: { userRole: 'LAWYER' | 'CLIENT' }) {
  const activeTab = useCasesStore((s) => s.activeTab)
  const setActiveTab = useCasesStore((s) => s.setActiveTab)
  const viewRole = userRole.toLowerCase() as 'lawyer' | 'client'

  const tabs = viewRole === 'lawyer' ? LAWYER_TABS : CLIENT_TABS

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] bg-[rgba(10,10,9,0.5)] px-[60px] max-md:px-6">
      <div className="flex items-center">
        <div className="flex items-center max-md:mt-2 max-md:w-full max-md:overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'cursor-pointer whitespace-nowrap border-b-2 border-transparent bg-transparent px-5 py-5 font-sans text-[13.5px] font-normal text-[var(--tm)] transition-colors duration-200 hover:text-[var(--t)]',
                activeTab === tab.id && 'border-og text-[var(--t)]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

