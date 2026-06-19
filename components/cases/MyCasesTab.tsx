// FILE: components/cases/MyCasesTab.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getMyCasesAction, closeCaseAction, acceptLawyerAction } from '@/actions/cases/client'
import { ProgressTracker } from '@/components/ui/ProgressTracker'
import { cn } from '@/lib/utils'
import { useCasesStore } from '@/stores/casesStore'
import { useUiStore } from '@/stores/uiStore'
import type { MyPostedCase } from '@/types'

import { CaseCardSkeleton } from '@/components/ui/CaseCardSkeleton'

export function MyCasesTab() {
  const myPostedCases = useCasesStore((s) => s.myPostedCases)
  const setMyPostedCases = useCasesStore((s) => s.setMyPostedCases)
  const [loading, setLoading] = useState(true)

  const openEditModal = useCasesStore((s) => s.openEditModal)
  const assignLawyerToCase = useCasesStore((s) => s.assignLawyerToCase)
  const openPostModal = useCasesStore((s) => s.openPostModal)
  const showToast = useUiStore((s) => s.showToast)

  async function fetchCases() {
    setLoading(true)
    const res = await getMyCasesAction()
    if (res.success && res.cases) {
      setMyPostedCases(res.cases)
    } else {
      showToast(res.error || 'Failed to fetch cases', 'err')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCases()
  }, [])

  async function handleCloseCase(caseId: string) {
    const res = await closeCaseAction(caseId)
    if (res.success) {
      showToast('Case closed and removed.', 'info')
      fetchCases()
    } else {
      showToast(res.error || 'Failed to close case', 'err')
    }
  }

  async function handleAssignLawyer(caseId: string, lawyerId: string, lawyerName: string) {
    showToast(`Assigning case to ${lawyerName}...`, 'info')
    const res = await acceptLawyerAction(caseId, lawyerId)
    if (res.success) {
      showToast(`Assigned case representation to ${lawyerName}!`, 'ok')
      fetchCases()
    } else {
      showToast(res.error || 'Failed to assign lawyer', 'err')
    }
  }

  return (
    <div className="px-[60px] pb-[60px] pt-8 max-md:px-6">
      <TabSectionHeader
        title="My Posted Cases"
        subtitle="Cases you've posted and their applicant status"
        count={`${myPostedCases.length} case${myPostedCases.length !== 1 ? 's' : ''}`}
      />

      {loading ? (
        <div className="flex max-w-[900px] flex-col gap-5">
          {[...Array(3)].map((_, i) => (
            <CaseCardSkeleton key={i} index={i} />
          ))}
        </div>
      ) : myPostedCases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-[var(--td)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m10 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-base font-medium text-[var(--t)]">No Cases Posted Yet</h3>
          <p className="mt-1 text-xs text-[var(--td)] max-w-xs leading-relaxed font-light">
            Post your legal case details to start receiving applications from verified professional lawyers.
          </p>
          <button
            type="button"
            onClick={openPostModal}
            className="mt-6 cursor-pointer rounded-lg bg-gradient-to-r from-og to-o px-4 py-2 font-sans text-xs font-semibold text-white transition-all duration-200 hover:opacity-90"
          >
            Post a New Case
          </button>
        </div>
      ) : (
        <div className="flex max-w-[900px] flex-col gap-5">
          {myPostedCases.map((item, index) => {
            const hasHired = !!item.assignedLawyerName

            return (
              <article
                key={item.id}
                className={cn(
                  'case-card-in overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-6 transition-colors duration-200 hover:border-white/[0.13]',
                  `case-card-in-${(index % 6) + 1}`
                )}
              >
                {/* Header block */}
                <div className="flex items-start justify-between gap-3 border-b border-white/[0.05] pb-5 max-md:flex-col">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-[16px] font-medium text-[var(--t)]">{item.title}</h3>
                      {hasHired && (
                        <span className="rounded-full bg-success/10 border border-success/20 px-2 py-0.5 text-[10px] font-semibold text-success">
                          Lawyer Assigned
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[11.5px] text-[var(--td)]">{item.category}</span>
                      <span className="text-[11.5px] text-[var(--td)]">·</span>
                      <span className="text-[11.5px] text-[var(--td)]">{item.location}</span>
                      <span className="text-[11.5px] text-[var(--td)]">·</span>
                      <span className="text-[11.5px] text-[var(--td)]">Posted {item.postedAgo}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(item.id)}
                      className="cursor-pointer rounded-lg border border-white/[0.09] bg-white/[0.04] px-3.5 py-1.5 font-sans text-[11.5px] text-[var(--tm)] transition-all duration-200 hover:bg-white/[0.08] hover:text-[var(--t)]"
                    >
                      Edit Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCloseCase(item.id)}
                      className="cursor-pointer rounded-lg border border-danger/20 bg-transparent px-3.5 py-1.5 font-sans text-[11.5px] text-[rgba(240,130,130,0.7)] transition-all duration-200 hover:bg-danger/10 hover:text-danger"
                    >
                      Close Case
                    </button>
                  </div>
                </div>

                {/* Body details */}
                <div className="py-4">
                  {item.description && (
                    <p className="mb-4 text-xs font-light leading-relaxed text-[var(--tm)]">
                      {item.description}
                    </p>
                  )}

                  <ProgressTracker currentStep={item.progressStep} />
                  
                  {/* Applicants Header Bar */}
                  <div className="mt-4.5 flex items-center gap-2.5">
                    <span className="text-[11px] text-[var(--td)]">Applicants:</span>
                    <div className="flex">
                      {item.applicantInitials.map((initial, i) => (
                        <span
                          key={i}
                          className={cn(
                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-card bg-og/20 text-[9px] font-semibold text-o2',
                            i > 0 && '-ml-1.5'
                          )}
                        >
                          {initial}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11.5px] text-[var(--tm)]">
                      {hasHired
                        ? `Represented by ${item.assignedLawyerName}`
                        : `${item.applicantCount} lawyer${item.applicantCount !== 1 ? 's' : ''} applied`}
                    </span>
                  </div>
                </div>

                {/* Hired representation card */}
                {hasHired && (
                  <Link
                    href={`/lawyers/${item.assignedLawyerId || 'priya-mehta'}`}
                    className="mt-3 flex items-center gap-3.5 rounded-xl border border-success/15 bg-success/5 p-4 no-underline group cursor-pointer hover:border-success/35 transition-colors"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M15 9A6 6 0 113 9a6 6 0 0112 0z" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M7 9l1.5 1.5L12 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.5px] text-success/70 font-semibold">Active Representative</div>
                      <div className="text-[13.5px] font-semibold text-[var(--t)] group-hover:text-success transition-colors">{item.assignedLawyerName}</div>
                    </div>
                  </Link>
                )}

                {/* Selection panel of applicants */}
                {!hasHired && item.applicantsDetail && item.applicantsDetail.length > 0 && (
                  <div className="mt-4 border-t border-white/[0.05] pt-4">
                    <h4 className="mb-3.5 text-xs font-semibold uppercase tracking-[0.8px] text-[rgba(245,240,234,0.45)]">
                      Select Representing Lawyer
                    </h4>
                    <div className="flex flex-col gap-3">
                      {item.applicantsDetail.map((lawyer) => (
                        <div
                          key={lawyer.id}
                          className="flex flex-col gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.07]"
                        >
                          <div className="flex items-start justify-between gap-3 max-sm:flex-col sm:items-center">
                            <Link
                              href={`/lawyers/${lawyer.id}`}
                              className="flex items-center gap-3 no-underline group cursor-pointer"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-og/15 text-[12px] font-bold text-o2 group-hover:bg-og/25 transition-colors">
                                {lawyer.initials}
                              </span>
                              <div>
                                <h5 className="text-[13.5px] font-semibold text-[var(--t)] group-hover:text-o2 transition-colors">{lawyer.name}</h5>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[11px] text-[#f0b840]">★ {lawyer.rating}</span>
                                  <span className="text-[11px] text-[var(--td)]">·</span>
                                  <span className="text-[11px] text-[var(--td)]">{lawyer.experience} yrs exp</span>
                                </div>
                              </div>
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleAssignLawyer(item.id, lawyer.id, lawyer.name)}
                              className="cursor-pointer whitespace-nowrap rounded-lg bg-og/10 border border-og/25 px-3.5 py-1.5 font-sans text-xs font-semibold text-o2 transition-all duration-200 hover:bg-og hover:text-white"
                            >
                              Hire &amp; Assign Case
                            </button>
                          </div>
                          <p className="text-xs font-light leading-relaxed text-[var(--tm)]">
                            {lawyer.bio}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

function TabSectionHeader({
  title,
  subtitle,
  count,
}: {
  title: string
  subtitle: string
  count: string
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--t)]">{title}</h2>
        <p className="mt-1 text-[13px] font-light text-[var(--td)]">{subtitle}</p>
      </div>
      <span className="rounded-full border border-white/[0.08] bg-white/[0.06] px-3 py-1 text-xs text-[var(--tm)]">
        {count}
      </span>
    </div>
  )
}
