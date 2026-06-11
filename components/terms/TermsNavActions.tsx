// FILE: components/terms/TermsNavActions.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'

export function TermsNavActions() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/privacy"
        className="hidden text-xs text-[var(--td)] no-underline transition-colors hover:text-[var(--tm)] sm:block"
      >
        Privacy Policy
      </Link>
      <Link
        href="/cookies"
        className="hidden text-xs text-[var(--td)] no-underline transition-colors hover:text-[var(--tm)] sm:block"
      >
        Cookie Policy
      </Link>
      <button
        type="button"
        onClick={() => typeof window !== 'undefined' && window.print()}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-xs text-[var(--td)] transition-all hover:bg-white/[0.08] hover:text-[var(--tm)]"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <rect x="2" y="4.5" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
          <path d="M4 4.5V2h5v2.5M4 8h5M4 10h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
        Print / PDF
      </button>
      <Link
        href="/"
        className="flex items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.04] px-4 py-2 text-xs font-normal text-[var(--tm)] no-underline transition-all hover:bg-white/[0.08] hover:text-[var(--t)]"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M2 6.5L6.5 2 11 6.5M3.5 5.5V11h2.5V8h1v3H9.5V5.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </Link>
    </div>
  )
}
