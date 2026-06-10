// FILE: components/lawyer-profile/LawyerProfileAbout.tsx
// TYPE: Client Component

'use client'

import { ProfileSectionCard } from '@/components/lawyer-profile/ProfileSectionCard'
import { useUiStore } from '@/stores/uiStore'

interface LawyerProfileAboutProps {
  firstName: string
  bio: string[]
  videoLabel: string
}

export function LawyerProfileAbout({ firstName, bio, videoLabel }: LawyerProfileAboutProps) {
  const showToast = useUiStore((s) => s.showToast)

  return (
    <ProfileSectionCard
      tag="Section 01"
      title={
        <>
          About <em className="italic text-o2">{firstName}</em>
        </>
      }
    >
      {bio.map((paragraph, i) => (
        <p key={i} className={`text-sm font-light leading-[1.82] text-[var(--tm)] ${i > 0 ? 'mt-3' : ''}`}>
          {paragraph}
        </p>
      ))}

      <button
        type="button"
        onClick={() => showToast('Playing introduction video…', 'info')}
        className="group mt-5 w-full cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-black/50 text-left transition-colors hover:border-white/[0.12]"
      >
        <div className="relative flex h-[180px] items-center justify-center bg-gradient-to-br from-[rgba(30,22,12,1)] to-[rgba(50,30,10,1)]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 70% at 60% 40%, rgba(212,133,58,0.16), transparent)' }}
          />
          <div className="relative z-[1] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-og to-[#b8521e] shadow-[0_0_24px_rgba(212,133,58,0.4)] transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_36px_rgba(212,133,58,0.55)]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M6 4l9 5-9 5V4z" fill="#fff" />
            </svg>
          </div>
        </div>
        <p className="border-t border-white/[0.06] px-3 py-2.5 text-center text-xs text-[var(--td)]">{videoLabel}</p>
      </button>
    </ProfileSectionCard>
  )
}
