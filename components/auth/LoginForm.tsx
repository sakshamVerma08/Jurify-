// FILE: components/auth/LoginForm.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError } from '@/components/auth/FieldError'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/uiStore'
import { signinAction } from '@/actions/auth/signin'

interface Props {
  onLoginSuccess: (email: string, isVerified: boolean) => void
  onForgotPassword: () => void
}

const INPUT_BASE =
  'login-input w-full rounded-[11px] border py-[13px] font-sans text-sm text-[var(--t)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(245,240,234,0.2)]'

function enableField(event: React.FocusEvent<HTMLInputElement>) {
  event.currentTarget.removeAttribute('readonly')
}

export function LoginForm({ onLoginSuccess, onForgotPassword }: Props) {
  const showToast = useUiStore((s) => s.showToast)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginFormData) {
    setIsSubmitting(true)
    const result = await signinAction(data)
    setIsSubmitting(false)

    if (result.error) {
      if ('root' in result.error && result.error.root) {
        showToast(result.error.root[0], 'err')
      } else {
        showToast('Please check your input fields.', 'err')
      }
    } else if (result.success) {
      if (result.isVerified) {
        showToast('Welcome back!', 'ok')
      } else {
        showToast('Please verify your email. Code sent.', 'info')
      }
      onLoginSuccess(data.email, result.isVerified ?? false)
    }
  }

  function handleGoogleLogin() {
    showToast('Redirecting to Google…', 'info')
  }

  return (
    <div className="login-fade-up">
      <div className="login-fade-up mb-7 flex items-center justify-center gap-2.5" style={{ animationDelay: '0.1s' }}>
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border-[1.5px] border-[rgba(212,133,58,0.55)] bg-gradient-to-br from-[rgba(212,133,58,0.25)] to-[rgba(200,98,42,0.1)] shadow-[0_4px_16px_rgba(212,133,58,0.15)]">
          <JurifyLogoIcon size={20} />
        </div>
        <span className="font-serif text-2xl font-semibold tracking-[0.4px] text-[var(--t)]">Jurify</span>
      </div>

      <h1
        className="login-fade-up mb-1.5 text-center font-serif text-[32px] font-light leading-[1.1] tracking-[-0.5px] text-[var(--t)]"
        style={{ animationDelay: '0.18s' }}
      >
        Welcome <em className="italic text-o2">back</em>
      </h1>
      <p
        className="login-fade-up mb-7 text-center text-[13px] font-light leading-relaxed text-[var(--tm)]"
        style={{ animationDelay: '0.24s' }}
      >
        Sign in to your Jurify account to access your cases, network, and AI assistant.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-fade-up space-y-0"
        style={{ animationDelay: '0.28s' }}
        autoComplete="off"
        noValidate
      >
        {/* Honeypot — absorbs browser autofill without touching real fields */}
        <input
          type="text"
          name="prevent_autofill"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
        <input
          type="password"
          name="prevent_autofill_password"
          tabIndex={-1}
          autoComplete="new-password"
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />

        <div className="relative mb-4 flex flex-col gap-1.5">
          <label htmlFor="jurify-login-email" className="text-xs font-medium text-[rgba(245,240,234,0.5)]">
            Email Address
          </label>
          <div className="relative">
            <input
              id="jurify-login-email"
              type="email"
              autoComplete="off"
              placeholder="you@example.com"
              className={cn(
                INPUT_BASE,
                'pl-11 pr-4',
                errors.email ? 'border-[rgba(240,100,100,0.5)] shadow-[0_0_0_3px_rgba(240,100,100,0.08)]' : 'border-white/10',
                dirtyFields.email && !errors.email && touchedFields.email && 'border-[rgba(74,222,128,0.35)]'
              )}
              {...register('email')}
              readOnly
              onFocus={enableField}
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

        <div className="relative mb-4 flex flex-col gap-1.5">
          <label htmlFor="jurify-login-password" className="flex items-center justify-between text-xs font-medium text-[rgba(245,240,234,0.5)]">
            Password
            <button
              type="button"
              onClick={onForgotPassword}
              className="cursor-pointer border-none bg-transparent font-sans text-xs text-og transition-colors hover:text-o2 hover:underline"
            >
              Forgot password?
            </button>
          </label>
          <div className="relative">
            <input
              id="jurify-login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              className={cn(
                INPUT_BASE,
                'pl-11 pr-11',
                errors.password ? 'border-[rgba(240,100,100,0.5)] shadow-[0_0_0_3px_rgba(240,100,100,0.08)]' : 'border-white/10',
                dirtyFields.password && !errors.password && touchedFields.password && 'border-[rgba(74,222,128,0.35)]'
              )}
              {...register('password')}
              readOnly
              onFocus={enableField}
            />
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--t)] opacity-38"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center rounded-[5px] border-none bg-transparent p-1 text-[var(--td)] transition-colors hover:text-[var(--tm)]"
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 2l12 12M4.5 5.5C3.3 6.2 2.5 7 2 8c1.5 2.2 4 3.5 6 3.5a7 7 0 002.5-.5M8 4.5C10 4.5 12.5 5.8 14 8c-.4.6-.9 1.2-1.5 1.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <ellipse cx="8" cy="8" rx="6" ry="3.5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.1" />
                </svg>
              )}
            </button>
          </div>
          <FieldError message={errors.password?.message} show={!!errors.password} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gradient-primary relative mt-1.5 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[11px] border-none py-[15px] font-sans text-[14.5px] font-medium text-white shadow-[0_5px_22px_rgba(200,98,42,0.32)] transition-all duration-200 hover:-translate-y-px hover:opacity-93 hover:shadow-[0_10px_32px_rgba(200,98,42,0.42)] disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <span className="btn-spinner" />
              Signing in…
            </>
          ) : (
            <>
              Sign In
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M3 7.5h9M8.5 4l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>

        <div className="my-[22px] flex items-center gap-3 text-xs text-[rgba(245,240,234,0.22)]">
          <span className="h-px flex-1 bg-white/[0.07]" />
          or continue with
          <span className="h-px flex-1 bg-white/[0.07]" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full cursor-pointer items-center justify-center gap-[11px] rounded-[11px] border border-white/[0.12] bg-white/[0.05] py-[13px] font-sans text-[13.5px] font-normal text-[var(--t)] transition-all duration-200 hover:-translate-y-px hover:border-white/[0.22] hover:bg-white/[0.09]"
        >
          <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
            <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <p className="mt-[22px] text-center text-[13px] text-[rgba(245,240,234,0.35)]">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-og no-underline transition-colors hover:text-o2 hover:underline">
            Register now
          </Link>
        </p>
      </form>
    </div>
  )
}
