'use client'

import { useAdminStore } from '@/stores/adminStore'
import { useUiStore } from '@/stores/uiStore'

export function VerificationModal() {
  const selectedVerification = useAdminStore((s) => s.selectedVerification)
  const setSelectedVerification = useAdminStore((s) => s.setSelectedVerification)
  
  const rejectReason = useAdminStore((s) => s.rejectReason)
  const setRejectReason = useAdminStore((s) => s.setRejectReason)
  
  const approveVerification = useAdminStore((s) => s.approveVerification)
  const rejectVerification = useAdminStore((s) => s.rejectVerification)
  
  const showToast = useUiStore((s) => s.showToast)

  if (!selectedVerification) return null

  const handleApprove = () => {
    approveVerification(selectedVerification.id)
    showToast(`Verification for ${selectedVerification.applicantName} approved`, 'ok')
  }

  const handleReject = () => {
    if (!rejectReason.trim()) {
      showToast('Rejection reason is required', 'err')
      return
    }
    rejectVerification(selectedVerification.id, rejectReason)
    showToast(`Verification for ${selectedVerification.applicantName} rejected`, 'err')
  }

  return (
    <div className="fixed inset-0 z-[500] bg-black/85 backdrop-blur-[8px] flex items-center justify-center p-5 transition-opacity duration-250">
      <div className="bg-bg2 border border-white/10 rounded-[20px] w-full max-w-[640px] max-h-[88vh] overflow-y-auto shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        <div className="px-[26px] pt-[22px] pb-[18px] border-b border-white/[0.07] flex items-center justify-between sticky top-0 bg-bg2 z-10">
          <div className="text-[17px] font-semibold text-[var(--t)]">Review Application</div>
          <button className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 text-[var(--tm)] text-[17px] cursor-pointer flex items-center justify-center transition-all hover:bg-white/10 hover:text-[var(--t)] font-sans" onClick={() => setSelectedVerification(null)}>×</button>
        </div>
        <div className="px-[26px] py-[24px]">
          {/* Applicant Info Summary Box */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px', marginBottom: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div>
                <div style={{ fontSize: '10.5px', color: 'var(--td)', marginBottom: '3px' }}>Applicant</div>
                <div style={{ color: 'var(--t)', fontWeight: 500 }}>{selectedVerification.applicantName}</div>
              </div>
              <div>
                <div style={{ fontSize: '10.5px', color: 'var(--td)', marginBottom: '3px' }}>Enrollment No.</div>
                <div style={{ color: 'var(--t)', fontWeight: 500 }}>{selectedVerification.enrollmentNo}</div>
              </div>
              <div>
                <div style={{ fontSize: '10.5px', color: 'var(--td)', marginBottom: '3px' }}>Bar Council</div>
                <div style={{ color: 'var(--t)', fontWeight: 500 }}>{selectedVerification.barCouncil}</div>
              </div>
              <div>
                <div style={{ fontSize: '10.5px', color: 'var(--td)', marginBottom: '3px' }}>Submitted</div>
                <div style={{ color: 'var(--t)', fontWeight: 500 }}>{selectedVerification.submittedDate}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '10.5px', color: 'var(--td)', marginBottom: '3px' }}>Email Address</div>
                <div style={{ color: 'var(--t)', fontWeight: 500 }}>{selectedVerification.applicantEmail}</div>
              </div>
            </div>
          </div>

          {/* Document Row */}
          <div style={{ fontSize: '12px', color: 'var(--tm)', marginBottom: '8px', fontWeight: 500 }}>Submitted Documents</div>
          <div className="grid grid-cols-3 gap-3 mb-[18px]">
            {selectedVerification.documents.map((doc) => (
              <div 
                key={doc.key} 
                className="bg-white/[0.03] border border-white/[0.08] rounded-[12px] p-5 text-center cursor-pointer transition-colors duration-180 hover:border-og/30"
                onClick={() => showToast(`Opening secure preview for ${doc.name}`, 'info')}
              >
                <div className="w-10 h-10 rounded-[10px] bg-og/10 border border-og/20 flex items-center justify-center mx-auto mb-2.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4853A" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="text-xs font-medium text-[var(--t)] mb-0.75">{doc.name}</div>
                <div className="text-[10.5px]" style={{ color: doc.status === 'verified' ? 'var(--success)' : doc.status === 'rejected' ? 'var(--danger)' : 'var(--warn)' }}>
                  {doc.status === 'verified' ? '✓ Verified' : doc.status === 'rejected' ? '✗ Rejected' : '● Pending'}
                </div>
              </div>
            ))}
          </div>

          {/* Rejection input field */}
          <textarea
            className="w-full bg-white/[0.04] border border-white/[0.09] rounded-[10px] px-3.5 py-2.75 text-sm text-[var(--t)] font-sans outline-none resize-y min-h-[80px] mb-3.5 transition-colors focus:border-danger/40"
            placeholder="Reason for rejection (required only if rejecting the application)..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />

          {/* Modal Actions */}
          <div className="flex gap-2.5 pt-2 border-t border-white/[0.06]">
            <button className="flex-1 font-sans text-[13.5px] font-medium bg-[#f06464]/10 text-danger border border-[#f06464]/25 rounded-[10px] p-3.25 cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.75 hover:bg-[#f06464]/18" onClick={handleReject}>
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.1"/>
                <line x1="4.5" y1="4.5" x2="10.5" y2="10.5" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
              Reject Application
            </button>
            <button className="flex-1 font-sans text-[13.5px] font-medium bg-[#4ade80]/12 text-success border border-[#4ade80]/28 rounded-[10px] p-3.25 cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.75 hover:bg-[#4ade80]/20" onClick={handleApprove}>
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1.5L3 4v4c0 3 2 5 4.5 5.5C10 13 12 11 12 8V4L7.5 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                <path d="M5.5 7.5l1.5 1.5L10 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Approve &amp; Verify Lawyer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
