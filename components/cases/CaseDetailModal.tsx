// FILE: components/cases/CaseDetailModal.tsx
// TYPE: Client Component

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError } from '@/components/auth/FieldError'
import { ProgressTracker } from '@/components/ui/ProgressTracker'
import { Modal } from '@/components/ui/Modal'
import { applyCaseSchema, type ApplyCaseFormData } from '@/lib/validations/case'
import { cn } from '@/lib/utils'
import { useCasesStore } from '@/stores/casesStore'
import { useUiStore } from '@/stores/uiStore'
import type { CaseStage } from '@/types'

const STAGE_PROGRESS: Record<CaseStage, number> = {
  initial: 0,
  investigation: 1,
  hearing: 2,
  trial: 3,
  verdict: 4,
}

const STAGE_CLASSES: Record<CaseStage, string> = {
  initial: 'border-[rgba(100,180,255,0.3)] bg-[rgba(100,180,255,0.07)] text-[rgba(120,180,255,0.85)]',
  investigation: 'border-[rgba(255,180,80,0.3)] bg-[rgba(255,170,50,0.07)] text-[rgba(255,190,100,0.85)]',
  hearing: 'border-[rgba(160,220,120,0.35)] bg-[rgba(120,200,80,0.07)] text-[rgba(160,220,120,0.9)]',
  trial: 'border-[rgba(240,100,100,0.35)] bg-[rgba(220,60,60,0.07)] text-[rgba(240,130,130,0.9)]',
  verdict: 'border-[rgba(160,220,120,0.35)] bg-[rgba(120,200,80,0.07)] text-[rgba(160,220,120,0.9)]',
}

export function CaseDetailModal() {
  const open = useCasesStore((s) => s.detailModalOpen)
  const viewRole = useCasesStore((s) => s.viewRole)
  const legalCase = useCasesStore((s) => s.getDetailCase())
  const closeDetailModal = useCasesStore((s) => s.closeDetailModal)
  const showToast = useUiStore((s) => s.showToast)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplyCaseFormData>({
    resolver: zodResolver(applyCaseSchema),
    defaultValues: { coverNote: '' },
  })

  if (!legalCase) return null

  function handleClose() {
    closeDetailModal()
    reset()
  }

  async function onApply() {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsSubmitting(false)
    showToast('Application submitted successfully!', 'ok')
    handleClose()
  }

  function onInvalid() {
    showToast('Please write a cover note before applying', 'err')
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      ariaLabel="Case details"
      boxClassName="max-w-[820px] max-h-[90vh]"
    >
      <div className="sticky top-0 z-[2] flex items-start justify-between gap-4 border-b border-white/[0.07] bg-bg2 px-7 pb-5 pt-6">
        <div>
          <div className="mb-2.5 flex flex-wrap gap-[7px]">
            <span className="rounded-full bg-og/15 px-2.5 py-1 text-[10.5px] font-semibold tracking-wide text-o2">
              {legalCase.category}
            </span>
            <span
              className={cn(
                'rounded-full border px-2.5 py-1 text-[10px] font-medium',
                STAGE_CLASSES[legalCase.stage]
              )}
            >
              {legalCase.stageLabel}
            </span>
          </div>
          <h2 className="text-[22px] font-semibold leading-snug text-[var(--t)]">{legalCase.title}</h2>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[9px] border border-white/10 bg-white/[0.05] text-lg leading-none text-[var(--tm)] transition-all duration-200 hover:bg-white/10 hover:text-[var(--t)]"
        >
          ×
        </button>
      </div>

      <div className="p-7">
        <DetailSection title="Overview">
          <p className="text-sm font-light leading-[1.75] text-[var(--tm)]">{legalCase.description}</p>
        </DetailSection>

        <DetailSection title="Case Details">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <DetailField label="Location" value={legalCase.location} />
            <DetailField label="Date of Incident" value={legalCase.incidentDate} />
            <DetailField label="Application Deadline" value={legalCase.deadline} />
            <DetailField label="Posted" value={legalCase.postedAgo} />
            <DetailField label="Posted By" value={legalCase.poster.name} />
            <DetailField label="Poster Role" value={legalCase.poster.role} />
            <DetailField label="Opposing Party" value={legalCase.opposingParty} blurred />
          </div>
          <div className="mt-3.5 flex items-center gap-3 rounded-[10px] border border-og/20 bg-og/[0.07] px-[18px] py-3.5 text-[12.5px] text-[rgba(245,240,234,0.55)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-60" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Contact details are shared only after your application is accepted.
          </div>
        </DetailSection>

        <DetailSection title="Case Progress">
          <ProgressTracker currentStep={STAGE_PROGRESS[legalCase.stage]} />
        </DetailSection>

        {viewRole === 'lawyer' && (
          <div className="mt-1 rounded-[14px] border border-white/[0.07] bg-white/[0.03] p-5">
            <h3 className="mb-1 text-[13px] font-medium text-[var(--t)]">Apply for this case</h3>
            <p className="mb-3.5 text-xs text-[var(--td)]">
              Write a brief cover note explaining why you&apos;re a good fit.
            </p>
            <form onSubmit={handleSubmit(onApply, onInvalid)} noValidate>
              <textarea
                placeholder="Introduce yourself and explain your relevant experience..."
                className={cn(
                  'login-input mb-2 w-full min-h-[100px] resize-y rounded-[10px] border border-white/[0.09] px-3.5 py-[11px] font-sans text-[13.5px] leading-relaxed text-[var(--t)] outline-none transition-all placeholder:text-[rgba(245,240,234,0.22)]',
                  errors.coverNote && 'border-danger/45'
                )}
                {...register('coverNote')}
              />
              <FieldError message={errors.coverNote?.message} show={!!errors.coverNote} />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gradient-primary mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none py-3.5 font-sans text-sm font-medium text-white transition-all duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? <span className="btn-spinner" /> : null}
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        )}
      </div>
    </Modal>
  )
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h3 className="mb-3.5 border-b border-white/[0.05] pb-2.5 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
        {title}
      </h3>
      {children}
    </div>
  )
}

function DetailField({
  label,
  value,
  blurred,
}: {
  label: string
  value: string
  blurred?: boolean
}) {
  return (
    <div>
      <p className="mb-1 text-[10.5px] tracking-wide text-[rgba(245,240,234,0.3)]">{label}</p>
      <p
        className={cn(
          'text-[13.5px] text-[var(--t)]',
          blurred &&
          'inline-block select-none rounded bg-white/[0.04] px-1.5 py-0.5 text-[rgba(245,240,234,0.5)] blur-[5px]'
        )}
      >
        {value}
      </p>
    </div>
  )
}

