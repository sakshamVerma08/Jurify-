// FILE: components/dashboard/MiniCalendar.tsx
// TYPE: Server Component

import { CALENDAR_EVENTS, MINI_CALENDAR } from '@/lib/data/dashboard'
import { cn } from '@/lib/utils'

export function MiniCalendar() {
  const { monthLabel, today, eventDays, year, month } = MINI_CALENDAR
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const startDay = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = 32 - new Date(year, month + 1, 0).getDate()

  const cells: React.ReactNode[] = []
  for (let i = 0; i < startDay; i++) {
    const d = new Date(year, month, 0 - startDay + i + 1).getDate()
    cells.push(
      <div key={`prev-${i}`} className="mc-day other-month flex h-7 items-center justify-center rounded-[7px] text-[11.5px] text-[var(--td)] opacity-20">
        {d}
      </div>
    )
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today
    const hasEvent = eventDays.includes(d)
    cells.push(
      <div
        key={d}
        className={cn(
          'relative flex h-7 cursor-pointer items-center justify-center rounded-[7px] text-[11.5px] text-[var(--td)] transition-all duration-150 hover:bg-white/[0.05] hover:text-[var(--tm)]',
          isToday && 'bg-og/15 font-semibold text-o2',
          hasEvent &&
            "after:absolute after:bottom-0.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-og after:content-['']"
        )}
      >
        {d}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[13px] font-medium text-[var(--t)]">{monthLabel}</p>
        <div className="flex gap-1">
          <button type="button" className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] text-[var(--td)] transition-all hover:bg-white/[0.08] hover:text-[var(--tm)]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M7 2L3 5l4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] text-[var(--td)] transition-all hover:bg-white/[0.08] hover:text-[var(--tm)]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-[3px]">
        {days.map((d, i) => (
          <div key={i} className="pb-1.5 text-center text-[9px] font-medium uppercase tracking-wide text-[rgba(245,240,234,0.25)]">
            {d}
          </div>
        ))}
        {cells}
      </div>
      <div className="mt-3.5 flex flex-col gap-[5px]">
        {CALENDAR_EVENTS.map((event) => (
          <div
            key={event}
            className="flex items-center gap-[7px] rounded-lg border border-og/15 bg-og/[0.06] px-2.5 py-[7px] text-[11.5px] text-[var(--tm)]"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-og" />
            {event}
          </div>
        ))}
      </div>
    </div>
  )
}
