// FILE: components/landing/CTASection.tsx
// TYPE: Server Component

import Image from 'next/image'
import { CTAButtons } from '@/components/landing/CTAButtons'
import { CTA_BACKGROUND_IMAGE } from '@/lib/data/landing'

export function CTASection() {
  return (
    <section aria-labelledby="cta-heading" className="relative mx-4 mb-20 flex min-h-[360px] items-center overflow-hidden rounded-[28px] sm:mx-8 sm:min-h-[440px] lg:mx-[60px] lg:mb-[100px]">
      <Image
        src={CTA_BACKGROUND_IMAGE}
        alt="Law library with books representing legal knowledge"
        fill
        quality={80}
        sizes="(max-width: 768px) 100vw, 90vw"
        className="object-cover object-center grayscale-[30%] brightness-[0.4]"
      />
      <div className="cta-gradient-overlay absolute inset-0" />
      <div className="relative z-[2] max-w-[640px] px-8 py-14 sm:px-14 sm:py-[72px] lg:px-20">
        <h2
          id="cta-heading"
          className="mb-4 font-serif text-[clamp(36px,4vw,52px)] font-light leading-[1.1] tracking-[-1px] text-[var(--t)]"
        >
          Ready to make
          <br />
          the law <em className="italic text-o2">accessible?</em>
        </h2>
        <p className="mb-9 max-w-[500px] text-[15px] font-light leading-[1.8] text-[var(--tm)]">
          Join 10,000+ legal professionals on Jurify — or try the AI assistant right now, completely free, no sign-up needed.
        </p>
        <CTAButtons />
      </div>
    </section>
  )
}
