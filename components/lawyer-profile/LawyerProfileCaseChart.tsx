// FILE: components/lawyer-profile/LawyerProfileCaseChart.tsx
// TYPE: Client Component

'use client'

import { useEffect, useState } from 'react'
import { ProfileSectionCard } from '@/components/lawyer-profile/ProfileSectionCard'
import { useInView } from '@/lib/hooks/useInView'
import type { DonutSegment } from '@/types'

interface LawyerProfileCaseChartProps {
  segments: DonutSegment[]
  totalCases: number
}

const CX = 80
const CY = 80
const R = 60
const STROKE = 22
const CIRC = 2 * Math.PI * R

export function LawyerProfileCaseChart({ segments, totalCases }: LawyerProfileCaseChartProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [legendWidths, setLegendWidths] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!inView) return
    setLegendWidths(Object.fromEntries(segments.map((s) => [s.label, s.pct])))
  }, [inView, segments])

  let offset = 0
  const circles = segments.map((d) => {
    const dash = (d.pct / 100) * CIRC
    const gap = CIRC - dash
    const circle = (
      <circle
        key={d.label}
        className="profile-donut-seg"
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke={d.color}
        strokeWidth={STROKE}
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={-offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${CX} ${CY})`}
      />
    )
    offset += dash
    return circle
  })

  return (
    <ProfileSectionCard
      tag="Section 05"
      title={
        <>
          Case Type <em className="italic text-o2">Distribution</em>
        </>
      }
    >
      <div ref={ref} className="flex flex-wrap items-center gap-7">
        <div className="relative h-40 w-40 shrink-0">
          <svg width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
            {circles}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[22px] font-bold leading-none text-[var(--t)]">{totalCases}</span>
            <span className="mt-0.5 text-center text-[10px] leading-snug text-[var(--td)]">
              Total
              <br />
              Cases
            </span>
          </div>
        </div>
        <div className="flex min-w-[200px] flex-1 flex-col gap-2.5">
          {segments.map((d) => (
            <div key={d.label} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: d.color }} />
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] text-[var(--tm)]">{d.label}</p>
                  <div className="mt-0.5 h-[3px] w-full overflow-hidden rounded-sm bg-white/[0.06]">
                    <div
                      className="h-full rounded-sm transition-[width] duration-[1300ms] ease-out"
                      style={{ width: `${legendWidths[d.label] ?? 0}%`, background: d.color }}
                    />
                  </div>
                </div>
              </div>
              <span className="shrink-0 text-xs font-semibold text-[var(--t)]">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </ProfileSectionCard>
  )
}
