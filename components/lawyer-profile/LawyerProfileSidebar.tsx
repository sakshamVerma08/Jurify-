// FILE: components/lawyer-profile/LawyerProfileSidebar.tsx
// TYPE: Client Component

'use client'

import type { LawyerConsultationFee, LawyerSimilarLawyer, LawyerSidebarOverview } from '@/types'
import { useUiStore } from '@/stores/uiStore'

interface LawyerProfileSidebarProps {
  overview: LawyerSidebarOverview[]
  consultationFees: LawyerConsultationFee[]
  similarLawyers: LawyerSimilarLawyer[]
}

export function LawyerProfileSidebar({ overview, consultationFees, similarLawyers }: LawyerProfileSidebarProps) {
  const showToast = useUiStore((s) => s.showToast)

  return (
    <aside className="flex flex-col gap-5">
      <div className="rounded-2xl border border-white/[0.07] bg-card px-5 py-[22px] transition-colors duration-200 hover:border-white/[0.11]">
        <div className="mb-3.5 flex items-center gap-[7px] text-[12.5px] text-[rgba(245,240,234,0.4)]">
          <span className="profile-online-dot h-2 w-2 shrink-0 rounded-full bg-success shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
          Online · Usually responds within 2 hours
        </div>
        <button
          type="button"
          onClick={() => showToast('Opening consultation booking…', 'info')}
          className="btn-gradient-nav relative mb-2.5 flex w-full cursor-pointer items-center justify-center gap-[7px] overflow-hidden rounded-[10px] border-none py-3 font-sans text-[13px] font-medium text-white transition-all duration-200 hover:-translate-y-px hover:opacity-92"
        >
          <CalendarIcon />
          Book Consultation
        </button>
        <button
          type="button"
          onClick={() => showToast('Opening message window…', 'info')}
          className="flex w-full cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-white/[0.12] bg-white/[0.05] py-[11px] font-sans text-[13px] text-[var(--t)] transition-all duration-200 hover:border-white/[0.22] hover:bg-white/[0.09]"
        >
          <MessageIcon />
          Send Message
        </button>
      </div>

      <SidebarCard title="Profile Overview" icon="info">
        <div className="flex flex-col gap-2">
          {overview.map((item) => (
            <div
              key={item.sub}
              className="flex cursor-pointer items-center gap-2.5 rounded-[9px] px-2.5 py-2 transition-colors duration-150 hover:bg-white/[0.04]"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-og/20 bg-og/10">
                <OverviewIcon />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-[var(--t)]">{item.value}</p>
                <p className="text-[10.5px] text-[var(--td)]">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </SidebarCard>

      <SidebarCard title="Consultation Fees" icon="fees">
        <div className="flex flex-col gap-2.5">
          {consultationFees.map((fee) => (
            <div
              key={fee.label}
              className="flex items-center justify-between rounded-[10px] border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
            >
              <span className="text-[13px] text-[var(--tm)]">{fee.label}</span>
              <span className={`text-sm font-semibold ${fee.highlight === 'success' ? 'text-success' : 'text-[var(--t)]'}`}>
                {fee.amount}
              </span>
            </div>
          ))}
          <p className="px-1 text-center text-[11.5px] text-[var(--td)]">Retainer fees discussed at first consultation</p>
        </div>
      </SidebarCard>

      <SidebarCard title="Similar Lawyers" icon="lawyers">
        <div className="flex flex-col gap-1">
          {similarLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="flex cursor-pointer items-center gap-[11px] rounded-[10px] px-2 py-2.5 transition-colors duration-150 hover:bg-white/[0.03]"
            >
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-og/25 bg-og/15 font-serif text-[15px] font-semibold text-og">
                {lawyer.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-[var(--t)]">{lawyer.name}</p>
                <p className="mt-0.5 text-[11px] text-[var(--td)]">{lawyer.area}</p>
              </div>
              <button
                type="button"
                onClick={() => showToast('Connect request sent', 'ok')}
                className="ml-auto shrink-0 cursor-pointer rounded-md border border-og/20 bg-og/[0.08] px-2.5 py-[3px] font-sans text-[11px] text-og transition-all duration-150 hover:bg-og/[0.16]"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </SidebarCard>
    </aside>
  )
}

function SidebarCard({
  title,
  icon,
  children,
}: {
  title: string
  icon: 'info' | 'fees' | 'lawyers'
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card px-5 py-[22px] transition-colors duration-200 hover:border-white/[0.11]">
      <h3 className="mb-3.5 flex items-center gap-2 text-[13.5px] font-semibold text-[var(--t)]">
        {icon === 'info' && <InfoIcon />}
        {icon === 'fees' && <FeesIcon />}
        {icon === 'lawyers' && <LawyersIcon />}
        {title}
      </h3>
      {children}
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 1.5v2M10 1.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="1.5" y1="5.5" x2="12.5" y2="5.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7 8v2.5M5.5 9.2h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M1 2h11v8H7.5L4.5 12V10H1V2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  )
}

function OverviewIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="11" height="11" rx="2" stroke="#D4853A" strokeWidth="1" />
      <line x1="3.5" y1="5" x2="9.5" y2="5" stroke="#D4853A" strokeWidth=".9" />
      <line x1="3.5" y1="7.5" x2="7.5" y2="7.5" stroke="#D4853A" strokeWidth=".9" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="opacity-55">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1" />
      <line x1="7" y1="5" x2="7" y2="7.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="7" cy="9.5" r=".6" fill="currentColor" />
    </svg>
  )
}

function FeesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="opacity-55">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function LawyersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="opacity-55">
      <circle cx="5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="9" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1 11c0-2 1.8-3.5 4-3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M7 11c0-2 1.8-3.5 4-3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}
