// FILE: components/dashboard/DashboardStatCard.tsx
// TYPE: Server Component

import { cn } from '@/lib/utils'
import type { DashboardStat } from '@/types'

const ICON_VARIANTS = {
  gold: 'bg-og/10 border-og/20 text-og',
  blue: 'bg-[rgba(100,150,255,0.1)] border-[rgba(100,150,255,0.2)] text-[rgba(120,180,255,0.9)]',
  green: 'bg-success/10 border-success/20 text-success',
  red: 'bg-danger/10 border-danger/20 text-danger',
}

interface DashboardStatCardProps {
  stat: DashboardStat
  index: number
}

export function DashboardStatCard({ stat, index }: DashboardStatCardProps) {
  const delays = ['dash-card-in-1', 'dash-card-in-2', 'dash-card-in-3', 'dash-card-in-4']

  return (
    <article
      className={cn(
        'dash-card-in group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card p-5 transition-all duration-200 hover:-translate-y-px hover:border-white/[0.14]',
        delays[index % delays.length]
      )}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-transparent transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-og group-hover:to-o2" />
      <div className="mb-3.5 flex items-start justify-between">
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border',
            ICON_VARIANTS[stat.iconVariant]
          )}
        >
          <StatIcon variant={stat.iconVariant} />
        </div>
        {stat.change && (
          <span
            className={cn(
              'flex items-center gap-0.5 rounded-full px-[7px] py-[3px] text-[11px] font-medium',
              stat.changeDirection === 'up' && 'bg-success/10 text-success',
              stat.changeDirection === 'down' && 'bg-danger/10 text-danger',
              stat.changeDirection === 'neutral' && 'bg-white/[0.06] text-[var(--tm)]'
            )}
          >
            {stat.change}
          </span>
        )}
      </div>
      <p className="mb-1 text-[30px] font-bold leading-none text-[var(--t)]">{stat.value}</p>
      <p className="text-xs text-[var(--td)]">{stat.label}</p>
      <p className="mt-[3px] text-[11px] text-[rgba(245,240,234,0.22)]">{stat.sub}</p>
    </article>
  )
}

function StatIcon({ variant }: { variant: DashboardStat['iconVariant'] }) {
  if (variant === 'green') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1l1.5 4.5H14L10 8l1.5 4.5L8 10l-3.5 2.5L6 8 2 5.5h4.5L8 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
    )
  }
  if (variant === 'blue') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 12V5l6-3 6 3v7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="5.5" y="8" width="5" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1" />
      <line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
