'use client'

import { useAdminStore } from '@/stores/adminStore'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

export function ReportsPanel() {
  const reports = useAdminStore((s) => s.reports)
  const searchQuery = useAdminStore((s) => s.searchQuery)
  const setSearchQuery = useAdminStore((s) => s.setSearchQuery)
  
  const typeFilter = useAdminStore((s) => s.typeFilter)
  const setTypeFilter = useAdminStore((s) => s.setTypeFilter)
  
  const statusFilter = useAdminStore((s) => s.statusFilter)
  const setStatusFilter = useAdminStore((s) => s.setStatusFilter)
  
  const resolveReport = useAdminStore((s) => s.resolveReport)
  const dismissReport = useAdminStore((s) => s.dismissReport)
  
  const showToast = useUiStore((s) => s.showToast)

  // Filtered Reports
  const filteredReports = reports.filter((r) => {
    const matchesSearch = 
      r.reportedContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesType = 
      typeFilter === 'All Types' || 
      r.type.toLowerCase() === typeFilter.toLowerCase()
      
    const matchesStatus = 
      statusFilter === 'All Status' || 
      r.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

  const handleResolve = (id: string, content: string) => {
    resolveReport(id)
    showToast('Report marked as resolved', 'ok')
  }

  const handleDismiss = (id: string, content: string) => {
    dismissReport(id)
    showToast('Removed successfully', 'ok')
  }

  return (
    <div className="flex-1 flex flex-col gap-6 animate-fade-up">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3.5">
        <div>
          <div className="font-serif text-3xl font-light tracking-[-0.4px] mb-1">
            User <em className="italic text-o2">Reports</em>
          </div>
          <div className="text-xs text-[var(--td)]">
            {reports.filter(r => r.status === 'open').length} open · {reports.filter(r => r.status === 'resolved').length} resolved this month
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
        <div className="relative flex-1 max-w-[300px]">
          <svg className="absolute left-[11px] top-1/2 -translate-y-1/2 opacity-35 pointer-events-none" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2"/>
            <line x1="8.5" y1="8.5" x2="11.5" y2="11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search reports…" 
            className="w-full bg-card border border-white/[0.09] rounded-[9px] py-[9px] pr-[12px] pl-[36px] text-sm text-[var(--t)] font-sans outline-none transition-colors focus:border-og/40 placeholder:text-white/22"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option>All Types</option>
          <option>Fake Profile</option>
          <option>Spam Case</option>
          <option>Inappropriate Content</option>
          <option>Fraud</option>
        </select>
        <select 
          className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Open</option>
          <option>Resolved</option>
          <option>Dismissed</option>
        </select>
        <span className="text-xs text-[var(--td)] ml-auto">Showing {filteredReports.length} of {reports.length}</span>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-white/[0.07] rounded-[14px] overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white/[0.03] border-b border-white/[0.07]">
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Reported Content</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Type</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Reported By</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Date</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Priority</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Status</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '20px 0', color: 'var(--td)' }}>
                  No reports match the criteria.
                </td>
              </tr>
            ) : (
              filteredReports.map((r) => (
                <tr key={r.id} className="border-b border-white/[0.04] transition-colors duration-150 cursor-default hover:bg-white/[0.025] last:border-b-0">
                  <td className="px-4 py-3 align-middle text-[12.5px] text-[var(--t)] max-w-[220px] truncate" title={r.reportedContent}>
                    {r.reportedContent}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-[20px] bg-[rgba(100,150,255,0.1)] border border-[rgba(100,150,255,0.22)] text-[rgba(140,180,255,0.9)]">
                      {r.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-[var(--tm)]">{r.reportedBy}</td>
                  <td className="px-4 py-3 align-middle text-xs text-[var(--td)]">{r.date}</td>
                  <td className="px-4 py-3 align-middle">
                    <span 
                      style={{ 
                        fontSize: '11.5px', 
                        fontWeight: 600, 
                        color: r.priority === 'high' ? 'var(--danger)' : r.priority === 'medium' ? 'var(--warn)' : 'var(--td)' 
                      }}
                    >
                      {r.priority.charAt(0).toUpperCase() + r.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <span className={cn(
                      "inline-block text-[10px] font-semibold px-[9px] py-0.5 rounded-[20px] border",
                      r.status === 'open' && "bg-[rgba(212,133,58,0.1)] border-[rgba(212,133,58,0.22)] text-o2",
                      r.status === 'resolved' && "bg-[rgba(74,222,128,0.08)] border-[rgba(74,222,128,0.18)] text-[rgba(74,222,128,0.7)]",
                      r.status !== 'open' && r.status !== 'resolved' && "bg-[rgba(240,180,60,0.1)] border-[rgba(240,180,60,0.22)] text-warn"
                    )}>
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex gap-[5px] flex-nowrap">
                      <button 
                        className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-[5px] transition-all duration-150 border border-[rgba(212,133,58,0.18)] text-o2 bg-[rgba(212,133,58,0.08)] hover:bg-[rgba(212,133,58,0.16)] whitespace-nowrap"
                        onClick={() => showToast('Opening report details…', 'info')}
                      >
                        View
                      </button>
                      {r.status === 'open' ? (
                        <>
                          <button 
                            className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-[5px] transition-all duration-150 border border-[rgba(74,222,128,0.2)] text-success bg-[rgba(74,222,128,0.08)] hover:bg-[rgba(74,222,128,0.16)] whitespace-nowrap"
                            onClick={() => handleResolve(r.id, r.reportedContent)}
                          >
                            Resolve
                          </button>
                          <button 
                            className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-[5px] transition-all duration-150 border border-[rgba(255,255,255,0.09)] text-[var(--td)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] hover:text-[var(--tm)] whitespace-nowrap"
                            onClick={() => handleDismiss(r.id, r.reportedContent)}
                          >
                            Dismiss
                          </button>
                        </>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--td)' }} className="self-center ml-1">Closed</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        <div className="flex items-center justify-between px-4 py-3.5 border-t border-white/[0.05] text-xs text-[var(--td)]">
          <span>Showing 1–{filteredReports.length} of {filteredReports.length}</span>
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
