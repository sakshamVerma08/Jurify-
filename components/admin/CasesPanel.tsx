'use client'

import { useAdminStore } from '@/stores/adminStore'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

export function CasesPanel() {
  const cases = useAdminStore((s) => s.cases)
  const searchQuery = useAdminStore((s) => s.searchQuery)
  
  const categoryFilter = useAdminStore((s) => s.categoryFilter)
  const setCategoryFilter = useAdminStore((s) => s.setCategoryFilter)
  
  const statusFilter = useAdminStore((s) => s.statusFilter)
  const setStatusFilter = useAdminStore((s) => s.setStatusFilter)
  
  const flagCase = useAdminStore((s) => s.flagCase)
  const resolveCase = useAdminStore((s) => s.resolveCase)
  const deleteCase = useAdminStore((s) => s.deleteCase)
  
  const showToast = useUiStore((s) => s.showToast)

  // Filtered Cases
  const filteredCases = cases.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lawyerName.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesCategory = 
      categoryFilter === 'All Categories' || 
      c.category.toLowerCase() === categoryFilter.toLowerCase()
      
    const matchesStatus = 
      statusFilter === 'All Status' || 
      c.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleFlag = (id: string, title: string) => {
    flagCase(id)
    showToast(`Case "${title}" has been flagged for moderation`, 'err')
  }

  const handleResolve = (id: string, title: string) => {
    resolveCase(id)
    showToast(`Case "${title}" moderation flags resolved`, 'ok')
  }

  const handleDelete = (id: string, title: string) => {
    deleteCase(id)
    showToast(`Case "${title}" has been deleted`, 'err')
  }

  return (
    <div className="flex-1 flex flex-col gap-6 animate-fade-up">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3.5">
        <div>
          <div className="font-serif text-3xl font-light tracking-[-0.4px] mb-1">Case <em className="not-italic text-o2">Management</em></div>
          <div className="text-xs text-[var(--td)]">{cases.length} total cases · {cases.filter(c => c.status === 'active').length} active</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
        <select 
          className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All Categories</option>
          <option>Family Law</option>
          <option>Criminal Law</option>
          <option>Property Law</option>
          <option>Labour Rights</option>
          <option>Civil Rights</option>
        </select>
        <select 
          className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Open</option>
          <option>Active</option>
          <option>Resolved</option>
          <option>Flagged</option>
        </select>
        <span className="text-xs text-[var(--td)] ml-auto">Showing {filteredCases.length} of {cases.length}</span>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-white/[0.07] rounded-[14px] overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white/[0.03] border-b border-white/[0.07]">
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Case Title</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Category</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Client</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Lawyer</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Posted</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Status</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '20px 0', color: 'var(--td)' }}>
                  No cases match the criteria.
                </td>
              </tr>
            ) : (
              filteredCases.map((c) => (
                <tr key={c.id} className="border-b border-white/[0.04] transition-colors duration-150 cursor-default hover:bg-white/[0.025] last:border-b-0">
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <div style={{ fontWeight: 500, color: 'var(--t)' }}>{c.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--td)', marginTop: '2px' }}>ID: {c.id}</div>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{c.category}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{c.clientName}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{c.lawyerName}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{c.postedDate}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <span className={cn(
                      "text-[10px] font-semibold px-2.25 py-0.5 rounded-full border",
                      c.status === 'open' && "bg-og/10 border-og/22 text-o2",
                      c.status === 'active' && "bg-[#4ade80]/10 border-[#4ade80]/22 text-[#4ade80]",
                      c.status === 'resolved' && "bg-[#4ade80]/8 border-[#4ade80]/18 text-[#4ade80]/70",
                      c.status === 'flagged' && "bg-[#f06464]/10 border-[#f06464]/22 text-[#f06464]"
                    )}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <div className="flex gap-1.25 flex-nowrap">
                      {c.status === 'flagged' ? (
                        <button 
                          className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-1.25 transition-all duration-150 border text-success bg-[#4ade80]/8 border-[#4ade80]/20 hover:bg-[#4ade80]/16"
                          onClick={() => handleResolve(c.id, c.title)}
                        >
                          Resolve Flag
                        </button>
                      ) : (
                        <button 
                          className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-1.25 transition-all duration-150 border text-o2 bg-og/8 border-og/18 hover:bg-og/15"
                          onClick={() => handleFlag(c.id, c.title)}
                        >
                          Flag
                        </button>
                      )}
                      <button 
                        className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-1.25 transition-all duration-150 border text-[#f06464] bg-[#f06464]/8 border-[#f06464]/18 hover:bg-[#f06464]/15"
                        onClick={() => handleDelete(c.id, c.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        <div className="flex items-center justify-between px-4 py-3.5 border-t border-white/[0.05] text-xs text-[var(--td)]">
          <span>Showing 1–{filteredCases.length} of {filteredCases.length}</span>
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
