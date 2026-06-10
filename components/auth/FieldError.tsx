// FILE: components/auth/FieldError.tsx
// TYPE: Server Component

import { cn } from '@/lib/utils'

interface Props {
  message?: string
  show?: boolean
}

export function FieldError({ message, show }: Props) {
  return (
    <div
      className={cn(
        '-mt-0.5 flex max-h-0 items-center gap-[5px] overflow-hidden text-[11.5px] text-danger opacity-0 transition-all duration-200',
        show && message && 'max-h-[30px] opacity-100'
      )}
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1" />
        <line x1="5.5" y1="3.5" x2="5.5" y2="6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="5.5" cy="7.5" r="0.55" fill="currentColor" />
      </svg>
      <span>{message}</span>
    </div>
  )
}
