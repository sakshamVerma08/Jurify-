// FILE: components/lawyer-profile/LawyerProfileStats.tsx
// TYPE: Client Component

'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/lib/hooks/useInView'
import type { LawyerProfileStat } from '@/types'

const CIRCUMFERENCE = 2 * Math.PI * 30

interface LawyerProfileStatsProps {
  stats: LawyerProfileStat[]
}

export function LawyerProfileStats({ stats }: LawyerProfileStatsProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [values, setValues] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!inView) return

    const targets = Object.fromEntries(stats.map((s) => [s.id, s.value]))
    const start = performance.now()
    const duration = 1500

    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 4)
      const next: Record<string, number> = {}
      stats.forEach((s) => {
        next[s.id] = Math.round(s.value * ease)
      })
      setValues(next)
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [inView, stats])

  const circleStat = stats.find((s) => s.type === 'circle')

  return (
    <div
      ref={ref}
      className="profile-stats-in col-span-full mb-6 grid grid-cols-2 gap-0 rounded-[18px] border border-white/[0.08] bg-card px-8 py-7 shadow-[0_8px_32px_rgba(0,0,0,0.3)] lg:grid-cols-4"
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="profileGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4853A" />
            <stop offset="100%" stopColor="#E8A44A" />
          </linearGradient>
        </defs>
      </svg>

      {stats.map((stat, i) => (
        <div
          key={stat.id}
          className={`flex flex-col items-center px-5 py-2 ${i < stats.length - 1 ? 'border-r border-white/[0.06] max-lg:even:border-r-0 max-lg:[&:nth-child(-n+2)]:border-b max-lg:[&:nth-child(-n+2)]:pb-6 max-lg:[&:nth-child(-n+2)]:mb-2' : ''}`}
        >
          {stat.type === 'circle' ? (
            <div className="relative mb-3 h-[72px] w-[72px]">
              <svg className="-rotate-90" width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
                <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="none"
                  stroke="url(#profileGoldGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={
                    inView && circleStat?.circlePct
                      ? CIRCUMFERENCE - (circleStat.circlePct / 100) * CIRCUMFERENCE
                      : CIRCUMFERENCE
                  }
                  className="transition-[stroke-dashoffset] duration-[1500ms] ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold leading-none text-[var(--t)]">{values[stat.id] ?? 0}</span>
                <span className="text-[11px] font-semibold text-og">%</span>
              </div>
            </div>
          ) : (
            <div className="mb-1.5 text-[28px] font-bold leading-none text-[var(--t)]">
              <span>{values[stat.id] ?? 0}</span>
              {stat.suffix && <span className="text-lg text-og">{stat.suffix}</span>}
            </div>
          )}
          <p className="text-[11.5px] font-medium uppercase tracking-[0.8px] text-[var(--td)]">{stat.label}</p>
          <p className="mt-0.5 text-[10.5px] text-[rgba(245,240,234,0.22)]">{stat.sub}</p>
        </div>
      ))}
    </div>
  )
}
