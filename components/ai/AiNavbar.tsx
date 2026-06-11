// FILE: components/ai/AiNavbar.tsx
// TYPE: Server Component

import Link from 'next/link'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'

export function AiNavbar() {
  return (
    <nav className="z-[100] flex h-[60px] shrink-0 items-center justify-between border-b border-white/[0.07] bg-[rgba(10,10,9,0.95)] px-7 backdrop-blur-[28px]">
      <Link href="/" className="flex items-center gap-[9px] no-underline">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border-[1.5px] border-og/50 bg-gradient-to-br from-og/25 to-o/10">
          <JurifyLogoIcon size={17} />
        </div>
        <span className="font-serif text-xl font-semibold tracking-wide text-[var(--t)]">Jurify</span>
      </Link>

      <div className="flex items-center gap-1.5 rounded-lg border border-og/20 bg-og/[0.08] px-3 py-[5px] text-xs font-medium text-o2 max-md:hidden">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
        AI Legal Assistant
        <span className="nav-ai-badge ml-0.5 rounded px-[5px] py-0.5 text-[9px] font-semibold uppercase tracking-[0.7px] text-black">
          RAG
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg px-3.5 py-[7px] text-[13px] text-[var(--td)] no-underline transition-all duration-150 hover:bg-white/[0.04] hover:text-[var(--tm)] max-sm:hidden"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path
              d="M2 6.5L6.5 2 11 6.5M3.5 5.5V11h2.5V8h1v3H9.5V5.5"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Home
        </Link>
        <Link
          href="/cases"
          className="rounded-lg px-3.5 py-[7px] text-[13px] text-[var(--td)] no-underline transition-all duration-150 hover:bg-white/[0.04] hover:text-[var(--tm)] max-sm:hidden"
        >
          Cases
        </Link>
        <Link
          href="/login"
          className="cursor-pointer rounded-lg border border-white/[0.09] bg-transparent px-4 py-[7px] font-sans text-[13px] text-[var(--tm)] no-underline transition-all duration-200 hover:bg-white/[0.05] hover:text-[var(--t)]"
        >
          Sign In
        </Link>
      </div>
    </nav>
  )
}
