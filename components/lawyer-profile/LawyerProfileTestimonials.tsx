// FILE: components/lawyer-profile/LawyerProfileTestimonials.tsx
// TYPE: Client Component

'use client'

import { useEffect, useState } from 'react'
import { ProfileSectionCard } from '@/components/lawyer-profile/ProfileSectionCard'
import { useInView } from '@/lib/hooks/useInView'
import type { LawyerRatingBar, LawyerTestimonial } from '@/types'

interface LawyerProfileTestimonialsProps {
  rating: number
  reviewCount: number
  ratingBars: LawyerRatingBar[]
  testimonials: LawyerTestimonial[]
}

export function LawyerProfileTestimonials({
  rating,
  reviewCount,
  ratingBars,
  testimonials,
}: LawyerProfileTestimonialsProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const [barWidths, setBarWidths] = useState<Record<number, number>>({})

  useEffect(() => {
    if (!inView) return
    setBarWidths(Object.fromEntries(ratingBars.map((b) => [b.stars, b.pct])))
  }, [inView, ratingBars])

  return (
    <ProfileSectionCard
      tag="Section 04"
      title={
        <>
          Client <em className="italic text-o2">Testimonials</em>
        </>
      }
      action={<span className="text-xs text-[var(--td)]">{reviewCount} reviews</span>}
    >
      <div ref={ref} className="mb-5 flex flex-wrap items-center gap-4 border-b border-white/[0.06] pb-[18px]">
        <div className="text-[52px] font-bold leading-none text-[var(--t)]">{rating}</div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-base text-o2">
                ★
              </span>
            ))}
          </div>
          <p className="text-xs text-[var(--td)]">Based on {reviewCount} client reviews</p>
        </div>
        <div className="flex min-w-[180px] flex-1 flex-col gap-[3px]">
          {ratingBars.map((bar) => (
            <div key={bar.stars} className="flex items-center gap-2">
              <span className="w-4 shrink-0 text-right text-[11px] text-[var(--td)]">{bar.stars}</span>
              <div className="h-1 flex-1 overflow-hidden rounded-sm bg-white/[0.06]">
                <div
                  className="h-full rounded-sm bg-gradient-to-r from-og to-o2 transition-[width] duration-[1200ms] ease-out"
                  style={{ width: `${barWidths[bar.stars] ?? 0}%` }}
                />
              </div>
              <span className="w-5 shrink-0 text-[10px] text-[var(--td)]">{bar.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {testimonials.map((t, i) => (
          <article
            key={t.id}
            className="profile-testi-in rounded-[14px] border border-white/[0.07] bg-white/[0.03] px-5 py-[18px] transition-colors duration-200 hover:border-white/[0.12]"
            style={{ animationDelay: `${0.05 + i * 0.05}s` }}
          >
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-og/25 bg-og/15 text-[13px] font-semibold text-og">
                  {t.authorInitial}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[var(--t)]">{t.authorName}</p>
                  <p className="text-[11px] text-[var(--td)]">{t.caseLabel}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-xs text-o2" style={{ opacity: i < t.rating ? 1 : 0.3 }}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[13px] font-light italic leading-relaxed text-[var(--tm)] profile-testi-quote">
              {t.text}
            </p>
          </article>
        ))}
      </div>
    </ProfileSectionCard>
  )
}
