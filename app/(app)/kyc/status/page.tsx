'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'
import { getKycStatus } from '@/actions/kyc/getStatus'

interface KycApp {
  name: string
  nameEm: string
  meta: string
  overall: 'pending' | 'approved' | 'rejected' | 'review'
  overallTxt: string
  enrollment: string
  bar: string
  degree: string
  submitted: string
  attempt: string
  eta: string
  etaSub: string
  etaLabel: string
  etaPct: string
  showEta: boolean
  showRejection: boolean
  rejectionReason?: string
  docs: {
    aadhaar: 'ok' | 'fail' | 'checking'
    pan: 'ok' | 'fail' | 'checking'
    barCert: 'ok' | 'fail' | 'checking'
    degree: 'ok' | 'fail' | 'checking'
    photo: 'ok' | 'fail' | 'checking'
  }
  steps: Array<{
    name: string
    desc: string
    status: 'done' | 'active' | 'pending' | 'rejected'
    time: string
    badge: string
    docs: Array<{ name: string; status: 'ok' | 'fail' | 'checking' }> | null
  }>
  timeline: Array<{
    dot: 'gold' | 'green' | 'blue' | 'grey' | 'err'
    action: string
    meta: string
  }>
  primaryActionTxt: string
}

const stepIcons = {
  done: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-success">
      <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  active: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="3" fill="#D4853A" />
    </svg>
  ),
  pending: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="2.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
    </svg>
  ),
  rejected: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-danger">
      <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const badgeMap: Record<string, string> = {
  'Completed': 'done',
  'Passed': 'done',
  'Confirmed': 'done',
  'Approved': 'done',
  'In Progress': 'active',
  'Awaiting': 'wait',
  'Awaiting Registry': 'active',
  'Issue Found': 'active',
  'Blocked': 'rejected',
  'Rejected': 'rejected'
}

