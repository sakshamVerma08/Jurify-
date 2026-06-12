// FILE: components/auth/OTPPanel.tsx
// TYPE: Client Component

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DEMO_OTP_CODE, RESEND_OTP_SECONDS } from '@/lib/data/auth'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'

interface Props {
  email: string
  onBack: () => void
  onSuccess?: () => void
}

export function OTPPanel({ email, onBack, onSuccess }: Props) {
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)
  const showToast = useUiStore((s) => s.showToast)
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', ''])
  const [error, setError] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(RESEND_OTP_SECONDS)
  const [canResend, setCanResend] = useState(false)
  const [timerKey, setTimerKey] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const isComplete = digits.every((d) => d !== '')

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    setCanResend(false)
    setResendSeconds(RESEND_OTP_SECONDS)
    const interval = setInterval(() => {
      setResendSeconds((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timerKey])

  const resetDigits = useCallback(() => {
    setDigits(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
  }, [])

  function handleDigitChange(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    setError(false)
    if (digit && index < 5) inputRefs.current[index + 1]?.focus()
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const next = [...digits]
      next[index - 1] = ''
      setDigits(next)
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus()
    if (e.key === 'ArrowRight' && index < 5) inputRefs.current[index + 1]?.focus()
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const next = [...digits]
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setDigits(next)
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  async function handleVerify() {
    const code = digits.join('')
    if (code.length !== 6) return

    setIsVerifying(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    if (code === DEMO_OTP_CODE) {
      setVerified(true)
      
      if (onSuccess) {
        showToast('Email verified successfully!', 'ok')
        setTimeout(() => onSuccess(), 800)
      } else {
        showToast('Welcome to Jurify!', 'ok')
        setUser({
          id: 'user-demo',
          name: email.split('@')[0] ?? 'Advocate',
          role: 'lawyer',
        })
        setTimeout(() => router.push('/dashboard'), 1500)
      }
    } else {
      setError(true)
      setIsVerifying(false)
      resetDigits()
    }
  }

  function handleResend() {
    showToast('New code sent!', 'info')
    setTimerKey((k) => k + 1)
    resetDigits()
  }

  return (
    <div className="login-panel-in">
      <div className="mx-auto mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border-[1.5px] border-[rgba(212,133,58,0.28)] bg-[rgba(212,133,58,0.12)] shadow-[0_0_24px_rgba(212,133,58,0.12)]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="11" width="18" height="12" rx="2" stroke="#D4853A" strokeWidth="1.4" />
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="#D4853A" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="12" cy="17" r="1.5" fill="#D4853A" />
        </svg>
      </div>

      <h2 className="mb-1.5 text-center text-lg font-semibold text-[var(--t)]">Two-Factor Verification</h2>
      <p className="mb-6 text-center text-[13px] font-light leading-relaxed text-[var(--tm)]">
        Enter the 6-digit code sent to
        <br />
        <strong className="font-medium text-[var(--t)]">{email || 'your email'}</strong>
      </p>

      <div className="mb-5 flex items-center justify-center gap-2.5" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <div key={index} className="flex items-center">
            {index === 3 && (
              <span className="mx-0.5 shrink-0 select-none text-xl font-light text-white/15">—</span>
            )}
            <input
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              aria-label={`Digit ${index + 1}`}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => setError(false)}
              className={cn(
                'h-[58px] w-[50px] rounded-xl border-[1.5px] bg-white/[0.04] text-center font-sans text-2xl font-semibold text-[var(--t)] caret-og outline-none transition-all duration-200 focus:-translate-y-0.5 focus:border-[rgba(212,133,58,0.6)] focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(212,133,58,0.12)]',
                digit ? 'border-[rgba(212,133,58,0.4)]' : 'border-white/10',
                error && 'otp-shake border-[rgba(240,100,100,0.5)] shadow-[0_0_0_3px_rgba(240,100,100,0.08)]'
              )}
            />
          </div>
        ))}
      </div>

      <p className={cn('mb-3 min-h-[18px] text-center text-xs text-danger transition-opacity duration-200', error ? 'opacity-100' : 'opacity-0')}>
        Incorrect code. Please try again.
      </p>

      <button
        type="button"
        onClick={handleVerify}
        disabled={!isComplete || isVerifying || verified}
        className="btn-gradient-primary relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[11px] border-none py-[15px] font-sans text-sm font-medium text-white shadow-[0_5px_22px_rgba(200,98,42,0.3)] transition-all duration-200 hover:-translate-y-px hover:opacity-93 disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
      >
        {isVerifying ? (
          <>
            <span className="btn-spinner" />
            Verifying…
          </>
        ) : verified ? (
          <>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M3 7.5l3.5 3.5L12 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified!
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M3 7.5h9M8.5 4l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verify & Sign In
          </>
        )}
      </button>

      <p className="mt-[18px] text-center text-[12.5px] text-[rgba(245,240,234,0.32)]">
        Didn&apos;t receive a code?{' '}
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="inline cursor-pointer border-none bg-transparent font-sans text-[12.5px] font-medium text-og transition-colors hover:text-o2 hover:underline"
          >
            Resend code
          </button>
        ) : (
          <span className="font-medium text-[var(--tm)]">
            Resend in {resendSeconds}s
          </span>
        )}
      </p>

      <button
        type="button"
        onClick={onBack}
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 border-none bg-transparent font-sans text-[12.5px] text-[rgba(245,240,234,0.3)] transition-colors hover:text-[var(--tm)]"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M9 6.5H4M6 4l-2.5 2.5L6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to sign in
      </button>
    </div>
  )
}
