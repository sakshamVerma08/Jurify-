// FILE: components/cases/CasesPageContent.tsx
// TYPE: Client Component

'use client'

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

export function CasesPageContent() {
  const activeTab = useCasesStore((s) => s.activeTab)

  return (
    <>
      <CasesPageHeader />
        <CasesRoleBar />

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
