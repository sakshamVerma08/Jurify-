// FILE: app/page.tsx
// TYPE: Server Component
// RENDERING: Static — marketing landing page with no dynamic data

export const dynamic = 'force-static'

import nextDynamic from 'next/dynamic'
import { Suspense } from 'react'
import { HeroSection } from '@/components/landing/HeroSection'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Skeleton } from '@/components/ui/Skeleton'

const MarqueeTrack = nextDynamic(
  () => import('@/components/landing/MarqueeTrack').then((mod) => mod.MarqueeTrack)
)

const LandingBelowFold = nextDynamic(
  () => import('@/components/landing/LandingBelowFold').then((mod) => mod.LandingBelowFold)
)

function BelowFoldFallback() {
  return (
    <div className="space-y-0">
      <Skeleton className="h-12 w-full rounded-none" />
      <div className="px-6 py-20 lg:px-[60px]">
        <Skeleton className="mb-4 h-4 w-24" />
        <Skeleton className="h-14 w-80" />
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<Skeleton className="h-12 w-full" />}>
          <MarqueeTrack />
        </Suspense>
        <Suspense fallback={<BelowFoldFallback />}>
          <LandingBelowFold />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
