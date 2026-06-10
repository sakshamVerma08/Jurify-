// FILE: components/landing/HowItWorks.tsx
// TYPE: Server Component

import { HOW_IT_WORKS_STEPS } from '@/lib/data/landing'

function StepIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'upload':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 14l6-6 3 3 5-7" stroke="#C8622A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="4" cy="14" r="1.5" fill="#C8622A" />
        </svg>
      )
    case 'index':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="2" y="4" width="16" height="12" rx="2" stroke="#C8622A" strokeWidth="1.3" />
          <line x1="6" y1="8" x2="14" y2="8" stroke="#C8622A" strokeWidth="1" />
          <line x1="6" y1="11" x2="11" y2="11" stroke="#C8622A" strokeWidth="1" />
        </svg>
      )
    case 'ask':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 6h12M4 10h8M4 14h10" stroke="#C8622A" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="border-y border-white/[0.06] bg-bg2 px-6 py-20 sm:px-10 lg:px-[60px] lg:py-[100px]"
    >
      <div className="mb-3.5 text-[11px] font-medium uppercase tracking-[2px] text-o">How it works</div>
      <h2
        id="how-it-works-heading"
        className="mb-4 font-serif text-[clamp(36px,4vw,52px)] font-light leading-[1.1] tracking-[-1px] text-[var(--t)]"
      >
        Document in. <em className="italic text-o2">Clarity out.</em>
      </h2>
      <p className="mb-0 max-w-[500px] text-[15px] font-light leading-[1.8] text-[var(--tm)]">
        Powered by RAG — your answers come from your document, not from generic training data.
      </p>

      <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-[20px] border border-white/[0.06] sm:grid-cols-2 lg:mt-[60px] lg:grid-cols-3">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`relative border-white/[0.06] px-7 py-10 transition-colors duration-250 hover:bg-[rgba(200,98,42,0.05)] sm:px-9 ${index < HOW_IT_WORKS_STEPS.length - 1 ? 'border-b lg:border-b-0 lg:border-r' : ''} ${index === 1 ? 'sm:border-r sm:border-b-0' : ''}`}
          >
            <div className="mb-5 font-serif text-[56px] font-light leading-none text-[rgba(200,98,42,0.15)] lg:text-[72px]">
              {step.number}
            </div>
            <div className="mb-[18px] flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(200,98,42,0.2)] bg-[rgba(200,98,42,0.1)]">
              <StepIcon icon={step.icon} />
            </div>
            <h3 className="mb-2.5 text-[17px] font-medium text-[var(--t)]">{step.title}</h3>
            <p className="text-[13px] font-light leading-[1.7] text-[var(--tm)]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
