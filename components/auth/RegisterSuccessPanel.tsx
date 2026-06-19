// FILE: components/auth/RegisterSuccessPanel.tsx
// TYPE: Client Component

'use client'

import { useRouter } from 'next/navigation'
import type { UserRole } from '@/types'

interface Props {
  role: UserRole
}

export function RegisterSuccessPanel({ role }: Props) {
  const router = useRouter()

  const note =
    role === 'lawyer'
      ? 'Complete your KYC to get your Verified badge and start taking pro bono cases.'
      : 'Post your first case or try the free AI legal assistant — no fees, no sign-up needed.'

  function handleCta() {
    if (role === 'lawyer') {
      router.push('/kyc')
    } else {
      router.push('/cases')
    }
  }

  return (
    <div className="login-fade-up px-0 py-1 text-center">
      <div className="register-success-glow mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-[rgba(212,133,58,0.35)] bg-[rgba(212,133,58,0.1)]">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M6 16l6 6 14-14" stroke="#D4853A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className="mb-2 font-serif text-[34px] font-light tracking-[-0.5px] text-[var(--t)]">
        You&apos;re <em className="italic text-o2">in!</em>
      </h2>
      <p className="mx-auto mb-[22px] max-w-[340px] text-[13.5px] font-light leading-relaxed text-[var(--tm)]">
        Your Jurify account has been created. {note}
      </p>

      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(74,222,128,0.22)] bg-[rgba(74,222,128,0.08)] px-4 py-[7px] text-[12.5px] text-success">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="5.2" stroke="#4ade80" strokeWidth="1.1" />
          <path d="M4 6.5l2 2 3-3" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Account created successfully
      </div>

      <button
        type="button"
        onClick={handleCta}
        className="btn-gradient-primary inline-flex cursor-pointer items-center gap-2 rounded-[10px] border-none px-8 py-3.5 font-sans text-sm font-medium text-white shadow-[0_5px_20px_rgba(200,98,42,0.3)] transition-all duration-200 hover:-translate-y-px hover:opacity-92"
      >
        {role === 'lawyer' ? (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1l1.5 4H13L9.5 7.5 11 12 7 9.5 3 12l1.5-4.5L1 5h4.5L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            Complete KYC Verification
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Post / View Cases
          </>
        )}
      </button>
    </div>
  )
}
