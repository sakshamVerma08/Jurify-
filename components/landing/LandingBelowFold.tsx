// FILE: components/landing/LandingBelowFold.tsx
// TYPE: Server Component

import { AISection } from '@/components/landing/AISection'
import { CTASection } from '@/components/landing/CTASection'
import { ForWhomSection } from '@/components/landing/ForWhomSection'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { ProBonoSection } from '@/components/landing/ProBonoSection'

export function LandingBelowFold() {
  return (
    <>
      <ForWhomSection />
      <HowItWorks />
      <ProBonoSection />
      <AISection />
      <CTASection />
    </>
  )
}
