// FILE: components/kyc/KycStepNav.tsx
// TYPE: Client Component

'use client'

import { cn } from '@/lib/utils'

interface KycStepNavProps {
  step: number
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  backDisabled?: boolean
  nextDisabled?: boolean
  hideNext?: boolean
}

export function KycStepNav({
  step,
  onBack,
  onNext,
  nextLabel = 'Continue',
  backDisabled,
  nextDisabled,
  hideNext,
}: KycStepNavProps) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-white/[0.06] pt-7">
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled ?? step === 1}
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.04] px-6 py-[13px] font-sans text-[13.5px] font-normal text-[var(--tm)] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-[var(--t)] disabled:cursor-not-allowed disabled:opacity-30'
        )}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M10 7H4M6 4l-3 3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>
      <span className="text-xs text-[var(--td)]">Step {step} of 4</span>
      {hideNext ? (
        <div className="w-[120px]" />
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="btn-gradient-nav flex cursor-pointer items-center gap-2 rounded-[10px] border-none px-8 py-3.5 font-sans text-sm font-medium text-white transition-all duration-200 hover:-translate-y-px hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
        >
          {nextLabel}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M4 7h6M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
