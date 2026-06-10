// FILE: components/dashboard/DashboardPageContent.tsx
// TYPE: Client Component

'use client'

import { ClientDashboardPanel } from '@/components/dashboard/ClientDashboardPanel'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { DashboardTopBar } from '@/components/dashboard/DashboardTopBar'
import { LawyerDashboardPanel } from '@/components/dashboard/LawyerDashboardPanel'
import { LawyerMyCasesView } from '@/components/dashboard/LawyerMyCasesView'
import { LawyerActiveCasesView } from '@/components/dashboard/LawyerActiveCasesView'
import { Toast } from '@/components/ui/Toast'
import { useDashboardStore } from '@/stores/dashboardStore'

export function DashboardPageContent() {
  const viewRole = useDashboardStore((s) => s.viewRole)
  const dashboardView = useDashboardStore((s) => s.dashboardView)

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardTopBar />
        <main className="flex-1 overflow-y-auto px-8 pb-[60px] pt-7 max-md:px-4">
          {viewRole === 'lawyer' ? (
            dashboardView === 'my-cases' ? <LawyerMyCasesView /> :
            dashboardView === 'active-cases' ? <LawyerActiveCasesView /> :
            <LawyerDashboardPanel />
          ) : (
            <ClientDashboardPanel />
          )}
        </main>
      </div>
      <Toast />
    </div>
  )
}
