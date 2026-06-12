// FILE: components/cases/CasesPageContent.tsx
// TYPE: Client Component

'use client'

import { useEffect } from 'react'
import { ActiveCasesTab } from '@/components/cases/ActiveCasesTab'
import { ApplicationsTab } from '@/components/cases/ApplicationsTab'
import { CaseDetailModal } from '@/components/cases/CaseDetailModal'
import { CasesBrowseTab } from '@/components/cases/CasesBrowseTab'
import { CasesPageHeader } from '@/components/cases/CasesPageHeader'
import { CasesRoleBar } from '@/components/cases/CasesRoleBar'
import { MyCasesTab } from '@/components/cases/MyCasesTab'
import { PostCaseModal } from '@/components/cases/PostCaseModal'
import { EditCaseModal } from '@/components/cases/EditCaseModal'
import { useCasesStore } from '@/stores/casesStore'

export function CasesPageContent({ userRole }: { userRole: 'LAWYER' | 'CLIENT' }) {
  const activeTab = useCasesStore((s) => s.activeTab)
  const setViewRole = useCasesStore((s) => s.setViewRole)

  useEffect(() => {
    setViewRole(userRole.toLowerCase() as 'lawyer' | 'client')
  }, [userRole, setViewRole])

  return (
    <>
      <CasesPageHeader />
      <CasesRoleBar userRole={userRole} />

        {activeTab === 'browse' && <CasesBrowseTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
        {activeTab === 'active' && <ActiveCasesTab />}
        {activeTab === 'mycases' && <MyCasesTab />}

      <PostCaseModal />
      <EditCaseModal />
      <CaseDetailModal />
    </>
  )
}
