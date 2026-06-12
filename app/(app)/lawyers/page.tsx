// FILE: app/(app)/lawyers/page.tsx
// TYPE: Client Component shell
// RENDERING: CSR — search, filters, grid/list, profile modal

import { LawyerSearchPageContent } from '@/components/lawyers/LawyerSearchPageContent'
import { Navbar } from '@/components/layout/Navbar'
import { Toast } from '@/components/ui/Toast'

import { getLawyersAction } from '@/actions/lawyers/browse'

export default async function LawyersPage() {
  const result = await getLawyersAction()
  const initialLawyers = result.success && result.data ? result.data : []

  return (
    <div className="lawyer-search-bg min-h-screen bg-bg">
      <Navbar />
      <Toast />
      <div className="relative z-[1] pt-[68px]">
        <LawyerSearchPageContent initialLawyers={initialLawyers} />
      </div>
    </div>
  )
}
