// FILE: components/lawyer-profile/LawyerProfileHero.tsx
// TYPE: Client Component

'use client'

import { cn } from '@/lib/utils'
import type { LawyerProfile } from '@/types'
import { useLawyerProfileStore } from '@/stores/lawyerProfileStore'
import { useUiStore } from '@/stores/uiStore'

interface LawyerProfileHeroProps {
  profile: LawyerProfile
}

export function LawyerProfileHero({ profile }: LawyerProfileHeroProps) {
  const connected = useLawyerProfileStore((s) => s.connected)
  const toggleConnect = useLawyerProfileStore((s) => s.toggleConnect)
  const showToast = useUiStore((s) => s.showToast)

  function handleConnect() {
    toggleConnect()
    showToast(
      connected ? 'Removed from connections' : `Connected to ${profile.name}`,
      connected ? 'info' : 'ok'
    )
  }

  return (
    <>
      <div className="relative h-[220px] overflow-hidden bg-gradient-to-br from-[rgba(18,14,10,1)] via-[rgba(60,35,10,1)] to-[rgba(40,26,10,1)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(212,133,58,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 20% 30%, rgba(200,98,42,0.14) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,133,58,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,133,58,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute right-5 top-4 z-[2] flex gap-2">
          <CoverAction
            title="Share"
            onClick={() => showToast('Share link copied', 'info')}
            icon="share"
          />
          <CoverAction
            title="Save"
            onClick={() => showToast('Added to saved lawyers', 'ok')}
            icon="save"
          />
        </div>
      </div>

      <div className="relative z-[1] px-[52px] max-lg:px-6">
        <div className="-mt-14 mb-5 flex flex-wrap items-end justify-between gap-4">
          <div className="relative shrink-0">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-bg bg-gradient-to-br from-og/30 to-o/15 font-serif text-[40px] font-semibold text-og shadow-[0_0_0_2px_rgba(212,133,58,0.3),0_0_28px_rgba(212,133,58,0.18)]">
              {profile.initials}
            </div>
            <span className="absolute bottom-1 right-1 flex h-[26px] w-[26px] items-center justify-center rounded-full border-[3px] border-bg bg-gradient-to-br from-og to-[#b8521e] shadow-[0_0_12px_rgba(212,133,58,0.55)]">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M2 5.5l2.2 2.2L9 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pb-1">
            <button
              type="button"
              onClick={() => showToast('Opening consultation booking…', 'info')}
              className="btn-gradient-nav relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-[10px] border-none px-6 py-3 font-sans text-[13.5px] font-medium text-white transition-all duration-200 hover:-translate-y-px hover:opacity-92"
            >
              <CalendarIcon />
              Book Consultation
            </button>
            <button
              type="button"
              onClick={handleConnect}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-[10px] border px-[22px] py-3 font-sans text-[13.5px] transition-all duration-200',
                connected
                  ? 'border-success/25 bg-success/[0.07] text-success'
                  : 'border-white/[0.14] bg-white/[0.05] text-[var(--t)] hover:border-white/[0.24] hover:bg-white/[0.09]'
              )}
            >
              {connected ? <CheckIcon /> : <PlusIcon />}
              {connected ? 'Connected' : 'Connect'}
            </button>
            <button
              type="button"
              onClick={() => showToast('Link copied to clipboard', 'info')}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-[var(--td)] transition-all duration-200 hover:bg-white/[0.08] hover:text-[var(--tm)]"
              aria-label="Share profile"
            >
              <ShareIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-white/[0.07] px-[52px] pb-7 max-lg:px-6">
        <div className="mb-1.5 flex flex-wrap items-center gap-3">
          <h1 className="font-serif text-[34px] font-normal leading-[1.08] tracking-[-0.4px] text-[var(--t)]">
            {profile.name}
          </h1>
          {profile.verified && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-og/30 bg-og/10 px-[11px] py-1 text-[11px] font-semibold text-og">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M5 1L2 2.5v2.8c0 2.2 1.4 3.8 3 4.2C6.6 9.1 8 7.5 8 5.3V2.5L5 1z" stroke="#D4853A" strokeWidth=".9" strokeLinejoin="round" />
                <path d="M3.5 5l1.2 1.2L7 3.5" stroke="#D4853A" strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Bar Council Verified
            </span>
          )}
        </div>

        <p className="mb-3.5 text-[15px] font-light text-[var(--tm)]">{profile.degree}</p>

        <div className="mb-3.5 flex flex-wrap gap-2">
          {profile.practiceAreas.map((area) => (
            <span
              key={area}
              className="flex items-center gap-1.5 rounded-full border border-og/20 bg-og/[0.09] px-3 py-[5px] text-xs text-[rgba(212,133,58,0.85)]"
            >
              <TagIcon />
              {area}
            </span>
          ))}
          <span className="flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-[5px] text-xs text-[var(--tm)]">
            <PinIcon />
            {profile.location}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-[5px] text-xs text-[var(--tm)]">
            <LangIcon />
            {profile.languages}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-[13px] text-o2">
                  ★
                </span>
              ))}
            </div>
            <span className="text-[13px] font-medium text-[var(--t)]">{profile.rating}</span>
          </div>
          <span className="h-3.5 w-px bg-white/[0.08]" />
          <MetaItem icon="clock">{profile.experienceYears} years experience</MetaItem>
          <span className="h-3.5 w-px bg-white/[0.08]" />
          <MetaItem icon="users">{profile.connections} connections</MetaItem>
          {profile.proBonoAvailable && (
            <>
              <span className="h-3.5 w-px bg-white/[0.08]" />
              <span className="flex items-center gap-1.5 text-[12.5px] text-success">
                <span className="h-[11px] w-[11px] rounded-full bg-success" />
                Available for Pro Bono
              </span>
            </>
          )}
        </div>
      </div>
    </>
  )
}

