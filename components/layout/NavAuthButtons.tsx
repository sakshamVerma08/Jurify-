// FILE: components/layout/NavAuthButtons.tsx
// TYPE: Server Component

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export function NavAuthButtons({ className }: Props) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Link
        href="/login"
        aria-label="Log in to Jurify"
        className="inline-flex items-center justify-center rounded-lg px-[18px] py-2 font-sans text-[13.5px] font-normal text-[var(--tm)] no-underline transition-all duration-200 hover:bg-white/5 hover:text-[var(--t)]"
      >
        Login
      </Link>
      <Link
        href="/register"
        aria-label="Sign up for Jurify"
        className="btn-gradient-nav inline-flex items-center gap-2 rounded-[10px] px-[22px] py-2.5 font-sans text-[13.5px] font-medium text-white no-underline transition-all duration-200 hover:-translate-y-px hover:opacity-92"
      >
        Sign Up
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  )
}