const docIcons = {
  ok: (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="4" stroke="#4ade80" strokeWidth="1" />
      <path d="M2.5 5l1.8 1.8L7.5 3" stroke="#4ade80" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  fail: (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="4" stroke="#f06464" strokeWidth="1" />
      <path d="M3 3l4 4M7 3l-4 4" stroke="#f06464" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  checking: (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="4" stroke="#f0b840" strokeWidth="1" />
      <line x1="5" y1="3" x2="5" y2="5.5" stroke="#f0b840" strokeWidth="1" strokeLinecap="round" />
      <circle cx="5" cy="7" r=".5" fill="#f0b840" />
    </svg>
  )
}

const colors: Record<string, string> = {
  green: 'var(--success)',
  gold: 'var(--og)',
  blue: 'rgba(100,150,255,0.9)',
  grey: 'rgba(255,255,255,0.15)',
  err: 'var(--danger)'
}

function mapBackendToFrontend(backendData: any): KycApp {
  const { lawyer, status, submittedAt, documents, statusEvents } = backendData
  
  const overallMap: Record<string, KycApp['overall']> = {
    'PENDING': 'pending',
    'APPROVED': 'approved',
    'REJECTED': 'rejected',
  }
  
  const overallTxtMap: Record<string, string> = {
    'PENDING': 'Under Review',
    'APPROVED': 'Verified & Approved',
    'REJECTED': 'Not Approved',
  }

  return {
    name: `Adv. ${lawyer.firstName} ${lawyer.lastName}`,
    nameEm: `${lawyer.firstName} <em>${lawyer.lastName}</em>`,
    meta: `Submitted ${new Date(submittedAt).toLocaleDateString()} · ${lawyer.barCouncilState || 'Bar Council'}`,
    overall: overallMap[status] || 'review',
    overallTxt: overallTxtMap[status] || 'Bar Council Check',
    enrollment: lawyer.enrollmentNo || '—',
    bar: lawyer.barCouncilState || '—',
    degree: lawyer.degree || '—',
    submitted: new Date(submittedAt).toLocaleDateString(),
    attempt: '#1',
    eta: status === 'APPROVED' ? 'Verification complete' : '1–2 business days remaining',
    etaSub: status === 'APPROVED' ? 'Gold badge active on your profile' : 'Processing within SLA',
    etaLabel: status === 'APPROVED' ? 'Status' : 'Estimated Completion',
    etaPct: status === 'APPROVED' ? '100' : '20',
    showEta: status !== 'REJECTED',
    showRejection: status === 'REJECTED',
    docs: {
      aadhaar: documents.find((d: any) => d.type === 'AADHAAR')?.status === 'APPROVED' ? 'ok' : 'checking',
      pan: documents.find((d: any) => d.type === 'PAN')?.status === 'APPROVED' ? 'ok' : 'checking',
      barCert: documents.find((d: any) => d.type === 'BAR_CERTIFICATE')?.status === 'APPROVED' ? 'ok' : 'checking',
      degree: 'ok',
      photo: documents.find((d: any) => d.type === 'PROFILE_PHOTO')?.status === 'APPROVED' ? 'ok' : 'checking',
    },
    steps: [
      {
        id: 'FORM_SUBMITTED',
        label: 'Application Form Submitted',
        desc: 'We have received your KYC application details.'
      },
      {
        id: 'DOCUMENTS_RECEIVED',
        label: 'Documents Received',
        desc: 'Verification documents received and queued for screening.'
      },
      {
        id: 'INITIAL_SCREENING',
        label: 'Identity Verification',
        desc: 'Screening of Aadhaar, PAN, and profile photo.'
      },
      {
        id: 'BAR_COUNCIL_VERIFICATION',
        label: 'Bar Council Check',
        desc: 'Verifying your credentials with the respective state Bar Council.'
      },
      {
        id: 'FINAL_APPROVAL',
        label: 'Final Review',
        desc: 'Final manual review and approval by the Jurify team.'
      }
    ].map(stepDef => {
      const evt = statusEvents.find((e: any) => e.step === stepDef.id)
      let currentStatus: 'done' | 'active' | 'pending' | 'rejected' = 'pending'
      let badge = 'Awaiting'
      let time = ''
      
      if (evt) {
        if (evt.status === 'APPROVED') {
          currentStatus = 'done'
          badge = 'Completed'
        } else if (evt.status === 'REJECTED') {
          currentStatus = 'rejected'
          badge = 'Rejected'
        } else {
          currentStatus = 'active'
          badge = 'In Progress'
        }
        time = new Date(evt.createdAt).toLocaleString()
      }

      return {
        name: stepDef.label,
        desc: evt?.note || stepDef.desc,
        status: currentStatus,
        time: time,
        badge: badge,
        docs: null
      }
    }),
    timeline: statusEvents.map((evt: any) => ({
      dot: evt.status === 'APPROVED' ? 'green' : evt.status === 'REJECTED' ? 'err' : 'gold',
      action: evt.note,
      meta: new Date(evt.createdAt).toLocaleString()
    })),
    primaryActionTxt: status === 'APPROVED' ? 'View Verified Profile' : 'Get Status Notifications'
  }
}

export default function KycStatusPage() {
  const [refInput, setRefInput] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeRef, setActiveRef] = useState<string | null>(null)
  const [activeData, setActiveData] = useState<KycApp | null>(null)

  // Toast notifications state
  const [toast, setToast] = useState({ show: false, msg: 'Done', type: 'info' })
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null)

  const showToast = (msg: string, type = 'info') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ show: true, msg, type })
    toastTimerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, show: false }))
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  const fillRef = async (ref: string) => {
    setRefInput(ref)
    setErrorMsg('')
  }

  const trackApp = async () => {
    const val = refInput.trim().toUpperCase()
    if (!val) {
      showErr('Please enter your reference number.')
      return
    }
    if (!/^JRF-\d{4}-[A-Z]{2}-\d{4,6}$/.test(val)) {
      showErr('Invalid format. Reference numbers follow the pattern JRF-YYYY-ST-XXXXX.')
      return
    }

    setErrorMsg('')
    setLoading(true)

    const res = await getKycStatus(val)
    
    setLoading(false)

    if (res.success && res.data) {
      setActiveData(mapBackendToFrontend(res.data))
      setActiveRef(val)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      showErr(res.error || 'Reference number not found. Please check the number from your confirmation email.')
    }
  }

  const showErr = (msg: string) => {
    setErrorMsg(msg)
    const inputEl = document.getElementById('refInput')
    if (inputEl) {
      inputEl.classList.add('error')
      setTimeout(() => inputEl.classList.remove('error'), 2000)
    }
  }

  const resetSearch = () => {
    setActiveRef(null)
    setActiveData(null)
    setRefInput('')
    setErrorMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function docStatus(status: 'ok' | 'fail' | 'checking') {
    if (status === 'ok') {
      return (
        <span className="flex items-center gap-1 text-success">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1" />
            <path d="M3 5.5l1.8 1.8L8 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Verified
        </span>
      )
    }
    if (status === 'fail') {
      return (
        <span className="flex items-center gap-1 text-danger">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1" />
            <path d="M3.5 3.5l4 4M7.5 3.5l-4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          Mismatch
        </span>
      )
    }
    return (
      <span className="flex items-center gap-1 text-warn">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1" />
          <line x1="5.5" y1="3.5" x2="5.5" y2="6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <circle cx="5.5" cy="7.5" r=".55" fill="currentColor" />
        </svg>
        Under Review
      </span>
    )
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden text-[var(--t)] font-sans bg-[#080808]">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-[8%] top-[30%] w-[55%] h-[60%] rounded-full bg-o/7 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-[8%] top-[15%] w-[40%] h-[45%] rounded-full bg-og/4.5 blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-[15%] top-[80%] w-[35%] h-[40%] rounded-full bg-o/3.5 blur-[120px] translate-x-1/2 -translate-y-1/2" />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        /* NAV BACK BUTTON & SUPPORT */
        .nav-back, .nav-support {
          transition: all .18s;
        }
        .nav-back:hover {
          color: var(--t);
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.14);
        }
        .nav-support:hover {
          background: rgba(212,133,58,0.14);
          border-color: rgba(212,133,58,0.35);
        }

        /* LOOKUP SECTION */
        .lookup-icon {
          box-shadow: 0 0 32px rgba(212,133,58,0.12);
        }
        .lookup-card {
          background: rgba(14,13,11,0.92);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .ref-input {
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .ref-input:focus {
          border-color: rgba(212,133,58,0.5);
          box-shadow: 0 0 0 3px rgba(212,133,58,0.1);
          background: rgba(255,255,255,0.06);
        }
        .ref-input.error {
          border-color: rgba(240,100,100,0.5);
          box-shadow: 0 0 0 3px rgba(240,100,100,0.08);
        }
        .track-btn {
          background: linear-gradient(135deg, var(--og) 0%, #b8521e 100%);
          box-shadow: 0 5px 20px rgba(200,98,42,0.3);
          transition: all .2s;
          position: relative;
          overflow: hidden;
        }
        .track-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.09), transparent);
        }
        .track-btn:hover:not(:disabled) {
          opacity: .93;
          transform: translateY(-1px);
          box-shadow: 0 10px 30px rgba(200,98,42,0.42);
        }
        .track-btn:disabled {
          opacity: .35;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .sref {
          transition: all .18s;
        }
        .sref:hover {
          background: rgba(212,133,58,0.16);
          color: var(--o2);
        }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp .65s ease both;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .btn-spin {
          animation: spin .7s linear infinite;
        }

        /* STEPPER STYLES */
        .step-circle.done {
          background: rgba(74,222,128,0.15);
          border: 2px solid rgba(74,222,128,0.5);
        }
        .step-circle.active {
          background: rgba(212,133,58,0.18);
          border: 2px solid rgba(212,133,58,0.55);
          box-shadow: 0 0 20px rgba(212,133,58,0.2);
        }
        .step-circle.pending {
          background: rgba(255,255,255,0.04);
          border: 2px solid rgba(255,255,255,0.1);
        }
        .step-circle.rejected {
          background: rgba(240,100,100,0.12);
          border: 2px solid rgba(240,100,100,0.4);
        }
        .step-line.done {
          background: linear-gradient(180deg, rgba(74,222,128,0.5), rgba(74,222,128,0.2));
        }
        .step-line.active {
          background: linear-gradient(180deg, rgba(212,133,58,0.4), rgba(212,133,58,0.1));
        }
        .step-line.pending {
          background: rgba(255,255,255,0.07);
        }
        
        /* Pulse overlay for active circle */
        .step-circle.active::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid rgba(212,133,58,0.25);
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: .7; }
          50% { transform: scale(1.2); opacity: 0; }
        }

        /* PILLS & BADGES */
        .step-badge.done {
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.22);
          color: var(--success);
        }
        .step-badge.active {
          background: rgba(212,133,58,0.12);
          border: 1px solid rgba(212,133,58,0.28);
          color: var(--o2);
        }
        .step-badge.wait {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--td);
        }
        .step-badge.rejected {
          background: rgba(240,100,100,0.1);
          border: 1px solid rgba(240,100,100,0.22);
          color: var(--danger);
        }

        /* BUTTON ACTIONS */
        .act-btn {
          transition: all .2s;
        }
        .act-btn.primary {
          background: linear-gradient(135deg, var(--og), #b8521e);
          box-shadow: 0 4px 16px rgba(200,98,42,0.28);
        }
        .act-btn.primary:hover {
          opacity: .92;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(200,98,42,0.38);
        }
        .act-btn.ghost {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.1);
        }
        .act-btn.ghost:hover {
          background: rgba(255,255,255,0.09);
          color: var(--t);
        }
        .act-btn.danger {
          background: rgba(240,100,100,0.08);
          color: rgba(240,130,130,0.7);
          border-color: rgba(240,100,100,0.18);
        }
        .act-btn.danger:hover {
          background: rgba(240,100,100,0.15);
          color: var(--danger);
        }

        /* TOAST */
        .toast {
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          transform: translateY(60px);
          opacity: 0;
          transition: all .3s cubic-bezier(.34, 1.56, .64, 1);
        }
        .toast.show {
          transform: translateY(0);
          opacity: 1;
        }
      ` }} />

      {/* STICKY NAVBAR */}
      <nav className="sticky top-0 z-[200] flex items-center justify-between px-8 h-[68px] bg-[#080808]/96 backdrop-blur-[28px] border-b border-white/[0.07]">
        <Link className="flex items-center gap-2.5 no-underline" href="/dashboard">
          <div className="w-9 h-9 bg-gradient-to-br from-og/25 to-o/10 border-[1.5px] border-og/50 rounded-[9px] flex items-center justify-center">
            <JurifyLogoIcon size={18} />
          </div>
          <span className="font-serif text-22px font-semibold text-[var(--t)] tracking-[0.5px]">Jurify</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <Link className="nav-back flex items-center gap-1.75 text-xs text-[var(--td)] bg-white/[0.04] border border-white/[0.08] rounded-[8px] px-4 py-2 cursor-pointer font-sans no-underline" href="/dashboard">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M9 6.5H4M6 4l-2.5 2.5L6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Dashboard
          </Link>
          <button
            type="button"
            className="nav-support flex items-center gap-1.75 text-xs font-semibold text-[var(--o2)] bg-og/8 border border-og/20 rounded-[8px] px-4 py-2 cursor-pointer font-sans"
            onClick={() => showToast('Connecting to support…', 'info')}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M4.5 5a2 2 0 113 1.73c-.5.29-1 .77-1 1.27" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="6.5" cy="9.5" r=".55" fill="currentColor" />
            </svg>
            Get Help
          </button>
        </div>
      </nav>

      {/* PAGE CONTAINER */}
      <div className="relative z-10 max-w-[860px] mx-auto px-8 pt-12 pb-20">

        {/* LOOKUP SECTION */}
        {!activeData && (
          <div className="flex flex-col items-center text-center animate-fade-up" id="lookupSection">
            <div className="w-[68px] h-[68px] rounded-[20px] bg-gradient-to-br from-og/18 to-o/8 border-[1.5px] border-og/30 flex items-center justify-center mx-auto mb-6 lookup-icon">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M15 3L6 7v7c0 6 3.8 10.5 9 12 5.2-1.5 9-6 9-12V7L15 3z" stroke="#D4853A" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M10.5 15l3 3 6-6" stroke="#D4853A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
              </svg>
            </div>
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.5px] text-white/45 bg-white/[0.05] border border-white/[0.09] rounded-full px-3.5 py-1.25 mb-4 lookup-kicker">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1L7 4.5h3.5l-2.8 2.1 1 3.4L5.5 8 3.3 10l1-3.4L1.5 4.5H5L5.5 1z" stroke="rgba(245,240,234,0.45)" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              Lawyer Verification Portal
            </div>
            <h1 className="font-serif text-[34px] md:text-[52px] font-light leading-[1.08] tracking-[-1px] mb-3 lookup-title">
              Track Your <em className="italic text-o2">Application</em>
            </h1>
            <p className="text-[14.5px] text-[var(--tm)] font-light leading-relaxed max-w-[480px] mx-auto mb-9 lookup-sub">
              Enter your unique reference number from your KYC confirmation email to view the real-time status of your Bar Council verification.
            </p>

            <div className="w-full max-w-[560px] mx-auto rounded-[20px] p-8 lookup-card text-left">
              <div className="text-xs font-semibold text-white/45 mb-2 lc-label">Verification Reference Number</div>
              <div className="flex gap-2.5 mb-1.5 lc-input-row">
                <input
                  id="refInput"
                  type="text"
                  className="flex-1 bg-white/[0.04] border-[1.5px] border-white/10 rounded-[11px] px-4 py-3.5 text-15px font-semibold text-[var(--t)] font-sans outline-none tracking-[0.5px] ref-input"
                  placeholder="e.g. JRF-2026-DL-48291"
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && trackApp()}
                  autoComplete="off"
                  spellCheck="false"
                  disabled={loading}
                />
                <button
                  type="button"
                  id="trackBtn"
                  className="track-btn flex items-center gap-2 font-sans text-sm font-semibold text-white border-none rounded-[11px] px-6 py-3.5 cursor-pointer whitespace-nowrap shrink-0"
                  onClick={trackApp}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-[15px] h-[15px] border-2 border-white/30 border-t-white rounded-full btn-spin" />
                      Tracking…
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
                        <line x1="9.2" y1="9.2" x2="12.5" y2="12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                      Track
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-danger flex items-center gap-1.25 mt-1 min-h-[18px] lc-error">
                {errorMsg && (
                  <>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1" />
                      <line x1="5.5" y1="3.5" x2="5.5" y2="6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                      <circle cx="5.5" cy="7.5" r=".55" fill="currentColor" />
                    </svg>
                    {errorMsg}
                  </>
                )}
              </div>

              <div className="text-xs text-white/25 text-center mt-[18px] leading-relaxed lc-hint">
                Reference number was sent to your registered email after completing the KYC form.<br />
                Can't find it? <a href="#" className="text-og hover:text-o2 hover:underline">Resend to email</a> or <a href="#" className="text-og hover:text-o2 hover:underline">contact support</a>.
              </div>

              <div className="flex items-center gap-2 mt-[18px] flex-wrap justify-center sample-refs">
                <span className="text-[11.5px] text-white/28 sample-lbl">Try a demo:</span>
                <button type="button" className="text-[11.5px] font-semibold text-og bg-og/8 border border-og/18 rounded-[7px] px-2.75 py-1 cursor-pointer font-sans sref" onClick={() => fillRef('JRF-2026-DL-48291')}>Pending Review</button>
                <button type="button" className="text-[11.5px] font-semibold text-og bg-og/8 border border-og/18 rounded-[7px] px-2.75 py-1 cursor-pointer font-sans sref" onClick={() => fillRef('JRF-2026-MH-77342')}>Approved</button>
                <button type="button" className="text-[11.5px] font-semibold text-og bg-og/8 border border-og/18 rounded-[7px] px-2.75 py-1 cursor-pointer font-sans sref" onClick={() => fillRef('JRF-2026-KA-55198')}>Under Review</button>
                <button type="button" className="text-[11.5px] font-semibold text-og bg-og/8 border border-og/18 rounded-[7px] px-2.75 py-1 cursor-pointer font-sans sref" onClick={() => fillRef('JRF-2026-WB-33041')}>Rejected</button>
              </div>
            </div>
          </div>
        )}

        {/* RESULT SECTION */}
        {activeData && (
          <div className="animate-fade-up" id="resultSection">
            <button
              type="button"
              className="flex items-center gap-2 font-sans text-xs text-[var(--td)] bg-none border-none cursor-pointer p-0 transition-colors hover:text-[var(--tm)] mb-8 search-again"
              onClick={resetSearch}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 6.5H3M6 3l-3 3.5L6 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Track a different reference number
            </button>

            {/* RESULT HEADER */}
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap result-header">
              <div className="rh-left">
                <div className="text-[11px] text-[var(--td)] uppercase tracking-[0.8px] mb-1.5 flex items-center gap-1.75 rh-ref">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <rect x="1" y="1" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" />
                    <line x1="3" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth=".8" />
                    <line x1="3" y1="6" x2="6" y2="6" stroke="currentColor" strokeWidth=".8" />
                  </svg>
                  Reference Number <span className="text-13px font-semibold text-og font-mono tracking-[0.5px] rh-ref-val">{activeRef}</span>
                </div>
                <div className="font-serif text-32px font-light tracking-[-0.4px] mb-1 rh-name" dangerouslySetInnerHTML={{ __html: 'Adv. ' + activeData.nameEm }} />
                <div className="text-[12.5px] text-[var(--td)] rh-meta">{activeData.meta}</div>
              </div>

              <div className={`flex items-center gap-2.5 px-4.5 py-3 rounded-[14px] shrink-0 rh-overall ${activeData.overall}`}>
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 rh-overall-icon ${activeData.overall}`}>
                  {activeData.overall === 'pending' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="#f0b840" strokeWidth="1.3" />
                      <path d="M8 5v3l2 2" stroke="#f0b840" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {activeData.overall === 'approved' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="#4ade80" strokeWidth="1.3" />
                      <path d="M5 8l2.5 2.5L11 5" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {activeData.overall === 'rejected' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="#f06464" strokeWidth="1.3" />
                      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#f06464" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  )}
                  {activeData.overall === 'review' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="rgba(100,150,255,0.9)" strokeWidth="1.3" />
                      <path d="M5 8h6M8 5v6" stroke="rgba(100,150,255,0.9)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="text-[11px] text-white/40 mb-0.75 rh-status-lbl">Overall Status</div>
                  <div className={`text-15px font-semibold rh-status-val ${activeData.overall}`}>{activeData.overallTxt}</div>
                </div>
              </div>
            </div>

            {/* REJECTION NOTICE */}
            {activeData.showRejection && (
              <div className="bg-[#f06464]/6 border border-[#f06464]/20 rounded-[16px] p-6 mb-7 rejection-notice show">
                <div className="flex items-center gap-2.5 mb-2.5 rn-head">
                  <div className="w-8 h-8 rounded-[9px] bg-[#f06464]/12 border border-[#f06464]/22 flex items-center justify-center shrink-0 rn-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="#f06464" strokeWidth="1.3" />
                      <path d="M5 5l6 6M11 5l-6 6" stroke="#f06464" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="text-[15px] font-semibold text-danger rn-title">Verification Not Approved</div>
                </div>
                <div className="text-[13.5px] text-[var(--tm)] leading-relaxed font-light mb-3.5 rn-body">
                  Your KYC application was reviewed and could not be approved at this time. Please review the reason below, make the necessary corrections, and re-submit your application.
                </div>
                <div
                  className="px-4 py-3 bg-[#f06464]/7 border border-[#f06464]/15 rounded-[10px] text-xs text-white/65 leading-relaxed mb-3.5 rn-reason"
                  dangerouslySetInnerHTML={{ __html: activeData.rejectionReason || '' }}
                />
                <div className="flex gap-2.5 flex-wrap">
                  <button type="button" className="act-btn primary flex items-center gap-2 font-sans text-[13px] rounded-[10px] px-5 py-[11px] cursor-pointer" onClick={() => showToast('Opening KYC re-submission form', 'info')}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1.5v8M3.5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Re-Submit Application
                  </button>
                  <button type="button" className="act-btn ghost flex items-center gap-2 font-sans text-[13px] rounded-[10px] px-5 py-[11px] cursor-pointer border" onClick={() => showToast('Downloading rejection notice PDF', 'info')}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="2" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
                      <line x1="4.5" y1="4.5" x2="8.5" y2="4.5" stroke="currentColor" strokeWidth=".9" />
                      <line x1="4.5" y1="7" x2="8.5" y2="7" stroke="currentColor" strokeWidth=".9" />
                    </svg>
                    Download Notice
                  </button>
                </div>
              </div>
            )}

            {/* ETA BANNER */}
            {activeData.showEta && (
              <div className="flex items-center gap-3 py-3.5 px-5 bg-og/5 border border-og/14 rounded-[14px] mb-7 eta-banner">
                <div className="w-8.5 h-8.5 rounded-[9px] bg-og/10 border border-og/20 flex items-center justify-center shrink-0 eta-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="#D4853A" strokeWidth="1.2" />
                    <path d="M8 5v3l2 2" stroke="#D4853A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="eta-text">
                  <div className="text-[11px] text-og uppercase tracking-[0.7px] font-semibold mb-0.75 eta-label">{activeData.etaLabel}</div>
                  <div className="text-[13.5px] font-semibold text-[var(--t)] eta-value">{activeData.eta}</div>
                  <div className="text-[12px] text-[var(--td)] eta-sub">{activeData.etaSub}</div>
                </div>
                <div className="eta-pct ml-auto text-right shrink-0">
                  <div className="text-26px font-bold text-og line-none eta-pct-n">{activeData.etaPct}%</div>
                  <div className="text-[11px] text-[var(--td)] mt-0.5 eta-pct-lbl">Complete</div>
                </div>
              </div>
            )}

            {/* PROGRESS STEPPER */}
            <div className="bg-card border border-white/[0.08] rounded-[18px] px-[30px] py-7 mb-5 progress-card">
              <div className="mb-7 pc-head">
                <div className="font-serif text-[22px] tracking-[-0.2px] mb-1 pc-title">
                  Verification <em className="italic text-o2">Progress</em>
                </div>
                <div className="text-[12.5px] text-[var(--td)] pc-sub">Each step is reviewed by our legal verification team</div>
              </div>

              <div className="flex flex-col stepper">
                {activeData.steps.map((step, idx) => {
                  const isLast = idx === activeData.steps.length - 1
                  const lineClass = isLast ? 'last' : step.status
                  const badgeClass = badgeMap[step.badge] || 'wait'

                  return (
                    <div key={step.name} className="flex gap-4.5 relative step">
                      <div className="flex flex-col items-center shrink-0 step-left">
                        <div className={`w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0 relative z-[2] step-circle ${step.status}`}>
                          {stepIcons[step.status as keyof typeof stepIcons]}
                        </div>
                        <div className={`w-[2px] flex-1 min-h-[28px] my-1 step-line ${lineClass}`} />
                      </div>
                      <div className="pb-6 flex-1 min-w-0 step-body">
                        <div className="flex items-start justify-between gap-3 mt-1.5 step-row">
                          <div className={`text-[14.5px] font-bold step-name ${step.status === 'pending' ? 'pending-text text-white/40' : step.status === 'rejected' ? 'rejected-text text-danger' : 'text-[var(--t)]'
                            }`}>
                            {step.name}
                          </div>
                          <div className="text-[11.5px] text-[var(--td)] shrink-0 mt-0.5 step-time">{step.time}</div>
                        </div>
                        <div className={`text-[13px] leading-relaxed font-light mt-1.25 step-desc ${step.status === 'pending' ? 'pending-text text-white/28' : 'text-[var(--tm)]'
                          }`}>
                          {step.desc}
                        </div>
                        <div className={`inline-flex items-center gap-1.25 text-[10.5px] font-bold px-2.5 py-0.75 rounded-full mt-2 border step-badge ${badgeClass}`}>
                          {step.badge}
                        </div>

                        {/* Stepper Documents Sub-list */}
                        {step.docs && (
                          <div className="flex flex-col gap-1.5 mt-2.5 doc-list">
                            {step.docs.map((doc) => {
                              const isDocOk = doc.status === 'ok'
                              const isDocFail = doc.status === 'fail'
                              return (
                                <div
                                  key={doc.name}
                                  className={`flex items-center gap-2.25 px-3 py-2 border rounded-[9px] doc-item ${isDocOk ? 'bg-[rgba(74,222,128,0.05)] border-[rgba(74,222,128,0.14)]' :
                                      isDocFail ? 'bg-[rgba(240,100,100,0.05)] border-[rgba(240,100,100,0.14)]' :
                                        'bg-[rgba(240,180,60,0.05)] border-[rgba(240,180,60,0.14)]'
                                    }`}
                                >
                                  <div className="w-[26px] h-[26px] rounded-[7px] bg-og/10 border border-og/18 flex items-center justify-center shrink-0 di-icon">
                                    {docIcons[doc.status as keyof typeof docIcons]}
                                  </div>
                                  <div className="text-[12.5px] font-semibold text-[var(--tm)] flex-1 di-name">{doc.name}</div>
                                  <div className={`text-[11px] font-bold flex items-center gap-1.25 di-status ${isDocOk ? 'text-success' : isDocFail ? 'text-danger' : 'text-warn'
                                    }`}>
                                    {docIcons[doc.status as keyof typeof docIcons]}
                                    &nbsp;
                                    {isDocOk ? 'Verified' : isDocFail ? 'Mismatch' : 'Checking'}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-4 mb-5 info-grid">
              <div className="bg-card border border-white/[0.07] rounded-[16px] p-5.5 info-card">
                <div className="text-[11px] uppercase tracking-[1px] text-white/30 font-semibold mb-3.5 ic-title">Application Details</div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">Full Name</div>
                  <div className="text-[12px] text-[var(--tm)] leading-normal ic-val" id="iName">Adv. {activeData.name.replace('Adv. ', '')}</div>
                </div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">Enrollment</div>
                  <div className="text-[12px] text-[var(--tm)] leading-normal ic-val" id="iEnroll">{activeData.enrollment}</div>
                </div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">Bar Council</div>
                  <div className="text-[12px] text-[var(--tm)] leading-normal ic-val" id="iBar">{activeData.bar}</div>
                </div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">Degree</div>
                  <div className="text-[12px] text-[var(--tm)] leading-normal ic-val" id="iDegree">{activeData.degree}</div>
                </div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">Submitted</div>
                  <div className="text-[12px] text-[var(--tm)] leading-normal ic-val" id="iDate">{activeData.submitted}</div>
                </div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">Attempt</div>
                  <div className="text-[12px] text-[var(--tm)] leading-normal ic-val" id="iAttempt">{activeData.attempt}</div>
                </div>
              </div>

              <div className="bg-card border border-white/[0.07] rounded-[16px] p-5.5 info-card">
                <div className="text-[11px] uppercase tracking-[1px] text-white/30 font-semibold mb-3.5 ic-title">Document Status</div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">Aadhaar Card</div>
                  <div className="text-[12px] leading-normal ic-val" id="dAadhaar">{docStatus(activeData.docs.aadhaar as any)}</div>
                </div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">PAN Card</div>
                  <div className="text-[12px] leading-normal ic-val" id="dPan">{docStatus(activeData.docs.pan as any)}</div>
                </div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">Bar Certificate</div>
                  <div className="text-[12px] leading-normal ic-val" id="dBar">{docStatus(activeData.docs.barCert as any)}</div>
                </div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">Degree Cert.</div>
                  <div className="text-[12px] leading-normal ic-val" id="dDegree">{docStatus(activeData.docs.degree as any)}</div>
                </div>
                <div className="flex items-start gap-2.25 py-1.5 border-b border-white/[0.04] last:border-b-0 ic-row">
                  <div className="text-[12px] text-[var(--td)] min-w-[80px] shrink-0 ic-lbl">Photo</div>
                  <div className="text-[12px] leading-normal ic-val" id="dPhoto">{docStatus(activeData.docs.photo as any)}</div>
                </div>
              </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-card border border-white/[0.07] rounded-[16px] px-6 py-5.5 mb-5 timeline-card">
              <div className="text-[13px] font-semibold text-[var(--t)] mb-4 tl-title">Activity Timeline</div>
              <div className="flex flex-col tl-list">
                {activeData.timeline.map((item, idx) => {
                  const isLast = idx === activeData.timeline.length - 1
                  return (
                    <div key={item.action + idx} className="flex gap-3.5 py-2.5 border-b border-white/[0.04] last:border-b-0 tl-item">
                      <div className="flex flex-col items-center shrink-0 tl-dot-wrap pt-1.25">
                        <div className={`w-2 h-2 rounded-full shrink-0 tl-dot ${item.dot}`} style={{ backgroundColor: colors[item.dot] || colors.grey }} />
                        {!isLast && <div className="w-[1px] flex-1 min-h-[12px] bg-white/[0.06] my-1 tl-connector" />}
                      </div>
                      <div className="flex-1 min-w-0 tl-body">
                        <div className="text-[13px] font-medium text-[var(--t)] tl-action">{item.action}</div>
                        <div className="text-[11.5px] text-[var(--td)] mt-0.5 tl-meta">{item.meta}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2.5 flex-wrap mb-7 action-row">
              <button
                type="button"
                id="primaryActionBtn"
                className="act-btn primary flex items-center gap-2 font-sans text-[13px] rounded-[10px] padding px-5 py-[11px] cursor-pointer"
                onClick={() => showToast('Opening notification settings', 'info')}
              >
                {activeData.overall === 'approved' ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.1" />
                      <path d="M2 12c0-2 2-3.5 5-3.5s5 1.5 5 3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    View Verified Profile
                  </>
                ) : activeData.overall === 'rejected' ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1.5v8M3.5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Re-Submit Application
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1.5a4.5 4.5 0 014.5 4.5v2.5l1 2H1l1-2V6A4.5 4.5 0 016.5 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M5 10.5c0 .8.67 1.5 1.5 1.5s1.5-.7 1.5-1.5" stroke="currentColor" strokeWidth="1.1" />
                    </svg>
                    Get Status Notifications
                  </>
                )}
              </button>
              <button
                type="button"
                className="act-btn ghost flex items-center gap-2 font-sans text-[13px] rounded-[10px] px-5 py-[11px] cursor-pointer border"
                onClick={() => showToast('Downloading application summary PDF', 'info')}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1.5v8M3.5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.5 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Download Summary
              </button>
              <button
                type="button"
                className="act-btn ghost flex items-center gap-2 font-sans text-[13px] rounded-[10px] px-5 py-[11px] cursor-pointer border"
                onClick={() => showToast('Opening support chat', 'info')}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1.5 2h10v8H7.5L5 11.5V10H1.5V2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
                </svg>
                Contact Support
              </button>
            </div>

          </div>
        )}

      </div>

      {/* TOAST PANEL */}
      <div className={`toast fixed bottom-6 right-6 z-[9999] bg-[#0e0d0b]/97 border border-og/28 rounded-[12px] px-[18px] py-3.25 flex items-center gap-2.5 max-w-[320px] pointer-events-none ${toast.show ? 'show' : ''}`}>
        <div className={`w-[7px] h-[7px] rounded-full shrink-0 tdot ${toast.type}`} />
        <span className="text-[13px] text-[var(--t)]">{toast.msg}</span>
      </div>
    </div>
  )
}
