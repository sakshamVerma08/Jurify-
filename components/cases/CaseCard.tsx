// FILE: components/cases/CaseCard.tsx
// TYPE: Client Component

'use client'

import { BookmarkButton } from '@/components/cases/BookmarkButton'
import { CaseActionButtons } from '@/components/cases/CaseActionButtons'
import { cn } from '@/lib/utils'
import { useCasesStore } from '@/stores/casesStore'
import type { CaseStage, CaseUrgency, LegalCase, UserRole } from '@/types'

const STAGE_CLASSES: Record<CaseStage, string> = {
  initial: 'border-[rgba(100,180,255,0.3)] bg-[rgba(100,180,255,0.07)] text-[rgba(120,180,255,0.85)]',
  investigation: 'border-[rgba(255,180,80,0.3)] bg-[rgba(255,170,50,0.07)] text-[rgba(255,190,100,0.85)]',
  hearing: 'border-[rgba(160,220,120,0.35)] bg-[rgba(120,200,80,0.07)] text-[rgba(160,220,120,0.9)]',
  trial: 'border-[rgba(240,100,100,0.35)] bg-[rgba(220,60,60,0.07)] text-[rgba(240,130,130,0.9)]',
  verdict: 'border-[rgba(160,220,120,0.35)] bg-[rgba(120,200,80,0.07)] text-[rgba(160,220,120,0.9)]',
}

const URGENCY_CLASSES: Record<CaseUrgency, string> = {
  high: 'bg-danger shadow-[0_0_8px_rgba(240,100,100,0.5)]',
  medium: 'bg-o2 shadow-[0_0_8px_rgba(232,164,74,0.4)]',
  low: 'bg-success shadow-[0_0_8px_rgba(74,222,128,0.35)]',
}

const ANIMATION_CLASSES = [
  'case-card-in-1',
  'case-card-in-2',
  'case-card-in-3',
  'case-card-in-4',
  'case-card-in-5',
  'case-card-in-6',
]

interface CaseCardProps {
  legalCase: LegalCase
  viewRole: UserRole
  index?: number
}

export function CaseCard({ legalCase, viewRole, index = 0 }: CaseCardProps) {
  const openDetailModal = useCasesStore((s) => s.openDetailModal)
  const animClass = ANIMATION_CLASSES[index % ANIMATION_CLASSES.length]

  const handleOpen = () => openDetailModal(legalCase.id)

  return (
    <article
      className={cn(
        'case-card-accent case-card-in relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-[22px_24px] transition-all duration-200 hover:-translate-y-0.5 hover:border-og/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]',
        animClass
      )}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleOpen()
      }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-[7px]">
          <span className="rounded-full bg-og/15 px-2.5 py-1 text-[10.5px] font-semibold tracking-wide text-o2">
            {legalCase.category}
          </span>
          {legalCase.isProBono && (
            <span className="rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-success">
              Pro Bono
            </span>
          )}
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 text-[10px] font-medium',
              STAGE_CLASSES[legalCase.stage]
            )}
          >
            {legalCase.stageLabel}
          </span>
          <span
            className={cn('mt-0.5 h-[7px] w-[7px] shrink-0 rounded-full', URGENCY_CLASSES[legalCase.urgency])}
            title={`${legalCase.urgency} urgency`}
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <BookmarkButton caseId={legalCase.id} />
        </div>
      </div>

      <h3 className="mb-2 text-base font-medium leading-snug text-[var(--t)]">{legalCase.title}</h3>
      <p className="mb-3.5 line-clamp-2 text-[13px] font-light leading-relaxed text-[var(--tm)]">
        {legalCase.description}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-5">
        <MetaItem icon="location" label={legalCase.location} />
        <MetaItem icon="calendar" label={legalCase.incidentDate} />
        <MetaItem icon="clock" label={`Deadline: ${legalCase.deadline}`} />
        <MetaItem icon="time" label={legalCase.postedAgo} />
      </div>

      <div className="mb-4 h-px bg-white/[0.05]" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-og/30 bg-og/15 text-xs font-semibold text-o2">
            {legalCase.poster.initials}
          </div>
          <div>
            <p className="text-[12.5px] font-medium text-[var(--t)]">{legalCase.poster.name}</p>
            <p className="text-[11px] text-[var(--td)]">{legalCase.poster.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-[7px] text-[11.5px] text-[rgba(245,240,234,0.3)]">
          <span>Opposing:</span>
          <span className="select-none rounded bg-white/[0.05] px-2 py-0.5 text-xs text-[rgba(245,240,234,0.5)] blur-[4px]">
            {legalCase.opposingParty}
          </span>
        </div>
        <CaseActionButtons caseId={legalCase.id} viewRole={viewRole} />
      </div>
    </article>
  )
}

function MetaItem({ icon, label }: { icon: 'location' | 'calendar' | 'clock' | 'time'; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[11.5px] text-[rgba(245,240,234,0.35)]">
      <MetaIcon type={icon} />
      <span>{label}</span>
    </span>
  )
}

function MetaIcon({ type }: { type: 'location' | 'calendar' | 'clock' | 'time' }) {
  const paths: Record<string, string> = {
    location: 'M7 1.5a4 4 0 0 0-4 4c0 3 4 7.5 4 7.5s4-4.5 4-7.5a4 4 0 0 0-4-4zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z',
    calendar: 'M3 2h10v10H3V2zm1 1v2h8V3H4zm0 3v5h8V6H4z',
    clock: 'M7 1.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm0 1a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm.5 2v2.5l2 1.2-.5.8-2.3-1.4V4.5h.8z',
    time: 'M7 1.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm0 1a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z',
  }
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" className="shrink-0 opacity-55" aria-hidden="true">
      <path d={paths[type]} />
    </svg>
  )
}
