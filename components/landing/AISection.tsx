// FILE: components/landing/AISection.tsx
// TYPE: Server Component

import { AI_CHAT_MESSAGES, AI_FEATURES } from '@/lib/data/landing'

function FeatureIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'check':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="8" stroke="#C8622A" strokeWidth="1.3" />
          <path d="M7 10l2 2 4-4" stroke="#C8622A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'domains':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="14" height="14" rx="3" stroke="#C8622A" strokeWidth="1.3" />
          <path d="M7 8h6M7 11h4" stroke="#C8622A" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
    case 'free':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 3v4M10 13v4M3 10h4M13 10h4" stroke="#C8622A" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="10" cy="10" r="3" stroke="#C8622A" strokeWidth="1.3" />
        </svg>
      )
    case 'followup':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 10c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" stroke="#C8622A" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M10 7v3l2 2" stroke="#C8622A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

function renderAssistantMessage(content: string, highlight?: string) {
  if (!highlight) return content
  const parts = content.split(highlight)
  return (
    <>
      {parts[0]}
      <strong className="text-o2">{highlight}</strong>
      {parts[1]}
    </>
  )
}

export function AISection() {
  return (
    <section
      aria-labelledby="ai-section-heading"
      className="border-y border-white/[0.06] bg-bg2 px-6 py-20 sm:px-10 lg:px-[60px] lg:py-[100px]"
    >
      <div className="mb-3.5 text-[11px] font-medium uppercase tracking-[2px] text-o">AI Legal Assistant</div>
      <h2
        id="ai-section-heading"
        className="mb-4 font-serif text-[clamp(36px,4vw,52px)] font-light leading-[1.1] tracking-[-1px] text-[var(--t)]"
      >
        Your document,
        <br />
        <em className="italic text-o2">explained.</em>
      </h2>
      <p className="mb-0 max-w-[500px] text-[15px] font-light leading-[1.8] text-[var(--tm)]">
        Built for farmers, daily-wage workers, small business owners — anyone who needs to know what a legal document actually says.
      </p>

      <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-5">
          <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-bg2 lg:mx-0">
            <div className="flex items-center justify-between border-b border-white/[0.05] bg-bg3 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(200,98,42,0.3)] bg-[rgba(200,98,42,0.2)] text-sm">
                  ⚖
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--t)]">Jurify AI</div>
                  <div className="text-[11px] text-[var(--td)]">Analysing your document...</div>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="4" cy="8" r="1.5" fill="rgba(245,240,234,0.3)" />
                <circle cx="8" cy="8" r="1.5" fill="rgba(245,240,234,0.3)" />
                <circle cx="12" cy="8" r="1.5" fill="rgba(245,240,234,0.3)" />
              </svg>
            </div>

            <div className="mx-4 mb-4 rounded-xl border-[1.5px] border-dashed border-[rgba(200,98,42,0.25)] bg-[rgba(200,98,42,0.04)] p-3.5 text-center">
              <p className="text-xs text-[var(--td)]">
                <span className="font-medium text-o2">Drop your document here</span> · PDF or DOCX
              </p>
              <p className="mt-1 text-[11px] text-[var(--td)]">land_agreement_rajasthan.pdf — uploaded</p>
            </div>

            <div className="flex flex-col gap-3 px-5 pb-5">
              {AI_CHAT_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${msg.role === 'user' ? 'ml-auto rounded-br rounded-tr rounded-tl-2xl bg-o text-white' : 'rounded-bl rounded-tl rounded-tr-2xl border border-white/[0.06] bg-white/[0.06] text-[var(--t)]'}`}
                >
                  {msg.role === 'assistant'
                    ? renderAssistantMessage(msg.content, msg.highlight)
                    : msg.content}
                </div>
              ))}
            </div>

            <div className="mx-4 mb-4 flex items-center justify-between rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-3.5 py-3">
              <span className="text-xs text-[var(--td)]">Ask anything about your document...</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-o">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {AI_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-bg2 p-6 transition-colors duration-200 hover:border-[rgba(200,98,42,0.25)]"
            >
              <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-[rgba(200,98,42,0.2)] bg-[rgba(200,98,42,0.1)]">
                <FeatureIcon icon={feature.icon} />
              </div>
              <div>
                <div className="mb-1.5 text-[15px] font-medium text-[var(--t)]">{feature.title}</div>
                <div className="text-[13px] font-light leading-[1.7] text-[var(--tm)]">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
