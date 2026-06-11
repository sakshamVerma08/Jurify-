// FILE: components/kyc/KycSidebar.tsx
// TYPE: Client Component

'use client'

import { cn } from '@/lib/utils'
import { KYC_STEPS } from '@/lib/data/kyc'
import { useKycStore } from '@/stores/kycStore'

export function KycSidebar() {
  const currentStep = useKycStore((s) => s.currentStep)
  const setStep = useKycStore((s) => s.setStep)
  const progressPct = useKycStore((s) => s.getProgressPct())

  return (
    <aside className="sticky top-[68px] flex h-[calc(100vh-68px)] flex-col gap-0 overflow-y-auto border-r border-white/[0.06] bg-[rgba(10,10,9,0.3)] px-8 py-10 max-lg:hidden">
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
        Jurify · Lawyer KYC
      </p>
      <h2 className="mb-1.5 font-serif text-[30px] font-light leading-[1.1] tracking-[-0.5px] text-[var(--t)]">
        Get <em className="italic text-o2">Verified</em>
      </h2>
      <p className="mb-8 text-[13px] font-light leading-relaxed text-[var(--td)]">
        Complete your professional verification to start connecting with clients and pro bono opportunities.
      </p>

      <nav className="flex flex-1 flex-col">
        {KYC_STEPS.map((step) => {
          const isActive = currentStep === step.id
          const isDone = currentStep > step.id
          return (
            <button
              key={step.id}
              type="button"
              id={`kyc-nav-${step.id}`}
              onClick={() => setStep(step.id)}
              className={cn(
                'relative mb-0.5 flex cursor-pointer items-start gap-3.5 rounded-xl px-3.5 py-4 text-left transition-colors duration-200',
                isActive && 'border border-og/20 bg-og/[0.08]',
                !isActive && 'border border-transparent hover:bg-white/[0.03]',
                isDone && !isActive && 'opacity-75'
              )}
            >
              {step.id < KYC_STEPS.length && (
                <span
                  className={cn(
                    'absolute bottom-[-6px] left-[26px] top-[52px] w-px bg-white/[0.06]',
                    isDone && 'bg-og/30'
                  )}
                />
              )}
              <span
                className={cn(
                  'relative z-[1] flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/[0.12] bg-white/[0.06] text-[11px] font-semibold text-[var(--td)] transition-all duration-250',
                  isActive && 'border-og bg-og text-white shadow-[0_0_14px_rgba(212,133,58,0.4)]',
                  isDone && 'border-og/40 bg-og/15 text-og'
                )}
              >
                {isDone ? (
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                    <path d="M2 5.5l2.5 2.5L9 3" stroke="#D4853A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step.id
                )}
              </span>
              <div>
                <p className={cn('text-[12.5px] font-medium text-[var(--tm)]', isActive && 'text-[var(--t)]')}>
                  {step.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-[rgba(245,240,234,0.28)]">{step.description}</p>
              </div>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto border-t border-white/[0.05] pt-7">
        <div className="mb-2.5 flex items-center justify-between text-[11.5px] text-[var(--td)]">
          <span>Completion</span>
          <strong className="text-og">{progressPct}%</strong>
        </div>
        <div className="h-1 overflow-hidden rounded-sm bg-white/[0.07]">
          <div
            className="h-full rounded-sm bg-gradient-to-r from-og to-o2 transition-[width] duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="mt-4 flex items-center gap-2 text-[11.5px] text-[rgba(245,240,234,0.28)]">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1" />
            <line x1="6.5" y1="5" x2="6.5" y2="7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          Need help?{' '}
          <span className="ml-1 cursor-pointer text-o2">support@jurify.in</span>
        </p>
      </div>
    </aside>
  )
}
