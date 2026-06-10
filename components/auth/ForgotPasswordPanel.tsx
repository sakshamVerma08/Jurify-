// FILE: components/auth/ForgotPasswordPanel.tsx
// TYPE: Client Component

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError } from '@/components/auth/FieldError'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations/auth'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/uiStore'

interface Props {
  onBack: () => void
}

export function ForgotPasswordPanel({ onBack }: Props) {
  const showToast = useUiStore((s) => s.showToast)
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  })

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSent(true)
    showToast(`Reset link sent to ${data.email}`, 'ok')
  }

  return (
    <div className="login-panel-in">
      <div className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-[14px] border border-[rgba(212,133,58,0.25)] bg-[rgba(212,133,58,0.1)]">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="9" stroke="#D4853A" strokeWidth="1.4" />
          <path d="M8 9a3 3 0 115 2.83c-.55.32-2 1.17-2 2.17" stroke="#D4853A" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="11" cy="16.5" r="0.9" fill="#D4853A" />
        </svg>
      </div>

      <h2 className="mb-1 text-center text-[17px] font-semibold text-[var(--t)]">Reset your password</h2>
      <p className="mb-[22px] text-center text-[12.5px] font-light leading-relaxed text-[var(--tm)]">
        Enter your registered email address and we&apos;ll send you a link to reset your password.
      </p>

      {sent && (
        <div className="mb-4 rounded-[10px] border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.07)] p-4 text-center">
          <p className="text-[13px] leading-snug text-success">
            ✓ Reset link sent to your email. Check your inbox and spam folder.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <div className="relative mb-4 flex flex-col gap-1.5">
          <label htmlFor="jurify-reset-email" className="text-xs font-medium text-[rgba(245,240,234,0.5)]">
            Email Address
          </label>
          <div className="relative">
            <input
              id="jurify-reset-email"
              type="email"
              autoComplete="off"
              placeholder="you@example.com"
              className={cn(
                'login-input w-full rounded-[11px] border py-[13px] pl-11 pr-4 font-sans text-sm text-[var(--t)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(245,240,234,0.2)]',
                errors.email ? 'border-[rgba(240,100,100,0.5)]' : 'border-white/10'
              )}
              {...register('email')}
              readOnly
              onFocus={(e) => e.currentTarget.removeAttribute('readonly')}
            />
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--t)] opacity-38"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </div>
          <FieldError message={errors.email?.message} show={!!errors.email} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gradient-primary relative mt-1 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[11px] border-none py-[15px] font-sans text-[14.5px] font-medium text-white shadow-[0_5px_22px_rgba(200,98,42,0.32)] transition-all duration-200 hover:-translate-y-px hover:opacity-93 disabled:cursor-not-allowed disabled:opacity-35"
        >
          {isSubmitting ? (
            <>
              <span className="btn-spinner" />
              Sending…
            </>
          ) : (
            <>
              Send Reset Link
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="mt-3.5 flex w-full cursor-pointer items-center justify-center gap-1.5 border-none bg-transparent font-sans text-[12.5px] text-[rgba(245,240,234,0.3)] transition-colors hover:text-[var(--tm)]"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M9 6.5H4M6 4l-2.5 2.5L6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to sign in
      </button>
    </div>
  )
}
