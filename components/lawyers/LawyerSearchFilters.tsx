// FILE: components/lawyers/LawyerSearchFilters.tsx
// TYPE: Client Component

'use client'

import {
  LAWYER_SEARCH_LANGUAGES,
  LAWYER_SEARCH_LOCATIONS,
  LAWYER_SEARCH_PRACTICE_AREAS,
} from '@/lib/data/lawyerSearch'
import { cn } from '@/lib/utils'
import { useLawyerSearchStore } from '@/stores/lawyerSearchStore'
import { useUiStore } from '@/stores/uiStore'

export function LawyerSearchFilters() {
  const searchQuery = useLawyerSearchStore((s) => s.searchQuery)
  const verifiedOnly = useLawyerSearchStore((s) => s.verifiedOnly)
  const availabilityFilter = useLawyerSearchStore((s) => s.availabilityFilter)
  const practiceAreas = useLawyerSearchStore((s) => s.practiceAreas)
  const minExperience = useLawyerSearchStore((s) => s.minExperience)
  const languages = useLawyerSearchStore((s) => s.languages)
  const locations = useLawyerSearchStore((s) => s.locations)
  const setSearchQuery = useLawyerSearchStore((s) => s.setSearchQuery)
  const toggleVerifiedOnly = useLawyerSearchStore((s) => s.toggleVerifiedOnly)
  const setAvailabilityFilter = useLawyerSearchStore((s) => s.setAvailabilityFilter)
  const togglePracticeArea = useLawyerSearchStore((s) => s.togglePracticeArea)
  const setMinExperience = useLawyerSearchStore((s) => s.setMinExperience)
  const toggleLanguage = useLawyerSearchStore((s) => s.toggleLanguage)
  const toggleLocation = useLawyerSearchStore((s) => s.toggleLocation)
  const resetFilters = useLawyerSearchStore((s) => s.resetFilters)
  const showToast = useUiStore((s) => s.showToast)

  function handleReset() {
    resetFilters()
    showToast('Filters cleared', 'info')
  }

  return (
    <aside className="sticky top-[68px] hidden h-[calc(100vh-68px)] overflow-y-auto border-r border-white/[0.06] px-7 py-8 lg:block">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[var(--t)]">Filters</span>
        <button
          type="button"
          onClick={handleReset}
          className="cursor-pointer border-none bg-transparent font-sans text-[11.5px] text-og hover:text-o2 hover:underline"
        >
          Reset all
        </button>
      </div>

      <div className="relative mb-5">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-35"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="10" y1="10" x2="13" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Name, area, or city…"
          className="login-input w-full rounded-[10px] border border-white/[0.09] py-[11px] pl-[38px] pr-3 font-sans text-[13px] text-[var(--t)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(245,240,234,0.2)] focus:border-og/40 focus:shadow-[0_0_0_3px_rgba(212,133,58,0.08)]"
        />
      </div>

      <FilterGroup>
        <button
          type="button"
          onClick={toggleVerifiedOnly}
          className="flex w-full cursor-pointer items-center justify-between rounded-[10px] border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 transition-colors duration-200 hover:border-og/20"
        >
          <span className="flex items-center gap-2 text-[13px] text-[var(--tm)]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1.5L2.5 3.5v4c0 3 2 5 4.5 5s4.5-2 4.5-5v-4L7 1.5z" stroke="rgba(212,133,58,0.7)" strokeWidth="1.1" strokeLinejoin="round" />
              <path d="M5 7l1.5 1.5L9 6" stroke="rgba(212,133,58,0.7)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified Only
          </span>
          <span
            className={cn(
              'relative h-5 w-9 shrink-0 rounded-[10px] transition-colors duration-200',
              verifiedOnly ? 'bg-og' : 'bg-white/10'
            )}
          >
            <span
              className={cn(
                'absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-[left] duration-200',
                verifiedOnly ? 'left-[19px]' : 'left-[3px]'
              )}
            />
          </span>
        </button>
      </FilterGroup>

      <FilterDivider />

      <FilterGroup label="Availability">
        <PillGroup>
          {(['Both', 'Pro Bono', 'Paid'] as const).map((opt) => (
            <PillButton
              key={opt}
              active={availabilityFilter === opt}
              onClick={() => setAvailabilityFilter(opt)}
            >
              {opt}
            </PillButton>
          ))}
        </PillGroup>
      </FilterGroup>

      <FilterDivider />

      <FilterGroup label="Practice Area">
        <div className="flex flex-col gap-1">
          {LAWYER_SEARCH_PRACTICE_AREAS.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => togglePracticeArea(area)}
              className={cn(
                'flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] text-[var(--tm)] transition-colors duration-150 hover:bg-white/[0.04] hover:text-[var(--t)]',
                practiceAreas.includes(area) && 'text-[var(--t)]'
              )}
            >
              <span
                className={cn(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/[0.18] transition-all duration-150',
                  practiceAreas.includes(area) && 'border-og bg-og'
                )}
              >
                {practiceAreas.includes(area) && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5l2.2 2.2L8 3" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {area}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterDivider />

      <FilterGroup label="Min. Experience">
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={25}
            value={minExperience}
            onChange={(e) => setMinExperience(Number(e.target.value))}
            className="lawyer-exp-range mb-2 h-[3px] w-full cursor-pointer appearance-none rounded-sm bg-white/10 outline-none"
          />
          <div className="flex justify-between text-[10.5px] text-[var(--td)]">
            <span>Any</span>
            <span>{minExperience === 0 ? '0+ yrs' : `${minExperience}+ yrs`}</span>
            <span>25+ yrs</span>
          </div>
        </div>
      </FilterGroup>

      <FilterDivider />

      <FilterGroup label="Language">
        <PillGroup>
          {LAWYER_SEARCH_LANGUAGES.map((lang) => (
            <PillButton key={lang} active={languages.includes(lang)} onClick={() => toggleLanguage(lang)}>
              {lang}
            </PillButton>
          ))}
        </PillGroup>
      </FilterGroup>

      <FilterDivider />

      <FilterGroup label="Location">
        <PillGroup>
          {LAWYER_SEARCH_LOCATIONS.map((loc) => (
            <PillButton key={loc} active={locations.includes(loc)} onClick={() => toggleLocation(loc)}>
              {loc}
            </PillButton>
          ))}
        </PillGroup>
      </FilterGroup>
    </aside>
  )
}

function FilterGroup({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="mb-[22px]">
      {label && (
        <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[1px] text-[rgba(245,240,234,0.3)]">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

function FilterDivider() {
  return <div className="mb-[22px] h-px bg-white/[0.05]" />
}

function PillGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'cursor-pointer select-none rounded-full border border-white/10 bg-transparent px-3 py-[5px] font-sans text-[11px] text-[var(--tm)] transition-all duration-150 hover:border-og/30 hover:text-o2',
        active && 'border-og/40 bg-og/[0.13] text-o2'
      )}
    >
      {children}
    </button>
  )
}