function CoverAction({ title, onClick, icon }: { title: string; onClick: () => void; icon: 'share' | 'save' }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[9px] border border-white/[0.12] bg-black/45 text-[var(--td)] transition-all duration-200 hover:bg-black/70 hover:text-[var(--tm)]"
    >
      {icon === 'share' ? <ShareIcon /> : <SaveIcon />}
    </button>
  )
}

function MetaItem({ icon, children }: { icon: 'clock' | 'users'; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-[12.5px] text-[var(--td)]">
      {icon === 'clock' ? (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="opacity-50">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1" />
          <path d="M6.5 4V7l2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="opacity-50">
          <circle cx="6.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1" />
          <path d="M1 12c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </span>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 1.5v2M10 1.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="1.5" y1="5.5" x2="12.5" y2="5.5" stroke="currentColor" strokeWidth="1.1" />
      <line x1="7" y1="8" x2="7" y2="10.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="5.5" y1="9.2" x2="8.5" y2="9.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 6.5l2.5 2.5L11 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="11" cy="3" r="1.8" stroke="currentColor" strokeWidth="1" />
      <circle cx="3" cy="7" r="1.8" stroke="currentColor" strokeWidth="1" />
      <circle cx="11" cy="11" r="1.8" stroke="currentColor" strokeWidth="1" />
      <line x1="4.7" y1="6" x2="9.3" y2="4" stroke="currentColor" strokeWidth="1" />
      <line x1="4.7" y1="8" x2="9.3" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function SaveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 2h10v11l-5-3.5L2 13V2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="opacity-80">
      <rect x="1" y="1" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="opacity-55">
      <path d="M5.5 1C3.8 1 2.5 2.3 2.5 4c0 2.5 3 5 3 5s3-2.5 3-5C8.5 2.3 7.2 1 5.5 1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

function LangIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="opacity-55">
      <path d="M2 6h7M6.5 3.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}
