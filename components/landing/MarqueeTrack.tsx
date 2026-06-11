// FILE: components/landing/MarqueeTrack.tsx
// TYPE: Client Component

'use client'

import { MARQUEE_ITEMS } from '@/lib/data/landing'

export function MarqueeTrack() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div
      className="mt-5 overflow-hidden border-y border-white/[0.06] bg-bg2 py-3.5"
      aria-label="Legal practice areas"
    >
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={`${item.id}-${index}`}
            className="flex items-center gap-3 text-xs font-medium uppercase tracking-[1.5px] text-[var(--td)]"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-o" />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
