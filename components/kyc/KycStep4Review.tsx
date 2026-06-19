// FILE: components/kyc/KycStep4Review.tsx
// TYPE: Client Component

'use client'

import { useRef, useEffect } from 'react'
import { KycStepHeader } from '@/components/kyc/KycStepHeader'
import { KycStepNav } from '@/components/kyc/KycStepNav'
import { KYC_APPLICATION_ID } from '@/lib/data/kyc'
import { useKycStore } from '@/stores/kycStore'
import { useUiStore } from '@/stores/uiStore'
import { submitKycApplication } from '@/actions/kyc/submit'

export function KycStep4Review() {
  const step1 = useKycStore((s) => s.step1)
  const step3 = useKycStore((s) => s.step3)
  const documents = useKycStore((s) => s.documents)
  const photo = useKycStore((s) => s.photo)
  const setStep = useKycStore((s) => s.setStep)
  const prevStep = useKycStore((s) => s.prevStep)
  const setShowSuccess = useKycStore((s) => s.setShowSuccess)
  const setReferenceNumber = useKycStore((s) => s.setReferenceNumber)
  const isSubmitting = useKycStore((s) => s.isSubmitting)
  const setIsSubmitting = useKycStore((s) => s.setIsSubmitting)
  const showToast = useUiStore((s) => s.showToast)
  const idempotencyKeyRef = useRef<string>('')

  useEffect(() => {
    idempotencyKeyRef.current = crypto.randomUUID()
  }, [])

  async function handleSubmit() {
    setIsSubmitting(true)
    
    const res = await submitKycApplication({
      step1,
      step3,
      documents,
      photo,
      idempotencyKey: idempotencyKeyRef.current
    })

    setIsSubmitting(false)

    if (res.success) {
      if (res.referenceNumber) {
        setReferenceNumber(res.referenceNumber)
      }
      setShowSuccess(true)
      showToast('Application submitted successfully', 'ok')
    } else {
      showToast(res.error || 'Failed to submit application', 'err')
    }
  }

  const location = [step3.city, step3.state, step3.country].filter(Boolean).join(', ')

  return (
    <div className="kyc-step-panel-in">
      <KycStepHeader
        step={4}
        title={
          <>
            Review <em className="italic text-o2">&amp; Submit</em>
          </>
        }
        subtitle="Everything looks good? Review your details below and submit your application. The Jurify team typically verifies within 2–3 business days."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SummaryCard
          title="Professional Details"
          onEdit={() => setStep(1)}
          icon="details"
        >
          <SummaryField label="Bar Enrollment No." value={step1.enrollmentNumber || '—'} />
          <SummaryField label="Bar Council State" value={step1.barCouncilState || '—'} />
          <SummaryField
            label="Degree & Experience"
            value={[step1.degree, step1.experience].filter(Boolean).join(' · ') || '—'}
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-[10.5px] tracking-[0.2px] text-[rgba(245,240,234,0.3)]">Practice Areas</span>
            <div className="mt-0.5 flex flex-wrap gap-1.5">
              {(step1.practiceAreas ?? []).length > 0 ? (
                step1.practiceAreas!.map((a) => (
                  <span key={a} className="rounded-full border border-og/20 bg-og/10 px-2.5 py-0.5 text-[10px] text-o2">
                    {a}
                  </span>
                ))
              ) : (
                <span className="text-[13px] text-[var(--tm)]">—</span>
              )}
            </div>
          </div>
        </SummaryCard>

        <SummaryCard title="Identity Documents" onEdit={() => setStep(2)} icon="docs">
          <DocRow label="Aadhaar Card" uploaded={!!documents.aadhaar} />
          <DocRow label="PAN Card" uploaded={!!documents.pan} />
          <DocRow label="Bar Council Certificate" uploaded={!!documents.bar} />
        </SummaryCard>

        <SummaryCard title="Profile Setup" onEdit={() => setStep(3)} icon="profile" className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <SummaryField label="Profile Photo" value={photo ? 'Uploaded ✓' : 'Not uploaded'} />
            <SummaryField label="Location" value={location || '—'} />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10.5px] tracking-[0.2px] text-[rgba(245,240,234,0.3)]">Languages</span>
              <div className="mt-0.5 flex flex-wrap gap-1.5">
                {(step3.languages ?? []).map((l) => (
                  <span key={l} className="rounded-full border border-og/20 bg-og/10 px-2.5 py-0.5 text-[10px] text-o2">
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <SummaryField
              label="Bio"
              value={step3.bio ? (step3.bio.length > 80 ? `${step3.bio.slice(0, 80)}…` : step3.bio) : '—'}
              small
            />
          </div>
        </SummaryCard>
      </div>

      <div className="mb-6 rounded-[14px] border border-og/20 bg-og/[0.06] px-[22px] py-5">
        <p className="mb-3.5 flex items-center gap-2 text-[13px] font-medium text-[var(--t)]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6" stroke="#D4853A" strokeWidth="1.2" />
            <path d="M8 5v3l2 2" stroke="#D4853A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          What happens after you submit?
        </p>
        <div className="flex flex-col gap-2.5">
          {[
            { n: '1', text: 'Application received & assigned to a Jurify verifier', time: 'Immediate — automated confirmation email sent' },
            { n: '2', text: 'Document review and bar council cross-verification', time: 'Within 1 business day' },
            { n: '3', text: 'Profile approved — Verified badge activated on your profile', time: '2–3 business days total' },
          ].map((s) => (
            <div key={s.n} className="flex items-start gap-3 text-[12.5px] text-[var(--tm)]">
              <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-og/30 bg-og/15 text-[9.5px] font-semibold text-o2">
                {s.n}
              </span>
              <div>
                {s.text}
                <p className="mt-0.5 text-[10.5px] text-[rgba(245,240,234,0.3)]">{s.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] px-[18px] py-4 text-[12.5px] leading-relaxed text-[rgba(245,240,234,0.38)]">
        By submitting this application, I confirm that all information provided is accurate and truthful. I understand that providing false information may result in permanent removal from the Jurify platform and may be reported to the relevant Bar Council.
      </p>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="btn-gradient-nav relative flex w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-xl border-none py-[18px] font-sans text-[15px] font-medium text-white shadow-[0_6px_28px_rgba(200,98,42,0.35)] transition-all duration-200 hover:-translate-y-px hover:opacity-93 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {isSubmitting ? 'Submitting…' : 'Submit for Verification'}
      </button>

      <KycStepNav step={4} onBack={prevStep} hideNext />

      <p className="mt-4 text-center text-[11px] text-[rgba(245,240,234,0.25)]">
        Reference: {KYC_APPLICATION_ID}
      </p>
    </div>
  )
}

function SummaryCard({
  title,
  onEdit,
  icon,
  children,
  className,
}: {
  title: string
  onEdit: () => void
  icon: 'details' | 'docs' | 'profile'
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-[14px] border border-white/[0.07] bg-white/[0.03] px-[22px] py-5 transition-colors duration-200 hover:border-white/[0.12] ${className ?? ''}`}>
      <div className="mb-3.5 flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-og/20 bg-og/10">
          <SummaryIcon type={icon} />
        </div>
        <span className="text-[12.5px] font-medium text-[var(--t)]">{title}</span>
        <button
          type="button"
          onClick={onEdit}
          className="ml-auto cursor-pointer border-none bg-transparent font-sans text-[11px] text-o2 hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

function SummaryField({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10.5px] tracking-[0.2px] text-[rgba(245,240,234,0.3)]">{label}</span>
      <span className={small ? 'text-xs leading-relaxed text-[var(--tm)]' : 'text-[13px] text-[var(--tm)]'}>{value}</span>
    </div>
  )
}

function DocRow({ label, uploaded }: { label: string; uploaded: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--tm)]">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${uploaded ? 'bg-success' : 'bg-danger/60'}`} />
      {label} — {uploaded ? 'Uploaded' : 'Missing'}
    </div>
  )
}

function SummaryIcon({ type }: { type: 'details' | 'docs' | 'profile' }) {
  if (type === 'profile') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="6" r="3" stroke="#D4853A" strokeWidth="1.2" />
        <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="#D4853A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'docs') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="1" width="12" height="14" rx="2" stroke="#D4853A" strokeWidth="1.2" />
        <line x1="5" y1="6" x2="11" y2="6" stroke="#D4853A" strokeWidth="1" />
        <line x1="5" y1="9" x2="11" y2="9" stroke="#D4853A" strokeWidth="1" />
        <line x1="5" y1="12" x2="8" y2="12" stroke="#D4853A" strokeWidth="1" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="#D4853A" strokeWidth="1.2" />
      <line x1="5" y1="6" x2="11" y2="6" stroke="#D4853A" strokeWidth="1" />
      <line x1="5" y1="9" x2="9" y2="9" stroke="#D4853A" strokeWidth="1" />
    </svg>
  )
}
