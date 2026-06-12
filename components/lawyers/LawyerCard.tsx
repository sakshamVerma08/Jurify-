// FILE: components/lawyers/LawyerCard.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { LawyerListing, LawyerSearchRole, LawyerSearchViewMode } from '@/types'
import { useLawyerSearchStore } from '@/stores/lawyerSearchStore'
import { useUiStore } from '@/stores/uiStore'

interface LawyerCardProps {
  lawyer: LawyerListing
  index: number
  viewRole: LawyerSearchRole
  viewMode: LawyerSearchViewMode
}

export function LawyerCard({ lawyer, index, viewRole, viewMode }: LawyerCardProps) {
  const openModal = useLawyerSearchStore((s) => s.openModal)
  const sendConnect = useLawyerSearchStore((s) => s.sendConnect)
  const showToast = useUiStore((s) => s.showToast)

  const areaDisplay = lawyer.areas.slice(0, 2)
  const areaMore = lawyer.areas.length - 2
  const isList = viewMode === 'list'

  function handleConnect() {
    sendConnect(lawyer.id)
    showToast(`Request sent to ${lawyer.name}`, 'info')
  }

  function handleRefer(e: React.MouseEvent) {
    e.stopPropagation()
    showToast(`Case referral opened for ${lawyer.name}`, 'info')
  }

  return (
    <article
      className={cn(
        'lawyer-card-in group relative overflow-hidden rounded-[18px] border border-white/[0.07] bg-card p-[22px] transition-all duration-200 hover:-translate-y-0.5 hover:border-og/25 hover:shadow-[0_14px_44px_rgba(0,0,0,0.35)]',
        isList && 'p-[18px_22px]'
      )}
      style={{ animationDelay: `${index * 0.055}s` }}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-t-[18px] bg-transparent transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-og group-hover:to-o2" />

      <div className={cn('mb-3.5 flex items-start gap-3.5', isList && 'mb-2.5')}>
        <div className="relative shrink-0">
          <div
            className={cn(
              'flex items-center justify-center overflow-hidden rounded-full border-2 border-og/30 bg-gradient-to-br from-og/20 to-o/10 font-serif font-semibold text-og',
              isList ? 'h-12 w-12 text-lg' : 'h-14 w-14 text-[22px]'
            )}
          >
            {lawyer.initials}
          </div>
          {lawyer.verified && (
            <span className="absolute -bottom-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-card bg-gradient-to-br from-og to-[#b8521e]">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1.5 4l2 2L6.5 2" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-[var(--t)]">{lawyer.name}</p>
          <p className="mb-1.5 flex items-center gap-1 text-[11.5px] text-[var(--td)]">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="shrink-0 opacity-50">
              <path d="M5.5 1C3.8 1 2.5 2.3 2.5 4c0 2.5 3 5 3 5s3-2.5 3-5C8.5 2.3 7.2 1 5.5 1z" stroke="currentColor" strokeWidth=".9" strokeLinejoin="round" />
            </svg>
            {lawyer.location}
          </p>
          <div className="flex flex-wrap gap-1">
            {areaDisplay.map((a) => (
              <span key={a} className="rounded-full border border-og/20 bg-og/10 px-2 py-0.5 text-[10px] font-medium text-[rgba(212,133,58,0.85)]">
                {a}
              </span>
            ))}
            {areaMore > 0 && (
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] text-[var(--td)]">
                +{areaMore}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={cn('my-3.5 h-px bg-white/[0.05]', isList && 'my-2.5')} />

      <div
        className={cn(
          'mb-3.5 grid grid-cols-3 gap-2',
          isList && 'w-auto justify-start gap-5'
        )}
      >
        {[
          { n: `${lawyer.successRate}%`, l: 'Success' },
          { n: String(lawyer.cases), l: 'Cases' },
          { n: `${lawyer.experience}y`, l: 'Exp.' },
        ].map((s) => (
          <div key={s.l} className={cn('text-center', isList && 'text-left')}>
            <p className={cn('font-semibold leading-none text-[var(--t)]', isList ? 'text-[15px]' : 'text-[17px]')}>
              {s.n}
            </p>
            <p className="mt-0.5 text-[9.5px] uppercase tracking-[0.5px] text-[var(--td)]">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="mb-3.5 flex flex-wrap items-center gap-[7px]">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 text-[10.5px] text-[var(--td)]">
          {lawyer.languages.slice(0, 2).join(', ')}
        </span>
        {lawyer.proBonoHours >= 100 && (
          <span className="inline-flex items-center gap-1 rounded-full border border-success/20 bg-success/[0.08] px-2.5 py-0.5 text-[10px] font-medium text-success/85">
            {lawyer.proBonoHours}h Pro Bono
          </span>
        )}
      </div>

      <div className={cn('flex gap-2', isList && 'justify-end')}>
        {viewRole === 'client' ? (
          <>
            <Link
              href={`/lawyers/${lawyer.id}`}
              className="btn-gradient-nav flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[9px] border-none py-2.5 font-sans text-[12.5px] font-medium text-white transition-all duration-200 hover:-translate-y-px hover:opacity-90"
            >
              View Profile
            </Link>
            <Link
              href="/messages"
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[9px] border border-white/[0.12] bg-white/[0.05] py-2.5 font-sans text-[12.5px] font-medium text-[var(--t)] transition-all duration-200 hover:border-white/[0.22] hover:bg-white/[0.09]"
            >
              Message
            </Link>
          </>
        ) : (
          <ConnectButton status={lawyer.connectStatus} onConnect={handleConnect} />
        )}
        {viewRole === 'lawyer' && (
          <button
            type="button"
            onClick={handleRefer}
            title="Refer Case"
            className="group/refer relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[9px] border border-white/[0.09] bg-white/[0.04] text-[var(--td)] transition-all duration-200 hover:border-og/30 hover:bg-og/10 hover:text-og"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 7h5M8 5l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 3h3M2 7H4M2 11h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".5" />
            </svg>
            <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[7px] border border-white/10 bg-[rgba(20,19,16,0.98)] px-2.5 py-[5px] text-[11px] text-[var(--tm)] opacity-0 transition-opacity duration-150 group-hover/refer:opacity-100">
              Refer Case
            </span>
          </button>
        )}
      </div>
    </article>
  )
}

function ConnectButton({
  status,
  onConnect,
}: {
  status: LawyerListing['connectStatus']
  onConnect: () => void
}) {
  if (status === 'connected') {
    return (
      <button
        type="button"
        disabled
        className="flex flex-1 cursor-default items-center justify-center gap-1.5 rounded-[9px] border border-success/25 bg-success/[0.06] py-2.5 font-sans text-[12.5px] font-medium text-success"
      >
        Connected
      </button>
    )
  }
  if (status === 'pending') {
    return (
      <button
        type="button"
        disabled
        className="flex flex-1 cursor-default items-center justify-center gap-1.5 rounded-[9px] border border-og/25 bg-og/[0.07] py-2.5 font-sans text-[12.5px] font-medium text-o2/80"
      >
        Pending…
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={onConnect}
      className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[9px] border border-white/[0.12] bg-white/[0.05] py-2.5 font-sans text-[12.5px] font-medium text-[var(--t)] transition-all duration-200 hover:border-white/[0.22] hover:bg-white/[0.09]"
    >
      Connect
    </button>
  )
}
