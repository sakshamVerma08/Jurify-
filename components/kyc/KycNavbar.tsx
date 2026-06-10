// FILE: components/kyc/KycNavbar.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'
import { useUiStore } from '@/stores/uiStore'

export function KycNavbar() {
  const showToast = useUiStore((s) => s.showToast)

  return (
    <nav className="fixed left-0 right-0 top-0 z-[200] flex h-[68px] items-center justify-between border-b border-white/[0.07] bg-[rgba(10,10,9,0.92)] px-8 backdrop-blur-[28px] max-md:px-4">
      <Link href="/" className="flex shrink-0 items-center gap-2.5 no-underline">
        <div className="flex h-9 w-9 items-center justify-center rounded-[9px] border-[1.5px] border-og/50 bg-gradient-to-br from-og/25 to-o/10">
          <JurifyLogoIcon />
        </div>
        <span className="font-serif text-[22px] font-semibold tracking-wide text-[var(--t)]">Jurify</span>
      </Link>
      <span className="rounded-full border border-white/[0.09] bg-white/[0.06] px-3 py-1 text-[10px] font-medium tracking-wide text-[rgba(245,240,234,0.4)] max-sm:hidden">
        Lawyer Verification
      </span>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => showToast('Progress auto-saved', 'info')}
          className="cursor-pointer rounded-lg border-none bg-transparent px-4 py-2 font-sans text-[13px] text-[var(--tm)] transition-all duration-200 hover:bg-white/[0.05] hover:text-[var(--t)] max-sm:hidden"
        >
          Save &amp; exit
        </button>
        <button
          type="button"
          onClick={() => showToast('Draft saved successfully', 'ok')}
          className="flex cursor-pointer items-center gap-[7px] rounded-[9px] border border-white/10 bg-white/[0.06] px-[18px] py-[9px] font-sans text-[13px] font-medium text-[var(--tm)] transition-all duration-200 hover:bg-white/10 hover:text-[var(--t)]"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M2 10V4l2-2h5l2 2v6H2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            <rect x="4" y="6.5" width="5" height="3.5" rx="0.8" stroke="currentColor" strokeWidth="1" />
          </svg>
          Save Draft
        </button>
      </div>
    </nav>
  )
}
