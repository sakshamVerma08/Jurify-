// FILE: components/dashboard/CompactProgressTrack.tsx
// TYPE: Server Component

import { cn } from '@/lib/utils'
import type { DashboardProgressStep } from '@/types'

export function CompactProgressTrack({ steps }: { steps: DashboardProgressStep[] }) {
  return (
    <div className="my-2.5 flex w-full items-center">
      {steps.map((step, index) => (
        <div
          key={step.label}
          className={cn(
            'relative flex flex-1 flex-col items-center',
            step.status === 'done' &&
              'after:absolute after:top-3 after:right-[-50%] after:left-1/2 after:z-0 after:h-[1.5px] after:bg-og/40 after:content-[""]',
            step.status === 'active' &&
              'after:absolute after:top-3 after:right-[-50%] after:left-1/2 after:z-0 after:h-[1.5px] after:bg-gradient-to-r after:from-og/40 after:to-white/[0.07] after:content-[""]',
            index === steps.length - 1 && 'after:hidden'
          )}
        >
          <div
            className={cn(
              'relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/10 bg-white/[0.04] text-[9.5px] font-semibold text-[var(--td)] transition-all duration-300',
              step.status === 'done' && 'border-og bg-og text-white',
              step.status === 'active' &&
                'border-og bg-og/20 text-o2 shadow-[0_0_10px_rgba(212,133,58,0.35)]'
            )}
          >
            {step.status === 'done' ? (
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1.5 4l1.8 1.8L6.5 2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : step.status === 'active' ? (
              '●'
            ) : (
              index + 1
            )}
          </div>
          <span
            className={cn(
              'mt-[5px] max-w-[52px] text-center text-[9px] leading-snug text-[var(--td)]',
              (step.status === 'done' || step.status === 'active') &&
                'text-[rgba(245,240,234,0.45)]'
            )}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}
