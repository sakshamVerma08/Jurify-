// FILE: components/cases/FilterPanel.tsx
// TYPE: Client Component

'use client'

import { cn } from '@/lib/utils'
import { useCasesStore } from '@/stores/casesStore'
import { CASE_CATEGORIES, CASE_STAGES_FILTER } from '@/types'

const URGENCY_OPTIONS = [
  { id: 'high' as const, label: 'High', urgent: true },
  { id: 'medium' as const, label: 'Medium', urgent: false },
  { id: 'low' as const, label: 'Low', urgent: false },
]

const POSTED_OPTIONS = [
  { id: 'any' as const, label: 'Any time' },
  { id: '24h' as const, label: 'Last 24 hours' },
  { id: '7d' as const, label: 'Last 7 days' },
  { id: '30d' as const, label: 'Last 30 days' },
]

export function FilterPanel() {
  const filters = useCasesStore((s) => s.filters)
  const toggleCategory = useCasesStore((s) => s.toggleCategory)
  const toggleUrgency = useCasesStore((s) => s.toggleUrgency)
  const toggleStage = useCasesStore((s) => s.toggleStage)
  const setLocation = useCasesStore((s) => s.setLocation)
  const setPostedWithin = useCasesStore((s) => s.setPostedWithin)
  const resetFilters = useCasesStore((s) => s.resetFilters)

  return (
    <div className="px-5 pb-5 pt-3.5">
      <FilterGroup label="Category">
        <div className="flex flex-col gap-1.5">
          {CASE_CATEGORIES.map((cat) => (
            <FilterOption
              key={cat}
              label={cat}
              checked={filters.categories.includes(cat)}
              onToggle={() => toggleCategory(cat)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Urgency">
        <div className="flex flex-wrap gap-1.5">
          {URGENCY_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggleUrgency(opt.id)}
              className={cn(
                'cursor-pointer rounded-full border border-white/10 bg-transparent px-3 py-[5px] font-sans text-[11px] text-[var(--tm)] transition-all duration-150 hover:border-og/40 hover:bg-og/15 hover:text-o2',
                filters.urgencies.includes(opt.id) &&
                  'border-og/40 bg-og/15 text-o2',
                opt.urgent &&
                  'border-[rgba(220,60,60,0.3)] text-[rgba(240,100,100,0.8)]',
                opt.urgent &&
                  filters.urgencies.includes(opt.id) &&
                  'border-[rgba(220,60,60,0.5)] bg-[rgba(220,60,60,0.15)] text-danger'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Location">
        <input
          type="text"
          placeholder="City or state..."
          value={filters.location}
          onChange={(e) => setLocation(e.target.value)}
          className="login-input w-full rounded-[9px] border border-white/[0.08] px-3 py-[9px] text-[13px] text-[var(--t)] outline-none transition-colors focus:border-og/35"
        />
      </FilterGroup>

      <FilterGroup label="Posted Within">
        <div className="flex flex-col gap-1.5">
          {POSTED_OPTIONS.map((opt) => (
            <FilterOption
              key={opt.id}
              label={opt.label}
              checked={filters.postedWithin === opt.id}
              onToggle={() => setPostedWithin(opt.id)}
              radio
            />
          ))}
        </div>
      </FilterGroup>

      <div className="my-1.5 mb-5 h-px bg-white/[0.05]" />

      <FilterGroup label="Pro Bono">
        <label
          className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-[13px] text-[var(--tm)] transition-all duration-150 hover:bg-white/[0.04] hover:text-[var(--t)]"
          onClick={(e) => {
            e.preventDefault()
            useCasesStore.getState().setProBonoOnly(!filters.proBonoOnly)
          }}
        >
          <span>Pro Bono Cases Only</span>
          <div
            className={cn(
              'flex h-[18px] w-[32px] shrink-0 items-center rounded-full p-[2px] transition-colors duration-200 ease-in-out',
              filters.proBonoOnly ? 'bg-success' : 'bg-white/10'
            )}
          >
            <div
              className={cn(
                'h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out',
                filters.proBonoOnly ? 'translate-x-[14px]' : 'translate-x-0'
              )}
            />
          </div>
        </label>
      </FilterGroup>

      <div className="my-1.5 mb-5 h-px bg-white/[0.05]" />

      <FilterGroup label="Case Stage">
        <div className="flex flex-col gap-1.5">
          {CASE_STAGES_FILTER.map((stage) => (
            <FilterOption
              key={stage.id}
              label={stage.label}
              checked={filters.stages.includes(stage.id)}
              onToggle={() => toggleStage(stage.id)}
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-[22px]">
      <p className="mb-2.5 text-[10.5px] font-medium uppercase tracking-[1px] text-[rgba(245,240,234,0.35)]">
        {label}
      </p>
      {children}
    </div>
  )
}

function FilterOption({
  label,
  checked,
  onToggle,
  radio,
}: {
  label: string
  checked: boolean
  onToggle: () => void
  radio?: boolean
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-[var(--tm)] transition-all duration-150 hover:bg-white/[0.04] hover:text-[var(--t)]',
        checked && 'text-[var(--t)]'
      )}
      onClick={(e) => {
        e.preventDefault()
        onToggle()
      }}
    >
      <span
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/[0.18] transition-all duration-150',
          checked && 'border-og bg-og',
          radio && 'rounded-full'
        )}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            {radio ? (
              <circle cx="5" cy="5" r="3" fill="white" />
            ) : (
              <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            )}
          </svg>
        )}
      </span>
      {label}
    </label>
  )
}
