// FILE: components/landing/HeroDashboard.tsx
// TYPE: Server Component

import Link from 'next/link'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'
import { HERO_DASHBOARD_STATS, HERO_RECOMMENDED_CASES } from '@/lib/data/landing'

const DB_NAV_ITEMS = [
  { label: 'Dashboard', active: true },
  { label: 'Pro Bono Cases', active: false },
  { label: 'My Applications', active: false },
  { label: 'My Network', active: false },
  { label: 'Messages', active: false },
  { label: 'AI Assistant', active: false },
  { label: 'Bookmarks', active: false },
  { label: 'Settings', active: false },
] as const

const AI_CHIPS = [
  'Explain a legal concept',
  'Draft a legal document',
  'Check case precedents',
  'Suggest legal resources',
] as const

export function HeroDashboard() {
  return (
    <div className="relative w-full max-w-[660px]">
      <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[rgba(16,15,13,0.88)] shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-[10px]">
        <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[rgba(22,21,18,0.95)] px-[18px] py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-[rgba(212,133,58,0.4)] bg-[rgba(212,133,58,0.2)]">
              <JurifyLogoIcon size={12} />
            </div>
            <span className="font-serif text-[15px] font-semibold text-[var(--t)]">Jurify</span>
          </div>
        </div>

        <div className="grid min-h-[280px] grid-cols-1 sm:grid-cols-[140px_1fr] lg:min-h-[320px] lg:grid-cols-[160px_1fr]">
          <div className="hidden flex-col gap-0.5 border-b border-white/[0.06] bg-[rgba(14,13,11,0.9)] py-4 sm:flex sm:border-b-0 sm:border-r">
            {DB_NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-4 py-2 text-xs transition-colors duration-150 ${item.active ? 'border-r-2 border-og bg-[rgba(212,133,58,0.1)] text-o2' : 'text-[rgba(245,240,234,0.4)]'}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                {item.label}
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-[18px_20px]">
            <div className="mb-0.5 text-[15px] font-semibold text-[var(--t)]">Welcome back, Advocate 👋</div>
            <div className="mb-4 text-[11.5px] text-[rgba(245,240,234,0.38)]">Let&apos;s make a difference today.</div>

            <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {HERO_DASHBOARD_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[10px] border border-white/[0.07] bg-white/[0.04] px-3 py-2.5"
                >
                  <div className="text-xl font-semibold leading-none text-[var(--t)]">{stat.value}</div>
                  <div className="mt-0.5 text-[10px] text-[rgba(245,240,234,0.35)]">{stat.label}</div>
                  <div className="mt-1 flex items-center gap-0.5 text-[9px] text-[rgba(212,133,58,0.8)]">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                      <path d="M4 6V2M2 4l2-2 2 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    +{stat.change}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-2.5 text-[11px] uppercase tracking-[1px] text-[rgba(245,240,234,0.35)]">
              Recommended for you
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {HERO_RECOMMENDED_CASES.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="rounded-[10px] border border-white/[0.07] bg-white/[0.03] p-3 transition-colors duration-200 hover:border-[rgba(212,133,58,0.3)]"
                >
                  <div className="mb-1.5 flex flex-wrap gap-1">
                    {caseItem.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={`rounded-full px-2 py-0.5 text-[9.5px] font-medium ${tag.variant === 'primary' ? 'bg-[rgba(212,133,58,0.12)] text-[rgba(212,133,58,0.85)]' : 'bg-white/[0.06] text-[rgba(245,240,234,0.45)]'}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  <div className="mb-1 text-[12.5px] font-medium leading-snug text-[var(--t)]">{caseItem.title}</div>
                  <div className="mb-2 text-[11px] leading-normal text-[rgba(245,240,234,0.35)]">{caseItem.description}</div>
                  <div className="flex items-center gap-2.5 text-[10px] text-[rgba(245,240,234,0.3)] [&_svg]:opacity-50">
                    <span className="flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <circle cx="5" cy="4" r="2.5" stroke="currentColor" strokeWidth="0.9" />
                        <path d="M1 9c0-1.7 1.8-3 4-3s4 1.3 4 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
                      </svg>
                      {caseItem.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="0.9" />
                        <path d="M5 3v2l1.5 1.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
                      </svg>
                      {caseItem.deadline}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/cases"
              className="mt-3 flex items-center gap-1 text-[11.5px] text-o2 no-underline transition-colors hover:text-[var(--t)]"
            >
              View all cases
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M2 5.5h7M6 3l3 2.5L6 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -right-6 hidden w-[230px] overflow-hidden rounded-2xl border border-white/10 bg-[rgba(14,13,11,0.95)] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(212,133,58,0.08)] backdrop-blur-[16px] md:block">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-3.5 py-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(212,133,58,0.35)] bg-[rgba(212,133,58,0.15)] text-[13px]">
            ✦
          </div>
          <div>
            <div className="text-[12.5px] font-medium text-[var(--t)]">AI Legal Assistant</div>
            <div className="flex items-center gap-1 text-[10px] text-[rgba(245,240,234,0.4)]">
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-success shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
              Online
            </div>
          </div>
        </div>
        <div className="px-3.5 py-3">
          <div className="mb-3 text-xs leading-snug text-[rgba(245,240,234,0.55)]">
            Hello, I&apos;m Jurify AI.
            <br />
            How can I assist you today?
          </div>
          <div className="mb-3 flex flex-col gap-1.5">
            {AI_CHIPS.map((chip) => (
              <div
                key={chip}
                className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.04] px-2.5 py-[7px] transition-colors hover:border-white/[0.12] hover:bg-white/[0.07]"
              >
                <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border border-[rgba(212,133,58,0.25)] bg-[rgba(212,133,58,0.12)]">
                  <span className="text-[8px] text-og">+</span>
                </div>
                <span className="text-[11px] text-[rgba(245,240,234,0.6)]">{chip}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-[9px] border border-white/[0.08] bg-white/[0.04] px-3 py-2">
            <span className="text-[11px] text-[rgba(245,240,234,0.25)]">Ask anything legal...</span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-og to-[#b8521e]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 5h6M6 3l2 2-2 2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
