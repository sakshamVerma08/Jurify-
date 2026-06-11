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

export function CasesRoleBar() {
  const viewRole = useCasesStore((s) => s.viewRole)
  const activeTab = useCasesStore((s) => s.activeTab)
  const setViewRole = useCasesStore((s) => s.setViewRole)
  const setActiveTab = useCasesStore((s) => s.setActiveTab)

  const tabs = viewRole === 'lawyer' ? LAWYER_TABS : CLIENT_TABS

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] bg-[rgba(10,10,9,0.5)] px-[60px] max-md:px-6">
      <div className="flex items-center">
        <RoleToggle viewRole={viewRole} onChange={setViewRole} />
        <div className="ml-6 flex items-center max-md:ml-0 max-md:mt-2 max-md:w-full max-md:overflow-x-auto">
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
      <p className="px-1 text-[11.5px] text-[var(--td)] max-md:hidden">
        Viewing as:{' '}
        <strong className="font-medium text-[var(--tm)]">
          {viewRole === 'lawyer' ? 'Lawyer' : 'Client'}
        </strong>
      </p>
    </div>
  )
}

function RoleToggle({
  viewRole,
  onChange,
}: {
  viewRole: UserRole
  onChange: (role: UserRole) => void
}) {
  return (
    <div className="my-3 flex items-center gap-1.5 rounded-[10px] border border-white/[0.08] bg-white/[0.04] p-1">
      <button
        type="button"
        onClick={() => onChange('lawyer')}
        className={cn(
          'cursor-pointer rounded-[7px] border border-transparent bg-transparent px-4 py-1.5 font-sans text-xs font-medium text-[var(--tm)] transition-all duration-200',
          viewRole === 'lawyer' && 'border-og/30 bg-og/20 text-o2'
        )}
      >
        Lawyer
      </button>
      <button
        type="button"
        onClick={() => onChange('client')}
        className={cn(
          'cursor-pointer rounded-[7px] border border-transparent bg-transparent px-4 py-1.5 font-sans text-xs font-medium text-[var(--tm)] transition-all duration-200',
          viewRole === 'client' && 'border-og/30 bg-og/20 text-o2'
        )}
      >
        Client
      </button>
    </div>
  )
}
