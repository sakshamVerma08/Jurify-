// FILE: components/dashboard/ClientDashboardPanel.tsx
// TYPE: Server Component

import { AiChatPreviewList } from '@/components/dashboard/AiChatPreviewList'
import { DashboardCaseList } from '@/components/dashboard/DashboardCaseList'
import { DashboardNotificationList } from '@/components/dashboard/DashboardNotificationList'
import { DashboardStatCard } from '@/components/dashboard/DashboardStatCard'
import { DashboardWidget } from '@/components/dashboard/DashboardWidget'
import { RecommendedLawyers } from '@/components/dashboard/RecommendedLawyers'
import {
  CLIENT_MY_CASES,
  CLIENT_NOTIFICATIONS,
  CLIENT_STATS,
} from '@/lib/data/dashboard'

export function ClientDashboardPanel() {
  return (
    <>
      <div className="mb-[22px] grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {CLIENT_STATS.map((stat, index) => (
          <DashboardStatCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <DashboardWidget
          title="My Cases"
          subtitle="Track your legal matters"
          actionLabel="Post new case"
          actionHref="/cases"
        >
          <DashboardCaseList cases={CLIENT_MY_CASES} />
        </DashboardWidget>
        <DashboardWidget title="Notifications" subtitle="3 unread" actionLabel="Mark all read">
          <DashboardNotificationList items={CLIENT_NOTIFICATIONS} />
        </DashboardWidget>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardWidget title="Recommended Lawyers" subtitle="Based on your cases" actionLabel="Browse all">
          <RecommendedLawyers />
        </DashboardWidget>
        <DashboardWidget
          title="Recent AI Conversations"
          subtitle="Your document analyses"
          actionLabel="Open AI"
          actionHref="/ai-assistant"
        >
          <AiChatPreviewList />
        </DashboardWidget>
      </div>
    </>
  )
}
