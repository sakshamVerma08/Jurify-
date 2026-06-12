// FILE: components/auth/RegisterDetailsForm.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError } from '@/components/auth/FieldError'
import { BAR_COUNCIL_STATES, PHONE_COUNTRY_CODES } from '@/lib/data/register'
import {
  registerSchema,
  getPasswordStrength,
  type RegisterFormData,
} from '@/lib/validations/auth'
import type { UserRole } from '@/types'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/uiStore'
import { signupAction } from '@/actions/auth/signup'
import { authClient } from '@/lib/auth/auth-client'

interface Props {
  role: UserRole
  onBack: () => void
  onSuccess: (email: string) => void
  animationClass?: string
}

const INPUT_ICON =
  'login-input w-full rounded-[10px] border py-3 pl-11 pr-4 font-sans text-[13.5px] text-[var(--t)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(245,240,234,0.2)]'

function enableField(event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  event.currentTarget.removeAttribute('readonly')
}

export function RegisterDetailsForm({ role, onBack, onSuccess, animationClass }: Props) {
  const showToast = useUiStore((s) => s.showToast)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const schema = useMemo(() => registerSchema(), [])

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      role: role === 'lawyer' ? 'LAWYER' : 'CLIENT',
      firstName: '',
      lastName: '',
      email: '',
      phoneCode: '+91',
      phone: '',
      barCouncilState: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const passwordValue = watch('password')
  const strength = getPasswordStrength(passwordValue ?? '')

  async function onSubmit(data: RegisterFormData) {
    setIsSubmitting(true)
    
    const result = await signupAction(data)
    
    if (result.error) {
      setIsSubmitting(false)
      const errorMessage = (result.error as any).root?.[0] || 'Account creation failed'
      showToast(errorMessage, 'err')
      return
    }

    // Explicitly sign in from the client to ensure the session cookie is correctly set in the browser
    const { error: signInError } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    })

    setIsSubmitting(false)

    if (signInError) {
      showToast('Account created but login failed. Please sign in.', 'err')
      return
    }

    showToast('OTP sent to your email!', 'info')
    onSuccess(data.email)
  }

  function onInvalid() {
    showToast('Please fix the errors above', 'err')
  }

  const roleLabel = role === 'lawyer' ? 'Registering as Lawyer' : 'Registering as Client'

  return (
    <div className={animationClass}>
      <div className="mb-7">
        <div className="mb-2.5 text-[10px] font-medium uppercase tracking-[1.5px] text-og">
          Step 2 of 3 · Account Details
        </div>
        <h1 className="mb-1.5 font-serif text-[34px] font-light leading-[1.08] tracking-[-0.6px] text-[var(--t)]">
          Create your <em className="italic text-o2">account</em>
        </h1>
        <p className="text-[13px] font-light leading-relaxed text-[var(--tm)]">
          Fill in your details below. This only takes a minute.
        </p>
      </div>

      <div className="mb-5 inline-flex items-center gap-[7px] rounded-full border border-[rgba(212,133,58,0.2)] bg-[rgba(212,133,58,0.08)] py-1.5 pl-2 pr-3.5 text-[11.5px] text-o2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-og" />
        {roleLabel}
      </div>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} autoComplete="off" noValidate>
        <input type="text" name="prevent_autofill" tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute h-0 w-0 opacity-0" />

        <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="jurify-first-name" className="text-xs font-medium text-[var(--tm)]">
              First Name <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <input
                id="jurify-first-name"
                type="text"
                autoComplete="off"
                placeholder="Arjun"
                className={cn(INPUT_ICON, errors.firstName ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]', dirtyFields.firstName && !errors.firstName && touchedFields.firstName && 'border-[rgba(74,222,128,0.32)]')}
                {...register('firstName')}
                readOnly
                onFocus={enableField}
              />
              <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-35" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.1" />
                <path d="M1.5 13.5c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </div>
            <FieldError message={errors.firstName?.message} show={!!errors.firstName} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="jurify-last-name" className="text-xs font-medium text-[var(--tm)]">
              Last Name <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <input
                id="jurify-last-name"
                type="text"
                autoComplete="off"
                placeholder="Sharma"
                className={cn(INPUT_ICON, errors.lastName ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]', dirtyFields.lastName && !errors.lastName && touchedFields.lastName && 'border-[rgba(74,222,128,0.32)]')}
                {...register('lastName')}
                readOnly
                onFocus={enableField}
              />
              <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-35" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.1" />
                <path d="M1.5 13.5c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </div>
            <FieldError message={errors.lastName?.message} show={!!errors.lastName} />
          </div>
        </div>

        <div className="mb-3.5 flex flex-col gap-1.5">
          <label htmlFor="jurify-register-email" className="text-xs font-medium text-[var(--tm)]">
            Email Address <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <input
              id="jurify-register-email"
              type="email"
              autoComplete="off"
              placeholder="you@example.com"
              className={cn(INPUT_ICON, errors.email ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]', dirtyFields.email && !errors.email && touchedFields.email && 'border-[rgba(74,222,128,0.32)]')}
              {...register('email')}
              readOnly
              onFocus={enableField}
            />
            <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-35" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <rect x="1.5" y="3.5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M1.5 5l6 4 6-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
          <FieldError message={errors.email?.message} show={!!errors.email} />
        </div>

        <div className="mb-3.5 flex flex-col gap-1.5">
          <label htmlFor="jurify-phone" className="text-xs font-medium text-[var(--tm)]">
            Phone Number <span className="text-danger">*</span>
          </label>
          <div className="flex gap-2">
            <select
              className="login-input w-[90px] shrink-0 cursor-pointer rounded-[10px] border border-white/[0.09] bg-white/[0.04] px-2.5 py-3 font-sans text-[13.5px] text-[var(--tm)] outline-none transition-[border-color] duration-200 focus:border-[rgba(212,133,58,0.45)] focus:text-[var(--t)] [&_option]:bg-bg3 [&_option]:text-[var(--t)]"
              {...register('phoneCode')}
            >
              {PHONE_COUNTRY_CODES.map((code) => (
                <option key={code.id} value={code.value}>
                  {code.label}
                </option>
              ))}
            </select>
            <input
              id="jurify-phone"
              type="tel"
              autoComplete="off"
              placeholder="98765 43210"
              className={cn('login-input flex-1 rounded-[10px] border px-3.5 py-3 font-sans text-[13.5px] text-[var(--t)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(245,240,234,0.2)]', errors.phone ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('phone')}
              readOnly
              onFocus={enableField}
            />
          </div>
          <FieldError message={errors.phone?.message} show={!!errors.phone} />
        </div>

        {role === 'lawyer' && (
          <div className="mb-3.5 flex flex-col gap-1.5">
            <label htmlFor="jurify-bar-state" className="text-xs font-medium text-[var(--tm)]">
              Bar Council State <span className="text-danger">*</span>
            </label>
            <select
              id="jurify-bar-state"
              className={cn(
                'login-input w-full cursor-pointer rounded-[10px] border bg-white/[0.04] px-3.5 py-3 font-sans text-[13.5px] outline-none transition-[border-color,box-shadow] duration-200 [&_option]:bg-bg3 [&_option]:text-[var(--t)]',
                errors.barCouncilState ? 'border-[rgba(240,100,100,0.45)] text-[var(--t)]' : 'border-white/[0.09] text-[var(--tm)]',
                dirtyFields.barCouncilState && !errors.barCouncilState && 'border-[rgba(74,222,128,0.32)] text-[var(--t)]'
              )}
              {...register('barCouncilState')}
            >
              <option value="">Select your Bar Council state</option>
              {BAR_COUNCIL_STATES.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <FieldError message={errors.barCouncilState?.message} show={!!errors.barCouncilState} />
          </div>
        )}

        <div className="mb-3.5 flex flex-col gap-1.5">
          <label htmlFor="jurify-register-password" className="text-xs font-medium text-[var(--tm)]">
            Password <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <input
              id="jurify-register-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              className={cn(INPUT_ICON, 'pr-11', errors.password ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('password')}
              readOnly
              onFocus={enableField}
            />
            <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-35" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <rect x="2.5" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M4.5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            <button type="button" tabIndex={-1} onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center border-none bg-transparent p-1 text-[var(--td)] hover:text-[var(--tm)]">
              {showPassword ? (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M2 2l11 11M4.5 5.5C3.3 6.2 2.5 7 2 7.5c1.4 2 4 3.5 5.5 3.5a6.5 6.5 0 002.3-.4M8 4.5c1.8.2 3.7 1.4 5 3-.4.6-.9 1.2-1.5 1.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><ellipse cx="7.5" cy="7.5" rx="5.5" ry="3.5" stroke="currentColor" strokeWidth="1.2" /><circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.1" /></svg>
              )}
            </button>
          </div>
          <div className="mt-1.5 h-[3px] overflow-hidden rounded-sm bg-white/[0.07]">
            <div className="h-full rounded-sm transition-all duration-400" style={{ width: strength.width, backgroundColor: strength.color }} />
          </div>
          {strength.label && (
            <p className="mt-0.5 h-3.5 text-[10.5px] transition-colors duration-300" style={{ color: strength.color }}>
              {strength.label}
            </p>
          )}
          <FieldError message={errors.password?.message} show={!!errors.password} />
        </div>

        <div className="mb-4 flex flex-col gap-1.5">
          <label htmlFor="jurify-confirm-password" className="text-xs font-medium text-[var(--tm)]">
            Confirm Password <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <input
              id="jurify-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              className={cn(INPUT_ICON, 'pr-11', errors.confirmPassword ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('confirmPassword')}
              readOnly
              onFocus={enableField}
            />
            <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-35" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <rect x="2.5" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M4.5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            <button type="button" tabIndex={-1} onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label={showConfirmPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center border-none bg-transparent p-1 text-[var(--td)] hover:text-[var(--tm)]">
              {showConfirmPassword ? (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M2 2l11 11M4.5 5.5C3.3 6.2 2.5 7 2 7.5c1.4 2 4 3.5 5.5 3.5a6.5 6.5 0 002.3-.4M8 4.5c1.8.2 3.7 1.4 5 3-.4.6-.9 1.2-1.5 1.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><ellipse cx="7.5" cy="7.5" rx="5.5" ry="3.5" stroke="currentColor" strokeWidth="1.2" /><circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.1" /></svg>
              )}
            </button>
          </div>
          <FieldError message={errors.confirmPassword?.message} show={!!errors.confirmPassword} />
        </div>

        <Controller
          name="acceptTerms"
          control={control}
          render={({ field }) => (
            <label
              className={cn(
                'mb-4 flex cursor-pointer items-start gap-[11px] rounded-[10px] border bg-white/[0.025] px-3.5 py-3 transition-colors duration-200 hover:border-[rgba(212,133,58,0.22)]',
                field.value ? 'border-[rgba(212,133,58,0.22)]' : 'border-white/[0.07]',
                errors.acceptTerms && 'border-[rgba(240,100,100,0.4)]'
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <span
                className={cn(
                  'mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] transition-all duration-200',
                  field.value ? 'border-og bg-og' : 'border-white/[0.18] bg-transparent'
                )}
              >
                {field.value && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5l2.2 2.2L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-xs leading-relaxed text-[var(--tm)]">
                I agree to Jurify&apos;s{' '}
                <Link href="/terms" className="font-medium text-og no-underline hover:text-o2 hover:underline" onClick={(e) => e.stopPropagation()}>
                  Terms of Service
                </Link>
                ,{' '}
                <Link href="#" className="font-medium text-og no-underline hover:text-o2 hover:underline" onClick={(e) => e.stopPropagation()}>
                  Privacy Policy
                </Link>
                , and{' '}
                <Link href="#" className="font-medium text-og no-underline hover:text-o2 hover:underline" onClick={(e) => e.stopPropagation()}>
                  Community Guidelines
                </Link>
                . I confirm I am at least 18 years of age.
              </span>
            </label>
          )}
        />
        <FieldError message={errors.acceptTerms?.message} show={!!errors.acceptTerms} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gradient-primary relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[11px] border-none py-[15px] font-sans text-[14.5px] font-medium text-white shadow-[0_5px_22px_rgba(200,98,42,0.3)] transition-all duration-200 hover:-translate-y-px hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-35"
        >
          {isSubmitting ? (
            <>
              <span className="btn-spinner" />
              Creating account…
            </>
          ) : (
            <>
              Create Account
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M3 7.5h9M8.5 4l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex cursor-pointer items-center gap-[7px] rounded-[10px] border border-white/[0.09] bg-white/[0.04] px-5 py-[11px] font-sans text-[13px] text-[var(--tm)] transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.08] hover:text-[var(--t)]"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M9 6.5H4M6 4l-2.5 2.5L6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        </div>

        <p className="mt-3 text-center text-[13px] text-[rgba(245,240,234,0.35)]">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-og no-underline transition-colors hover:text-o2 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
