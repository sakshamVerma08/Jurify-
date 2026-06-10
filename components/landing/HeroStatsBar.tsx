// FILE: components/landing/HeroStatsBar.tsx
// TYPE: Server Component

import { AnimatedCounter } from '@/components/landing/AnimatedCounter'
import { HERO_STATS } from '@/lib/data/landing'

function StatIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'lawyers':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="8" cy="7" r="3" stroke="#D4853A" strokeWidth="1.4" />
          <circle cx="16" cy="7" r="3" stroke="#D4853A" strokeWidth="1.4" />
          <path d="M2 20c0-3.3 2.7-6 6-6" stroke="#D4853A" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M10 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#D4853A" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )
    case 'cases':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3L6 6v5c0 4.5 2.7 8 6 9 3.3-1 6-4.5 6-9V6l-6-3z" stroke="#D4853A" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke="#D4853A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'domains':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="#D4853A" strokeWidth="1.4" />
          <path d="M8 8h8M8 12h8M8 16h5" stroke="#D4853A" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

export function HeroStatsBar() {
  return (
    <div className="animate-fade-up-delay-stats relative z-[3] mx-4 mt-10 grid grid-cols-1 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[rgba(14,13,11,0.92)] shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-[12px] sm:mx-8 lg:mx-12 lg:grid-cols-3">
      {HERO_STATS.map((stat, index) => (
        <div
          key={stat.id}
          className={`group flex items-center gap-[18px] border-white/[0.07] px-6 py-6 transition-colors duration-250 hover:bg-[rgba(212,133,58,0.04)] sm:px-8 ${index < HERO_STATS.length - 1 ? 'border-b lg:border-b-0 lg:border-r' : ''}`}
        >
          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] border border-[rgba(212,133,58,0.22)] bg-[rgba(212,133,58,0.1)] transition-all duration-250 group-hover:border-[rgba(212,133,58,0.4)] group-hover:bg-[rgba(212,133,58,0.18)]">
            <StatIcon icon={stat.icon} />
          </div>
          <div>
            <div className="mb-1 font-sans text-[28px] font-semibold leading-none text-[var(--t)] sm:text-[32px]">
              {stat.id === 'lawyers' && (
                <AnimatedCounter value={10} suffix="+" useThousands />
              )}
              {stat.id === 'cases' && stat.numericValue && (
                <AnimatedCounter value={stat.numericValue} suffix="+" />
              )}
              {stat.id === 'domains' && stat.numericValue && (
                <AnimatedCounter value={stat.numericValue} suffix="+" />
              )}
            </div>
            <div className="text-[13px] font-medium text-[rgba(245,240,234,0.55)]">{stat.label}</div>
            <div className="mt-0.5 text-[11px] text-[rgba(245,240,234,0.28)]">{stat.sublabel}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
