// FILE: components/kyc/KycTagSelect.tsx
// TYPE: Client Component

'use client'

import { cn } from '@/lib/utils'

interface KycTagSelectProps {
  options: readonly string[]
  selected: string[]
  onChange: (selected: string[]) => void
  hint?: string
  minHint?: string
}

export function KycTagSelect({ options, selected, onChange, hint, minHint }: KycTagSelectProps) {
  function toggle(tag: string) {
    const next = selected.includes(tag)
      ? selected.filter((t) => t !== tag)
      : [...selected, tag]
    onChange(next)
  }

  const displayHint =
    hint ??
    (selected.length > 0
      ? `${selected.length} area${selected.length > 1 ? 's' : ''} selected`
      : minHint ?? 'Select at least 1')

  return (
    <div>
      <div className="mt-0.5 flex flex-wrap gap-2">
        {options.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={cn(
              'cursor-pointer select-none rounded-full border border-white/10 bg-transparent px-3.5 py-1.5 font-sans text-xs text-[var(--tm)] transition-all duration-150 hover:border-og/30 hover:text-[var(--t)]',
              selected.includes(tag) && 'border-og/40 bg-og/15 text-o2'
            )}
          >
            {selected.includes(tag) ? `✓ ${tag}` : tag}
          </button>
        ))}
      </div>
      <p className="mt-2.5 text-[11px] text-[rgba(245,240,234,0.25)]">{displayHint}</p>
    </div>
  )
}
