// FILE: components/dashboard/DashboardSidebar.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'
import {
  DASHBOARD_NAV_ACCOUNT,
  DASHBOARD_NAV_MAIN,
  DASHBOARD_NAV_WORK,
  DASHBOARD_PROFILES,
} from '@/lib/data/dashboard'
import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/stores/dashboardStore'
import type { DashboardNavIcon, DashboardNavItem } from '@/types'

export function DashboardSidebar() {
  const pathname = usePathname()
  const viewRole = useDashboardStore((s) => s.viewRole)
  const dashboardView = useDashboardStore((s) => s.dashboardView)
  const setDashboardView = useDashboardStore((s) => s.setDashboardView)
  const profile = DASHBOARD_PROFILES[viewRole]

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col overflow-y-auto border-r border-white/[0.07] bg-[rgba(10,10,9,0.95)] max-md:hidden">
      <Link href="/" className="flex items-center gap-[9px] border-b border-white/[0.06] px-5 pb-[18px] pt-[22px] no-underline">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-og/50 bg-gradient-to-br from-og/25 to-o/10">
          <JurifyLogoIcon size={17} />
        </div>
        <span className="font-serif text-xl font-semibold tracking-wide text-[var(--t)]">Jurify</span>
      </Link>



      <NavSection label="Main" items={DASHBOARD_NAV_MAIN} pathname={pathname} viewRole={viewRole} dashboardView={dashboardView} setDashboardView={setDashboardView} />
      <NavSection label="Work" items={DASHBOARD_NAV_WORK} pathname={pathname} viewRole={viewRole} dashboardView={dashboardView} setDashboardView={setDashboardView} />
      <NavSection label="Account" items={DASHBOARD_NAV_ACCOUNT} pathname={pathname} viewRole={viewRole} dashboardView={dashboardView} setDashboardView={setDashboardView} />

      <div className="mt-auto flex items-center gap-2.5 border-t border-white/[0.06] px-4 py-3.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-og/30 bg-og/[0.18] font-serif text-[13px] font-semibold text-og">
          {profile.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-medium text-[var(--t)]">{profile.name}</p>
          <p className="text-[10.5px] text-[var(--td)]">{profile.roleLabel}</p>
        </div>
        <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-success shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
      </div>
    </aside>
  )
}

function NavSection({
  label,
  items,
  pathname,
  viewRole,
  dashboardView,
  setDashboardView,
}: {
  label: string
  items: DashboardNavItem[]
  pathname: string
  viewRole: 'lawyer' | 'client'
  dashboardView: 'overview' | 'my-cases' | 'active-cases'
  setDashboardView: (view: 'overview' | 'my-cases' | 'active-cases') => void
}) {
  const visible = items.filter((item) => !item.lawyerOnly || viewRole === 'lawyer')
  if (visible.length === 0) return null

  return (
    <>
      <p className="px-3.5 pb-1 pt-3.5 text-[9px] font-medium uppercase tracking-[1.3px] text-[rgba(245,240,234,0.22)]">
        {label}
      </p>
      {visible.map((item) => {
        const labelText =
          item.dynamicLabel === 'activeCases'
            ? viewRole === 'lawyer'
              ? 'Active Cases'
              : 'My Cases'
            : item.dynamicLabel === 'myCases'
              ? 'My Cases'
              : item.label
        const badge =
          item.id === 'cases' ? (viewRole === 'lawyer' ? 3 : 2) : item.badge
        const isDashboardOverview = item.id === 'dashboard'
        const isMyCases = item.id === 'applications'
        const isActiveCases = item.id === 'mycases'

        let isActive = false
        if (isDashboardOverview) {
          isActive = pathname === item.href && dashboardView === 'overview'
        } else if (isMyCases) {
          isActive = dashboardView === 'my-cases'
        } else if (isActiveCases) {
          isActive = dashboardView === 'active-cases'
        } else {
          isActive = pathname === item.href && item.href !== '#'
        }

        const className = cn(
          'mx-1.5 mb-0.5 flex w-full items-center gap-2.5 rounded-[9px] border border-transparent px-4 py-[9px] text-left font-sans text-[13px] text-[var(--tm)] no-underline transition-all duration-200 hover:bg-white/[0.04] hover:text-[var(--t)] [&_svg]:opacity-55',
          isActive && 'border-og/20 bg-og/10 text-o2 [&_svg]:opacity-90'
        )

        const content = (
          <>
            <NavIcon icon={item.icon} />
            {labelText}
            {badge !== undefined && (
              <span
                className={cn(
                  'ml-auto flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-[5px] text-[10px] font-semibold',
                  item.badgeVariant === 'danger'
                    ? 'bg-danger/20 text-danger'
                    : 'bg-og/20 text-o2'
                )}
              >
                {badge}
              </span>
            )}
          </>
        )

        if (isMyCases || isActiveCases) {
          return (
            <button
              key={item.id}
              type="button"
              className={className}
              onClick={() => setDashboardView(isMyCases ? 'my-cases' : 'active-cases')}
            >
              {content}
            </button>
          )
        }

        return (
          <Link
            key={item.id}
            href={item.href}
            className={className}
            onClick={() => {
              if (isDashboardOverview) setDashboardView('overview')
            }}
          >
            {content}
          </Link>
        )
      })}
    </>
  )
}

function NavIcon({ icon }: { icon: DashboardNavIcon }) {
  const props = { width: 15, height: 15, viewBox: '0 0 15 15', fill: 'none' as const, 'aria-hidden': true as const }
  switch (icon) {
    case 'dashboard':
      return (
        <svg {...props}>
          <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
          <rect x="8.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
          <rect x="1.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
          <rect x="8.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      )
    case 'cases':
      return (
        <svg {...props}>
          <rect x="1.5" y="1.5" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
          <line x1="4" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1" />
          <line x1="4" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    case 'lawyers':
      return (
        <svg {...props}>
          <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="11.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.1" />
          <path d="M2 13c0-2.5 2.2-4.5 5.5-4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M9 13c0-2.5 2.2-4.5 5.5-4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
    case 'ai':
      return (
        <svg {...props}>
          <path d="M7.5 1l1.5 4H13L9.5 7.5 11 12 7.5 9.5 4 12l1.5-4.5L2 5h4L7.5 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      )
    case 'applications':
      return (
        <svg {...props}>
          <path d="M2 12V5l5-3 5 3v7" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
          <rect x="5.5" y="8" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    case 'mycases':
      return (
        <svg {...props}>
          <rect x="2" y="2" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
          <line x1="5" y1="5.5" x2="10" y2="5.5" stroke="currentColor" strokeWidth="1" />
          <line x1="5" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    case 'messages':
      return (
        <svg {...props}>
          <path d="M2 11V4.5l5.5 3.5 5.5-3.5V11" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
          <rect x="2" y="4.5" width="11" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      )
    case 'schedule':
      return (
        <svg {...props}>
          <rect x="1.5" y="2.5" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
          <path d="M4 2.5V1.5M11 2.5V1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="1.5" y1="5.5" x2="13.5" y2="5.5" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    case 'profile':
      return (
        <svg {...props}>
          <circle cx="7.5" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.1" />
          <path d="M1.5 13.5c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.1" />
          <path d="M7.5 1v1M7.5 13v1M1 7.5h1M13 7.5h1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
  }
}
