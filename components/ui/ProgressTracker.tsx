// FILE: components/ui/ProgressTracker.tsx
// TYPE: Server Component

import { cn } from '@/lib/utils'
import { PROGRESS_STEPS } from '@/types'

interface ProgressTrackerProps {
  currentStep: number
  label?: string
}

export function ProgressTracker({ currentStep, label = 'Case Progress' }: ProgressTrackerProps) {
  return (
    <div>
      <p className="mb-3.5 text-[10.5px] font-medium uppercase tracking-[1px] text-[rgba(245,240,234,0.3)]">
        {label}
      </p>
      <div className="flex w-full items-center">
        {PROGRESS_STEPS.map((step, index) => {
          const isDone = index < currentStep
          const isActive = index === currentStep
          return (
            <div
              key={step}
              className={cn(
                'relative flex flex-1 flex-col items-center gap-[7px]',
                isDone && 'pt-step-done',
                isActive && 'pt-step-active',
                index > 0 &&
                  'before:absolute before:top-3.5 before:right-1/2 before:left-[-50%] before:z-0 before:h-0.5 before:bg-white/[0.08] before:content-[""]'
              )}
            >
              <div
                className={cn(
                  'relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white/10 bg-white/[0.05] text-[10px] text-[var(--td)] transition-all duration-250',
                  isDone && 'border-og bg-og text-white',
                  isActive &&
                    'border-og bg-og/20 text-o2 shadow-[0_0_12px_rgba(212,133,58,0.35)]'
                )}
              >
                {isDone ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  'max-w-[70px] text-center text-[10px] leading-snug text-[var(--td)]',
                  (isDone || isActive) && 'text-[rgba(245,240,234,0.5)]',
                  isActive && 'text-o2'
                )}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
