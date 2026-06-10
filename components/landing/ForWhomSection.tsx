// FILE: components/landing/ForWhomSection.tsx
// TYPE: Server Component

import Link from 'next/link'
import { AUDIENCE_PANELS } from '@/lib/data/landing'

function PanelIcon({ icon }: { icon: string }) {
  if (icon === 'lawyer') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L15 9H21L16 13.5L18 20L12 16.5L6 20L8 13.5L3 9H9L12 2Z" stroke="#C8622A" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="#C8622A" strokeWidth="1.4" />
      <line x1="8" y1="9" x2="16" y2="9" stroke="#C8622A" strokeWidth="1.2" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="#C8622A" strokeWidth="1.2" />
      <line x1="8" y1="17" x2="12" y2="17" stroke="#C8622A" strokeWidth="1.2" />
    </svg>
  )
}

export function ForWhomSection() {
  return (
    <section aria-labelledby="for-whom-heading" className="border-b border-white/[0.06]">
      <div className="px-6 pb-10 pt-14 sm:px-10 lg:px-[60px] lg:pt-[60px]">
        <div className="mb-3.5 text-[11px] font-medium uppercase tracking-[2px] text-o">Who it&apos;s for</div>
        <h2
          id="for-whom-heading"
          className="font-serif text-[clamp(36px,4vw,52px)] font-light leading-[1.1] tracking-[-1px] text-[var(--t)]"
        >
          Two audiences.
          <br />
          <em className="italic text-o2">One platform.</em>
        </h2>
      </div>

      <div className="grid min-h-0 grid-cols-1 lg:grid-cols-2 lg:min-h-[80vh]">
        {AUDIENCE_PANELS.map((panel) => (
          <div
            key={panel.id}
            className="relative flex flex-col justify-center overflow-hidden border-b border-white/[0.06] px-6 py-16 transition-colors duration-300 hover:bg-[rgba(200,98,42,0.04)] sm:px-10 lg:border-b-0 lg:border-r lg:px-[60px] lg:py-20 last:lg:border-r-0"
          >
            <div className="absolute right-6 top-5 font-serif text-[80px] font-light leading-none text-[rgba(200,98,42,0.08)] sm:text-[120px] lg:right-[30px]">
              {panel.number}
            </div>
            <div className="mb-7 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-[rgba(200,98,42,0.3)] bg-[rgba(200,98,42,0.08)]">
              <PanelIcon icon={panel.icon} />
            </div>
            <h3 className="mb-4 whitespace-pre-line font-serif text-[clamp(28px,3vw,38px)] font-normal leading-[1.15] text-[var(--t)]">
              {panel.title}
            </h3>
            <p className="mb-7 max-w-[380px] text-sm font-light leading-[1.8] text-[var(--tm)]">{panel.description}</p>
            <ul className="mb-9 list-none">
              {panel.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 border-b border-white/[0.04] py-2 text-[13px] text-[var(--tm)] last:border-b-0"
                >
                  <div className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgba(200,98,42,0.3)] bg-[rgba(200,98,42,0.15)]">
                    <span className="text-[9px] text-o">→</span>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={panel.ctaHref}
              className="inline-flex w-fit items-center gap-2.5 self-start rounded-[10px] border border-[rgba(200,98,42,0.3)] bg-[rgba(200,98,42,0.06)] px-[22px] py-3 text-[13px] font-medium text-o2 no-underline transition-all duration-200 hover:translate-x-1 hover:border-o hover:bg-[rgba(200,98,42,0.15)]"
            >
              {panel.ctaLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
