'use client'

import { useAdminStore } from '@/stores/adminStore'
import { cn } from '@/lib/utils'

export function VerificationsPanel() {
  const verifications = useAdminStore((s) => s.verifications)
  const searchQuery = useAdminStore((s) => s.searchQuery)
  const setSelectedVerification = useAdminStore((s) => s.setSelectedVerification)
  
  const statusFilter = useAdminStore((s) => s.statusFilter)
  const setStatusFilter = useAdminStore((s) => s.setStatusFilter)

  // Filtered Verifications
  const filteredVerifications = verifications.filter((v) => {
    const matchesSearch = 
      v.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.enrollmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.barCouncil.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesStatus = 
      statusFilter === 'All Status' || 
      v.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const pendingCount = verifications.filter((v) => v.status === 'pending').length

  return (
    <div className="flex-1 flex flex-col gap-6 animate-fade-up">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3.5">
        <div>
          <div className="font-serif text-3xl font-light tracking-[-0.4px] mb-1">Lawyer <em className="not-italic text-o2">Verifications</em></div>
          <div className="text-xs text-[var(--td)]">{pendingCount} pending review · Average processing time: 1.2 days</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
        <select 
          className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <span className="text-xs text-[var(--td)] ml-auto">Showing {filteredVerifications.length} of {verifications.length} requests</span>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-white/[0.07] rounded-[14px] overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white/3 border-b border-white/7">
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Applicant</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Enrollment No.</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Bar Council</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Submitted</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Status</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Documents</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVerifications.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '20px 0', color: 'var(--td)' }}>
                  No verification applications match the criteria.
                </td>
              </tr>
            ) : (
              filteredVerifications.map((v) => (
                <tr key={v.id} className="border-b border-white/[0.04] transition-colors duration-150 cursor-default hover:bg-white/[0.025] last:border-b-0">
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <div className="flex items-center gap-2.5">
                      <div className="w-[30px] h-[30px] rounded-full bg-og/15 border border-og/25 flex items-center justify-center font-serif text-xs font-semibold text-og shrink-0">
                        {v.applicantInitials}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--t)]">{v.applicantName}</div>
                        <div className="text-[11px] text-[var(--td)] mt-0.5">{v.applicantEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{v.enrollmentNo}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{v.barCouncil}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{v.submittedDate}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <span className={cn(
                      "text-[10px] font-semibold px-2.25 py-0.5 rounded-full border",
                      v.status === 'pending' && "bg-warn/10 border-warn/22 text-o2",
                      v.status === 'approved' && "bg-[#4ade80]/10 border-[#4ade80]/22 text-[#4ade80]",
                      v.status === 'rejected' && "bg-[#f06464]/10 border-[#f06464]/22 text-[#f06464]"
                    )}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <span className="inline-flex items-center gap-1 text-[10px] bg-og/10 border border-og/22 rounded-full px-2 py-0.5 text-og">
                      <svg width="10" height="10" viewBox="0 0 15 15" fill="none">
                        <path d="M7.5 1.5L3 4v4c0 3 2 5 4.5 5.5C10 13 12 11 12 8V4L7.5 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                      </svg>
                      {v.documents.length} Docs
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <div className="flex gap-1.25 flex-nowrap">
                      <button 
                        className={cn(
                          "font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-1.25 transition-all duration-150 border border-transparent white-space-nowrap",
                          v.status === 'pending' ? 'text-success bg-[#4ade80]/8 border-[#4ade80]/20 hover:bg-[#4ade80]/16' : 'text-o2 bg-og/8 border-og/18 hover:bg-og/16'
                        )}
                        onClick={() => setSelectedVerification(v)}
                      >
                        {v.status === 'pending' ? 'Review Application' : 'View Details'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        <div className="flex items-center justify-between px-4 py-3.5 border-t border-white/[0.05] text-xs text-[var(--td)]">
          <span>Showing 1–{filteredVerifications.length} of {filteredVerifications.length} requests</span>
          <div className="flex gap-1">
            <div className="w-7 h-7 rounded-[7px] flex items-center justify-center cursor-pointer text-xs bg-og/15 border border-og/30 text-o2 font-semibold">1</div>
            <div className="w-7 h-7 rounded-[7px] flex items-center justify-center cursor-pointer text-xs text-[var(--td)] bg-white/4 border border-white/8 transition-all hover:bg-white/8 hover:text-[var(--tm)]">2</div>
            <div className="w-7 h-7 rounded-[7px] flex items-center justify-center cursor-pointer text-xs text-[var(--td)] bg-white/4 border border-white/8 transition-all hover:bg-white/8 hover:text-[var(--tm)]">→</div>
          </div>
        </div>
      </div>
    </div>
  )
}
