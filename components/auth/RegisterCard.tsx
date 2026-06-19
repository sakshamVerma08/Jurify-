// FILE: components/auth/RegisterCard.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'
import { RegisterDetailsForm } from '@/components/auth/RegisterDetailsForm'
import { RegisterProgress } from '@/components/auth/RegisterProgress'
import { OTPPanel } from '@/components/auth/OTPPanel'
import { RegisterSuccessPanel } from '@/components/auth/RegisterSuccessPanel'
import { RoleSelectionStep } from '@/components/auth/RoleSelectionStep'
import type { RegisterStep, UserRole } from '@/types'

export function RegisterCard() {
  const [step, setStep] = useState<RegisterStep>(1)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [email, setEmail] = useState('')
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right')

  function goToStep2() {
    if (!selectedRole) return
    setSlideDirection('right')
    setStep(2)
  }

  function goToStep1() {
    setSlideDirection('left')
    setStep(1)
  }

  function goToStep3(userEmail: string) {
    setEmail(userEmail)
    setSlideDirection('right')
    setStep(3)
  }

  function goToSuccess() {
    setSlideDirection('right')
    setStep(4)
  }

  const animationClass =
    slideDirection === 'right' ? 'register-slide-right' : 'register-slide-left'

  return (
    <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center p-5">
      <div className="login-fade-up mb-7 flex items-center gap-2.5">
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border-[1.5px] border-[rgba(212,133,58,0.55)] bg-gradient-to-br from-[rgba(212,133,58,0.25)] to-[rgba(200,98,42,0.1)] shadow-[0_4px_18px_rgba(212,133,58,0.14)]">
          <JurifyLogoIcon size={20} />
        </div>
        <span className="font-serif text-2xl font-semibold tracking-[0.4px] text-[var(--t)]">Jurify</span>
      </div>

      <RegisterProgress currentStep={step} />

      <div className="register-card-in w-full overflow-hidden rounded-[22px] border border-white/[0.08] bg-[rgba(14,13,11,0.96)] px-9 pb-[34px] pt-[38px] shadow-[0_40px_100px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[20px]">
        {step === 1 && (
          <RoleSelectionStep
            selectedRole={selectedRole}
            onSelectRole={setSelectedRole}
            onContinue={goToStep2}
            animationClass={animationClass}
          />
        )}
        {step === 2 && selectedRole && (
          <RegisterDetailsForm
            role={selectedRole}
            onBack={goToStep1}
            onSuccess={goToStep3}
            animationClass={animationClass}
          />
        )}
        {step === 3 && selectedRole && (
          <div className={animationClass}>
            <OTPPanel
              email={email}
              onBack={() => {
                setSlideDirection('left')
                setStep(2)
              }}
              onSuccess={goToSuccess}
            />
          </div>
        )}
        {step === 4 && selectedRole && <RegisterSuccessPanel role={selectedRole} />}
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-[rgba(245,240,234,0.2)]">
        By creating an account you agree to our{' '}
        <Link href="/terms" className="text-[rgba(245,240,234,0.3)] no-underline transition-colors hover:text-[var(--tm)]">
          Terms
        </Link>{' '}
        &amp;{' '}
        <Link href="#" className="text-[rgba(245,240,234,0.3)] no-underline transition-colors hover:text-[var(--tm)]">
          Privacy Policy
        </Link>
        .
        <br />
        © 2026 Jurify · Building legal accessibility for everyone.
      </p>
    </div>
  )
}
