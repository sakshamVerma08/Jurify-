// FILE: components/auth/RegisterProgress.tsx
// TYPE: Server Component

import type { RegisterStep } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  currentStep: RegisterStep
}

const STEPS = [
  { id: 1, label: 'Role' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Done' },
] as const

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path
        d="M2 5.5l2.5 2.5L9 3"
        stroke="#D4853A"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function RegisterProgress({ currentStep }: Props) {
  return (
    <div className="login-fade-up mb-7 flex w-full max-w-[260px] items-center gap-0" style={{ animationDelay: '0.06s' }}>
      {STEPS.map((step, index) => {
        const isActive = currentStep === step.id
        const isDone = currentStep > step.id

        return (
          <div
            key={step.id}
            className={cn(
              'relative flex flex-1 flex-col items-center gap-[5px]',
              index < STEPS.length - 1 &&
                "after:absolute after:left-1/2 after:top-3.5 after:z-0 after:h-[1.5px] after:w-full after:bg-white/[0.08] after:content-['']",
              isDone && 'after:bg-[rgba(212,133,58,0.4)]'
            )}
          >
            <div
              className={cn(
                'relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] text-[11px] font-semibold transition-all duration-350',
                isActive && 'border-og bg-og text-white shadow-[0_0_16px_rgba(212,133,58,0.45)]',
                isDone && 'border-[rgba(212,133,58,0.45)] bg-[rgba(212,133,58,0.18)] text-o2',
                !isActive && !isDone && 'border-white/[0.12] bg-white/[0.05] text-[var(--td)]'
              )}
            >
              {isDone ? <CheckIcon /> : step.id}
            </div>
            <span
              className={cn(
                'whitespace-nowrap text-[10px] font-normal',
                isActive && 'text-og',
                isDone && 'text-[rgba(245,240,234,0.35)]',
                !isActive && !isDone && 'text-[rgba(245,240,234,0.28)]'
              )}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
