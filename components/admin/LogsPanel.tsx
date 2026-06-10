'use client'

import { useAdminStore } from '@/stores/adminStore'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

export function LogsPanel() {
  const logs = useAdminStore((s) => s.logs)
  const showToast = useUiStore((s) => s.showToast)
  
  const typeFilter = useAdminStore((s) => s.typeFilter)
  const setTypeFilter = useAdminStore((s) => s.setTypeFilter)

  // Filter logs by Action Type
  const filteredLogs = logs.filter((log) => {
    if (typeFilter === 'All Action Types') return true
    
    // Map log.actionType (e.g. 'verify') to filter naming (e.g. 'Verification')
    const matchMap: Record<string, string> = {
      user: 'user',
      verify: 'verification',
      case: 'case',
      blog: 'blog',
      security: 'security',
      system: 'system'
    }
    
    const mappedType = matchMap[log.actionType] || log.actionType
    return mappedType.toLowerCase() === typeFilter.toLowerCase()
  })

  // Format log dates/times nicely
  const formatLogTime = (isoString: string) => {
    try {
      const d = new Date(isoString)
      // Check if valid date
      if (isNaN(d.getTime())) return isoString
      return d.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    } catch {
      return isoString
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-6 animate-fade-up">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3.5">
        <div>
          <div className="font-serif text-3xl font-light tracking-[-0.4px] mb-1">Audit <em>Logs</em></div>
          <div className="text-xs text-[var(--td)]">Comprehensive log of all platform and admin actions</div>
        </div>
        <div className="flex gap-2 items-center">
          <select 
            className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option>All Action Types</option>
            <option>User</option>
            <option>Verification</option>
            <option>Case</option>
            <option>Blog</option>
            <option>Security</option>
            <option>System</option>
          </select>
          <select className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]">
            <option>All Time</option>
            <option>Today</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <button className="flex items-center gap-[7px] font-sans text-[13px] font-medium text-[var(--t)] bg-white/[0.05] border border-white/[0.12] rounded-[9px] px-[18px] py-[9px] cursor-pointer transition-all duration-180 hover:bg-white/[0.09] hover:border-white/20" onClick={() => showToast('Audit logs exported successfully', 'ok')}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v8M3.5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Logs List Container */}
      <div className="bg-card border border-white/[0.07] rounded-[14px] overflow-hidden" id="auditLogList">
        {filteredLogs.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--td)', fontSize: '13px' }}>
            No logs match the criteria.
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="flex items-center gap-3.5 px-4 py-[11px] border-b border-white/[0.04] transition-colors duration-150 hover:bg-white/[0.02] last:border-b-0">
              <div className="text-[11.5px] text-[var(--td)] whitespace-nowrap min-w-[140px] shrink-0">{formatLogTime(log.timestamp)}</div>
              <div className={cn(
                "text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap",
                log.actionType === 'user' && "bg-info/10 border-info/22 text-blue-300",
                log.actionType === 'verify' && "bg-[#4ade80]/10 border-[#4ade80]/22 text-[#4ade80]",
                log.actionType === 'case' && "bg-og/10 border-og/22 text-o2",
                log.actionType === 'blog' && "bg-[#b464ff]/10 border-[#b464ff]/22 text-[#c88cff]",
                log.actionType === 'security' && "bg-[#f06464]/10 border-[#f06464]/22 text-[#f06464]",
                log.actionType === 'system' && "bg-white/[0.07] border-white/[0.12] text-[var(--tm)]"
              )}>
                {log.actionType}
              </div>
              <div 
                className="flex-1 text-[12.5px] text-[var(--tm)] leading-[1.4] [&_strong]:text-[var(--t)] [&_strong]:font-medium"
                dangerouslySetInnerHTML={{ __html: log.description }}
              />
              <div className="text-[11px] text-[var(--td)] whitespace-nowrap shrink-0">by {log.doneBy}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
