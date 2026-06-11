// FILE: components/layout/NavMobileMenu.tsx
// TYPE: Server Component

import { NavAuthButtons } from '@/components/layout/NavAuthButtons'
import { NavLinks } from '@/components/layout/NavLinks'

export function NavMobileMenu() {
  return (
    <details className="group relative lg:hidden">
      <summary
        aria-label="Open menu"
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-white/10 text-[var(--t)] transition-colors hover:bg-white/5 [&::-webkit-details-marker]:hidden"
      >
        <svg
          className="group-open:hidden"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <line x1="3" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg
          className="hidden group-open:block"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <line x1="4" y1="4" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="4" x2="4" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>

      <div className="nav-blur fixed inset-x-0 top-[68px] z-[199] border-b border-white/[0.07]">
        <div className="flex flex-col gap-4 px-6 py-6">
          <NavLinks className="flex-col items-start gap-1" />
          <NavAuthButtons className="w-full flex-col [&_a]:w-full [&_a]:justify-center" />
        </div>
      </div>
    </details>
  )
}
