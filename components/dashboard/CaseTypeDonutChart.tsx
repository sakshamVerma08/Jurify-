// FILE: components/dashboard/CaseTypeDonutChart.tsx
// TYPE: Server Component

import { LAWYER_DONUT_DATA, LAWYER_DONUT_TOTAL } from '@/lib/data/dashboard'

export function CaseTypeDonutChart() {
  const cx = 60
  const cy = 60
  const r = 46
  const sw = 18
  const circ = 2 * Math.PI * r
  let offset = 0

  const segments = LAWYER_DONUT_DATA.map((d) => {
    const dash = (d.pct / 100) * circ
    const segment = (
      <circle
        key={d.label}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={d.color}
        strokeWidth={sw}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={-offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    )
    offset += dash
    return segment
  })

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-[120px] w-[120px] shrink-0">
        <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
          {segments}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold leading-none text-[var(--t)]">{LAWYER_DONUT_TOTAL}</span>
          <span className="mt-0.5 text-center text-[10px] leading-snug text-[var(--td)]">
            Total
            <br />
            Cases
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {LAWYER_DONUT_DATA.map((d) => (
          <div key={d.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-[7px]">
              <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: d.color }} />
              <span className="text-xs text-[var(--tm)]">{d.label}</span>
            </div>
            <span className="text-xs font-semibold text-[var(--t)]">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
