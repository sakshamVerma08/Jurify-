// FILE: components/landing/HeroCTAs.tsx
// TYPE: Server Component

import Link from 'next/link'

export function HeroCTAs() {
  return (
    <div className="mb-9 flex flex-wrap gap-3.5">
      <Link
        href="/register"
        aria-label="Start your legal journey"
        className="btn-gradient-primary relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-[15px] font-sans text-[14.5px] font-medium text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:opacity-93"
      >
        <span className="text-sm">✦</span>
        Start Your Legal Journey
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path
            d="M3 7.5h9M8.5 4l4 3.5-4 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <Link
        href="/cases"
        aria-label="Explore pro bono cases"
        className="inline-flex items-center gap-2 rounded-xl border border-white/[0.14] bg-white/5 px-7 py-[15px] font-sans text-[14.5px] font-normal text-[var(--t)] no-underline transition-all duration-200 hover:border-white/[0.24] hover:bg-white/[0.09]"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="5" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1" />
          <line x1="5" y1="7.5" x2="9" y2="7.5" stroke="currentColor" strokeWidth="1" />
        </svg>
        Explore Pro Bono Cases
      </Link>
    </div>
  )
}
