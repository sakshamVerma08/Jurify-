// FILE: components/kyc/KycPageContent.tsx
// TYPE: Client Component

'use client'

import { useEffect, useRef } from 'react'
import { KycSidebar } from '@/components/kyc/KycSidebar'
import { KycStep1Form } from '@/components/kyc/KycStep1Form'
import { KycStep2Documents } from '@/components/kyc/KycStep2Documents'
import { KycStep3Profile } from '@/components/kyc/KycStep3Profile'
import { KycStep4Review } from '@/components/kyc/KycStep4Review'
import { KycSuccessOverlay } from '@/components/kyc/KycSuccessOverlay'
import { useKycStore } from '@/stores/kycStore'

export function KycPageContent() {
  const currentStep = useKycStore((s) => s.currentStep)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  return (
    <>
      <div className="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 pt-[68px] lg:grid-cols-[300px_1fr]">
        <KycSidebar />
        <main ref={mainRef} className="min-h-[calc(100vh-68px)] overflow-y-auto px-6 py-10 pb-20 md:px-10 lg:px-14 lg:py-12">
          {currentStep === 1 && <KycStep1Form />}
          {currentStep === 2 && <KycStep2Documents />}
          {currentStep === 3 && <KycStep3Profile />}
          {currentStep === 4 && <KycStep4Review />}
        </main>
      </div>
      <KycSuccessOverlay />
    </>
  )
}
