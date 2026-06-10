// FILE: components/landing/CTAButtons.tsx
// TYPE: Client Component

'use client'

import { useRouter } from 'next/navigation'

export function CTAButtons() {
  const router = useRouter()

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => router.push('/register')}
        aria-label="Join as a lawyer"
        className="btn-gradient-primary inline-flex cursor-pointer items-center gap-2 rounded-xl px-7 py-[15px] font-sans text-[14.5px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-93"
      >
        Join as a Lawyer
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => router.push('/ai-assistant')}
        aria-label="Try AI assistant free"
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/[0.14] bg-white/5 px-7 py-[15px] font-sans text-[14.5px] font-normal text-[var(--t)] transition-all duration-200 hover:border-white/[0.24] hover:bg-white/[0.09]"
      >
        Try AI Assistant Free
      </button>
    </div>
  )
}
