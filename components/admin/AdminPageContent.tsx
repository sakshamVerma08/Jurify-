'use client'

import { useAdminStore } from '@/stores/adminStore'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopbar } from './AdminTopbar'
import { OverviewPanel } from './OverviewPanel'
import { UsersPanel } from './UsersPanel'
import { VerificationsPanel } from './VerificationsPanel'
import { CasesPanel } from './CasesPanel'
import { BlogsPanel } from './BlogsPanel'
import { ReportsPanel } from './ReportsPanel'
import { LogsPanel } from './LogsPanel'
import { SettingsPanel } from './SettingsPanel'
import { VerificationModal } from './VerificationModal'
import { Toast } from '@/components/ui/Toast'

export function AdminPageContent() {
  const currentTab = useAdminStore((s) => s.currentTab)

  return (
    <div className="flex min-h-screen w-full bg-bg text-t font-sans select-none">
      {/* Toast provider */}
      <Toast />

      {/* Admin Panel Layout */}
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AdminTopbar />
        <div className="flex-1 overflow-y-auto px-7 pt-7 pb-[60px]">
          {currentTab === 'overview' && <OverviewPanel />}
          {currentTab === 'users' && <UsersPanel />}
          {currentTab === 'verifications' && <VerificationsPanel />}
          {currentTab === 'cases' && <CasesPanel />}
          {currentTab === 'blogs' && <BlogsPanel />}
          {currentTab === 'reports' && <ReportsPanel />}
          {currentTab === 'logs' && <LogsPanel />}
          {currentTab === 'settings' && <SettingsPanel />}
        </div>
      </div>
      
      {/* Kyc review overlays */}
      <VerificationModal />
    </div>
  )
}
