// FILE: components/lawyer-profile/LawyerProfileCalendar.tsx
// TYPE: Client Component

'use client'

import { useMemo } from 'react'
import { ProfileSectionCard } from '@/components/lawyer-profile/ProfileSectionCard'
import { CALENDAR_DAY_LABELS, CALENDAR_MONTHS } from '@/lib/data/lawyerProfile'
import { cn } from '@/lib/utils'
import { useLawyerProfileStore } from '@/stores/lawyerProfileStore'
import { useUiStore } from '@/stores/uiStore'

interface LawyerProfileCalendarProps {
  baseDate: string
  weeklySlots: Record<number, string[]>
  bookedSlots: string[]
  lawyerName: string
}

export function LawyerProfileCalendar({
  baseDate,
  weeklySlots,
  bookedSlots,
  lawyerName,
}: LawyerProfileCalendarProps) {
  const calWeekOffset = useLawyerProfileStore((s) => s.calWeekOffset)
  const selectedSlot = useLawyerProfileStore((s) => s.selectedSlot)
  const shiftWeek = useLawyerProfileStore((s) => s.shiftWeek)
  const selectSlot = useLawyerProfileStore((s) => s.selectSlot)
  const showToast = useUiStore((s) => s.showToast)

  const { weekLabel, days } = useMemo(() => {
    const base = new Date(baseDate)
    base.setDate(base.getDate() + calWeekOffset * 7)

    const end = new Date(base)
    end.setDate(end.getDate() + 6)

    const label = `${base.getDate()} ${CALENDAR_MONTHS[base.getMonth()]} – ${end.getDate()} ${CALENDAR_MONTHS[end.getMonth()]} ${end.getFullYear()}`

    const dayCells = CALENDAR_DAY_LABELS.map((dayLabel, i) => {
      const dayDate = new Date(base)
      dayDate.setDate(dayDate.getDate() + i)
      const today = new Date()
      const isToday = dayDate.toDateString() === today.toDateString()
      const slots = (weeklySlots[i] ?? []).map((time) => {
        const key = `${dayLabel} ${time}`
        return {
          time,
          key,
          isBooked: bookedSlots.includes(key),
          isSelected: selectedSlot === key,
        }
      })
      return { dayLabel, date: dayDate.getDate(), isToday, slots }
    })

    return { weekLabel: label, days: dayCells }
  }, [baseDate, calWeekOffset, weeklySlots, bookedSlots, selectedSlot])

  return (
    <ProfileSectionCard
      tag="Section 03"
      title={
        <>
          Availability <em className="italic text-o2">Calendar</em>
        </>
      }
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => shiftWeek(-1)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[7px] border border-white/[0.09] bg-white/[0.05] text-[var(--td)] transition-all duration-150 hover:bg-white/[0.09] hover:text-[var(--tm)]"
            aria-label="Previous week"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-[13px] font-medium text-[var(--tm)]">{weekLabel}</span>
          <button
            type="button"
            onClick={() => shiftWeek(1)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[7px] border border-white/[0.09] bg-white/[0.05] text-[var(--td)] transition-all duration-150 hover:bg-white/[0.09] hover:text-[var(--tm)]"
            aria-label="Next week"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-7 gap-1.5">
        {CALENDAR_DAY_LABELS.map((d) => (
          <div
            key={d}
            className="pb-2 text-center text-[10px] font-medium uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)]"
          >
            {d}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.dayLabel}
            className={cn('flex min-h-[72px] flex-col items-center gap-1 rounded-[10px] px-1 py-1.5', day.isToday && 'ring-1 ring-og/20')}
          >
            <span className={cn('mb-0.5 text-xs font-medium', day.isToday ? 'font-semibold text-og' : 'text-[var(--td)]')}>
              {day.date}
            </span>
            {day.slots.map((slot) => (
              <button
                key={slot.key}
                type="button"
                disabled={slot.isBooked}
                onClick={() => !slot.isBooked && selectSlot(slot.key)}
                className={cn(
                  'w-full rounded-md px-0.5 py-[3px] text-center font-sans text-[9.5px] transition-all duration-150',
                  slot.isBooked &&
                    'cursor-default border border-white/[0.07] bg-white/[0.04] text-[rgba(245,240,234,0.25)] line-through',
                  !slot.isBooked &&
                    !slot.isSelected &&
                    'cursor-pointer border border-og/30 bg-og/[0.12] text-o2 hover:border-og/50 hover:bg-og/[0.22]',
                  slot.isSelected && 'cursor-pointer border border-og bg-og text-white shadow-[0_2px_8px_rgba(212,133,58,0.35)]'
                )}
              >
                {slot.time}
              </button>
            ))}
          </div>
        ))}
      </div>

      {selectedSlot && (
        <div className="mt-3.5 flex items-center justify-between rounded-[10px] border border-og/20 bg-og/[0.07] px-4 py-3">
          <p className="text-[13px] text-[var(--tm)]">
            Selected: <strong className="text-o2">{selectedSlot}</strong>
          </p>
          <button
            type="button"
            onClick={() => showToast(`Booking request sent to ${lawyerName}!`, 'ok')}
            className="btn-gradient-nav cursor-pointer rounded-lg border-none px-[18px] py-2 font-sans text-[12.5px] font-medium text-white transition-all duration-200 hover:-translate-y-px hover:opacity-90"
          >
            Confirm Booking
          </button>
        </div>
      )}
    </ProfileSectionCard>
  )
}
