// FILE: components/auth/RoleSelectionStep.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton'
import { ROLE_OPTIONS } from '@/lib/data/register'
import type { UserRole } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  selectedRole: UserRole | null
  onSelectRole: (role: UserRole) => void
  onContinue: () => void
  animationClass?: string
}

function RoleIcon({ icon }: { icon: string }) {
  if (icon === 'lawyer') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L15 9H21L16 13.5L18 20L12 16.5L6 20L8 13.5L3 9H9L12 2Z" stroke="#D4853A" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="#D4853A" strokeWidth="1.4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#D4853A" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function RoleSelectionStep({ selectedRole, onSelectRole, onContinue, animationClass }: Props) {
  return (
    <div className={animationClass}>
      <div className="mb-7">
        <div className="mb-2.5 text-[10px] font-medium uppercase tracking-[1.5px] text-og">
          Step 1 of 2 · Get Started
        </div>
        <h1 className="mb-1.5 font-serif text-[34px] font-light leading-[1.08] tracking-[-0.6px] text-[var(--t)]">
          Join <em className="italic text-o2">Jurify</em>
        </h1>
        <p className="text-[13px] font-light leading-relaxed text-[var(--tm)]">
          Choose how you&apos;ll use the platform. You can update this later in your settings.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {ROLE_OPTIONS.map((role) => {
          const isSelected = selectedRole === role.id
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelectRole(role.id)}
              aria-pressed={isSelected}
              className={cn(
                'relative cursor-pointer overflow-hidden rounded-2xl border-[1.5px] bg-white/[0.025] px-[18px] pb-5 pt-6 text-center transition-all duration-220 hover:-translate-y-0.5 hover:border-[rgba(212,133,58,0.35)] hover:bg-[rgba(212,133,58,0.04)]',
                isSelected
                  ? 'border-og bg-[rgba(212,133,58,0.07)] shadow-[0_0_0_1px_rgba(212,133,58,0.2),0_8px_32px_rgba(212,133,58,0.14)]'
                  : 'border-white/[0.09]'
              )}
            >
              <div
                className={cn(
                  'absolute right-2.5 top-2.5 flex h-5 w-5 scale-0 items-center justify-center rounded-full bg-og opacity-0 transition-all duration-220',
                  isSelected && 'scale-100 opacity-100'
                )}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 5l2.2 2.2L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-[14px] border border-[rgba(212,133,58,0.22)] bg-[rgba(212,133,58,0.1)] transition-all duration-220 group-hover:border-[rgba(212,133,58,0.45)]">
                <RoleIcon icon={role.icon} />
              </div>
              <div className="mb-1.5 text-[15px] font-semibold text-[var(--t)]">{role.title}</div>
              <div className="text-[11.5px] font-light leading-snug text-[var(--td)]">{role.description}</div>
              <div className="mt-2.5 flex flex-wrap justify-center gap-1">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[rgba(212,133,58,0.18)] bg-[rgba(212,133,58,0.1)] px-2 py-0.5 text-[9.5px] text-[rgba(212,133,58,0.75)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={!selectedRole}
        className="btn-gradient-primary relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[11px] border-none py-[15px] font-sans text-[14.5px] font-medium text-white shadow-[0_5px_22px_rgba(200,98,42,0.3)] transition-all duration-200 hover:-translate-y-px hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
      >
        Continue
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M3 7.5h9M8.5 4l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="my-[18px] flex items-center gap-3 text-xs text-[rgba(245,240,234,0.22)]">
        <span className="h-px flex-1 bg-white/[0.07]" />
        or sign up with
        <span className="h-px flex-1 bg-white/[0.07]" />
      </div>

      <GoogleAuthButton />

      <p className="mt-5 text-center text-[13px] text-[rgba(245,240,234,0.35)]">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-og no-underline transition-colors hover:text-o2 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
