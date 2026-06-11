// FILE: components/landing/HeroSection.tsx
// TYPE: Server Component

import Image from 'next/image'
import { HeroCTAs } from '@/components/landing/HeroCTAs'
import { HeroDashboard } from '@/components/landing/HeroDashboard'
import { HeroStatsBar } from '@/components/landing/HeroStatsBar'
import { LADY_JUSTICE_IMAGE, TRUST_BADGES } from '@/lib/data/landing'

function TrustIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'shield':
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1.5L2 4v4c0 2.5 2.2 4.5 5 5 2.8-.5 5-2.5 5-5V4L7 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      )
    case 'lock':
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
          <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      )
    case 'users':
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="9" cy="5" r="2" stroke="currentColor" strokeWidth="1.1" />
          <path d="M1 12c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative flex min-h-screen flex-col overflow-hidden bg-bg pt-[68px]">
      <div className="hero-statue absolute bottom-0 right-[-2%] top-0 z-0 hidden w-[58%] md:block">
        <Image
          src={LADY_JUSTICE_IMAGE}
          alt="Lady Justice statue representing the legal profession"
          fill
          priority
          quality={88}
          sizes="(max-width: 768px) 0vw, 58vw"
          className="object-cover object-[60%_10%] brightness-[0.72] saturate-[0.8] contrast-[1.08]"
        />
        <div className="hero-statue-fade absolute inset-0" />
        <div className="hero-statue-tint absolute inset-0" />
      </div>

      <div className="relative z-[2] mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-10 px-5 pb-0 pt-10 sm:px-8 lg:grid-cols-2 lg:gap-0 lg:px-14 lg:pt-12">
        <div className="flex flex-col pr-0 lg:pr-8">
          <div className="animate-fade-up-delay-1 mb-7 inline-flex w-fit items-center gap-2.5 rounded-[20px] border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs tracking-[0.5px] text-[rgba(245,240,234,0.6)]">
            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[rgba(212,133,58,0.4)] bg-[rgba(212,133,58,0.2)]">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1.5 4l1.8 1.8L6.5 2" stroke="#D4853A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            The Professional Legal Network
          </div>

          <h1
            id="hero-heading"
            className="animate-fade-up-delay-2 mb-5 font-sans text-[clamp(36px,5.2vw,68px)] font-semibold leading-[1.12] tracking-[-1.5px] text-[var(--t)]"
          >
            Where Legal
            <br />
            Professionals
            <span className="hero-h1-accent block">Connect & Grow</span>
          </h1>

          <p className="animate-fade-up-delay-3 mb-0 max-w-[440px] text-base font-light leading-[1.75] text-[rgba(245,240,234,0.52)]">
            Connect with verified lawyers, discover pro bono opportunities, and use AI-powered legal assistance in one platform.
          </p>

          <div className="animate-fade-up-delay-4">
            <HeroCTAs />
          </div>

          <div className="animate-fade-up-delay-5 flex flex-wrap items-center gap-6">
            {TRUST_BADGES.map((badge, index) => (
              <div key={badge.id} className="flex items-center gap-6">
                {index > 0 && <div className="h-3.5 w-px bg-white/10" />}
                <div className="flex items-center gap-[7px] text-xs font-normal text-[rgba(245,240,234,0.38)] [&_svg]:shrink-0 [&_svg]:opacity-50">
                  <TrustIcon icon={badge.icon} />
                  {badge.label}
                </div>
              </div>
            ))}
            <div className="h-3.5 w-px bg-white/10" />
            <div className="flex items-center gap-[7px]">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[13px] text-o2">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-[rgba(245,240,234,0.38)]">4.8/5 from 2,300+ users</span>
            </div>
          </div>
        </div>

        <div className="animate-fade-up-delay-hero-right relative z-[2] flex items-center justify-center pl-0 pr-0 lg:justify-end lg:pl-4 lg:pr-2">
          <HeroDashboard />
        </div>
      </div>

      <HeroStatsBar />
    </section>
  )
}
