// FILE: components/dashboard/LawyerDashboardPanel.tsx
// TYPE: Server Component

import { CaseTypeDonutChart } from '@/components/dashboard/CaseTypeDonutChart'
import { CasesLineChart } from '@/components/dashboard/CasesLineChart'
import { DashboardCaseList } from '@/components/dashboard/DashboardCaseList'
import { DashboardConsultationList } from '@/components/dashboard/DashboardConsultationList'
import { DashboardMessageList } from '@/components/dashboard/DashboardMessageList'
import { DashboardStatCard } from '@/components/dashboard/DashboardStatCard'
import { DashboardWidget } from '@/components/dashboard/DashboardWidget'
import { MiniCalendar } from '@/components/dashboard/MiniCalendar'
import {
  LAWYER_ACTIVE_CASES,
  LAWYER_CONSULTATIONS,
  LAWYER_MESSAGES,
  LAWYER_STATS,
} from '@/lib/data/dashboard'
import { useDashboardStore } from '@/stores/dashboardStore'

export function LawyerDashboardPanel() {
  const setDashboardView = useDashboardStore((s) => s.setDashboardView)

  return (
    <>
      <div className="mb-[22px] grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {LAWYER_STATS.map((stat, index) => (
          <DashboardStatCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <DashboardWidget title="Cases Over Time" subtitle="Last 6 months" actionLabel="Export">
          <CasesLineChart />
        </DashboardWidget>
        <DashboardWidget title="Case Types" subtitle="By category">
          <CaseTypeDonutChart />
        </DashboardWidget>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <DashboardWidget
          title="Active Cases"
          subtitle="Requires your attention"
          actionLabel="View all"
          onActionClick={() => setDashboardView('active-cases')}
        >
          <DashboardCaseList cases={LAWYER_ACTIVE_CASES} />
        </DashboardWidget>
        <DashboardWidget title="Schedule" subtitle="May 2026">
          <MiniCalendar />
        </DashboardWidget>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardWidget title="Recent Messages" subtitle="5 unread" actionLabel="Open inbox">
          <DashboardMessageList messages={LAWYER_MESSAGES} />
        </DashboardWidget>
        <DashboardWidget title="Upcoming Consultations" subtitle="Next 3 days" actionLabel="Manage">
          <DashboardConsultationList items={LAWYER_CONSULTATIONS} />
        </DashboardWidget>
      </div>
    </>
  )
}
