// FILE: components/auth/LoginCard.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ForgotPasswordPanel } from '@/components/auth/ForgotPasswordPanel'
import { LoginForm } from '@/components/auth/LoginForm'
import { OTPPanel } from '@/components/auth/OTPPanel'
import type { LoginPanel } from '@/types'

export function LoginCard() {
  const router = useRouter()
  const [panel, setPanel] = useState<LoginPanel>('login')
  const [email, setEmail] = useState('')

  return (
    <div className="relative z-10 w-full max-w-[420px] p-5">
      <div className="login-card-in rounded-[22px] border border-white/[0.09] bg-[rgba(14,13,11,0.95)] px-9 pb-9 pt-10 shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[20px]">
        {panel === 'login' && (
          <LoginForm
            onLoginSuccess={(userEmail, isVerified) => {
              if (isVerified) {
                router.push('/dashboard')
              } else {
                setEmail(userEmail)
                setPanel('otp')
              }
            }}
            onForgotPassword={() => setPanel('forgot')}
          />
        )}
        {panel === 'otp' && (
          <OTPPanel email={email} onBack={() => setPanel('login')} />
        )}
        {panel === 'forgot' && (
          <ForgotPasswordPanel onBack={() => setPanel('login')} />
        )}
      </div>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-[rgba(245,240,234,0.2)]">
        By signing in you agree to Jurify&apos;s{' '}
        <Link href="/terms" className="text-[rgba(245,240,234,0.3)] no-underline transition-colors hover:text-[var(--tm)]">
          Terms of Service
        </Link>{' '}
        &amp;{' '}
        <Link href="#" className="text-[rgba(245,240,234,0.3)] no-underline transition-colors hover:text-[var(--tm)]">
          Privacy Policy
        </Link>
        .
        <br />
        © 2026 Jurify · All rights reserved
      </p>
    </div>
  )
}
