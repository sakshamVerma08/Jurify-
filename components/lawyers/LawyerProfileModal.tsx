// FILE: components/lawyers/LawyerProfileModal.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import type { LawyerListing } from '@/types'
import { useLawyerSearchStore } from '@/stores/lawyerSearchStore'
import { useUiStore } from '@/stores/uiStore'

function availabilityLabel(a: LawyerListing['availability']) {
  if (a === 'ProBono') return '✓ Pro Bono available'
  if (a === 'Paid') return 'Paid engagements only'
  return '✓ Pro Bono & Paid'
}

export function LawyerProfileModal() {
  const modalOpen = useLawyerSearchStore((s) => s.modalOpen)
  const lawyer = useLawyerSearchStore((s) => s.getSelectedLawyer())
  const closeModal = useLawyerSearchStore((s) => s.closeModal)
  const showToast = useUiStore((s) => s.showToast)

  useEffect(() => {
    if (!modalOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen, closeModal])

  if (!modalOpen || !lawyer) return null

  return (
    <div
      className="modal-overlay open fixed inset-0 z-[500] flex items-center justify-center bg-black/82 p-5 backdrop-blur-sm"
      onClick={closeModal}
      role="presentation"
    >
      <div
        className="modal-box-in relative max-h-[88vh] w-full max-w-[640px] overflow-y-auto rounded-[22px] border border-white/10 bg-bg2 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lawyer-modal-name"
      >
        <div className="relative h-[100px] border-b border-white/[0.06] bg-gradient-to-br from-o/20 to-og/[0.08]">
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-3.5 top-3.5 flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[9px] border border-white/10 bg-white/[0.08] text-lg text-[var(--tm)] transition-all duration-150 hover:bg-white/[0.14] hover:text-[var(--t)]"
            aria-label="Close"
          >
            ×
          </button>
          <div className="absolute -bottom-7 left-7 flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-full border-[3px] border-bg2 bg-gradient-to-br from-og/25 to-o/10 font-serif text-[28px] font-semibold text-og">
            {lawyer.initials}
          </div>
        </div>

        <div className="px-7 pb-7 pt-[42px]">
          <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
            <h2 id="lawyer-modal-name" className="text-[22px] font-semibold text-[var(--t)]">
              {lawyer.name}
            </h2>
            {lawyer.verified && (
              <span className="inline-flex items-center gap-1 rounded-full border border-og/30 bg-og/10 px-2.5 py-[3px] text-[10.5px] font-semibold text-og">
                Verified
              </span>
            )}
          </div>
          <p className="mb-3.5 flex items-center gap-1.5 text-[13px] text-[var(--td)]">
            {lawyer.location} · {lawyer.experience} years experience
          </p>
          <div className="mb-5 flex flex-wrap gap-1.5">
            {lawyer.areas.map((a) => (
              <span key={a} className="rounded-full border border-og/20 bg-og/10 px-3 py-1 text-[11px] text-[rgba(212,133,58,0.85)]">
                {a}
              </span>
            ))}
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { n: `${lawyer.successRate}%`, l: 'Success Rate' },
              { n: String(lawyer.cases), l: 'Cases' },
              { n: `${lawyer.proBonoHours}h`, l: 'Pro Bono' },
              { n: String(lawyer.rating), l: 'Rating' },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3.5 text-center">
                <p className="mb-1 text-xl font-semibold leading-none text-[var(--t)]">{s.n}</p>
                <p className="text-[10px] uppercase tracking-[0.5px] text-[var(--td)]">{s.l}</p>
              </div>
            ))}
          </div>

          <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[1.2px] text-[rgba(245,240,234,0.28)]">About</p>
          <p className="mb-5 text-[13.5px] font-light leading-relaxed text-[var(--tm)]">{lawyer.bio}</p>

          <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[1.2px] text-[rgba(245,240,234,0.28)]">Languages</p>
          <div className="mb-5 flex flex-wrap gap-1.5">
            {lawyer.languages.map((lang) => (
              <span key={lang} className="rounded-full border border-white/[0.09] bg-white/[0.05] px-3 py-1 text-[11.5px] text-[var(--tm)]">
                {lang}
              </span>
            ))}
          </div>

          <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[1.2px] text-[rgba(245,240,234,0.28)]">Availability</p>
          <p className="mb-5 inline-flex rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 text-[10.5px] text-[var(--td)]">
            {availabilityLabel(lawyer.availability)}
          </p>

          <div className="flex gap-2.5 border-t border-white/[0.06] pt-2">
            <button
              type="button"
              onClick={() => showToast('Consultation request sent', 'ok')}
              className="btn-gradient-nav flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] border-none py-3.5 font-sans text-[13.5px] font-medium text-white transition-all duration-200 hover:-translate-y-px hover:opacity-92"
            >
              Request Consultation
            </button>
            {lawyer.profileHref ? (
              <Link
                href={lawyer.profileHref}
                onClick={closeModal}
                className="flex cursor-pointer items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] px-5 py-3.5 font-sans text-[13.5px] text-[var(--tm)] transition-all duration-200 hover:bg-white/[0.08] hover:text-[var(--t)]"
              >
                Full Profile
              </Link>
            ) : (
              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer rounded-[10px] border border-white/10 bg-white/[0.04] px-5 py-3.5 font-sans text-[13.5px] text-[var(--tm)] transition-all duration-200 hover:bg-white/[0.08] hover:text-[var(--t)]"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
