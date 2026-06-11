'use client'

import Link from 'next/link'
import { useAdminStore } from '@/stores/adminStore'
import { cn } from '@/lib/utils'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'

export function AdminSidebar() {
  const currentTab = useAdminStore((s) => s.currentTab)
  const setCurrentTab = useAdminStore((s) => s.setCurrentTab)
  
  // Dynamic badge counts
  const pendingVerifications = useAdminStore((s) => s.verifications.filter(v => v.status === 'pending').length)
  const openReports = useAdminStore((s) => s.reports.filter(r => r.status === 'open').length)
  const totalUsers = useAdminStore((s) => s.users.length)

  return (
    <aside className="w-[220px] shrink-0 bg-[#080808]/98 border-r border-white/[0.07] flex flex-col h-screen sticky top-0 overflow-y-auto z-10">
      <Link href="/dashboard" className="flex items-center gap-[9px] px-[18px] py-4 border-b border-white/[0.06] no-underline">
        <div className="w-8 h-8 bg-gradient-to-br from-og/25 to-o/10 border-[1.5px] border-og/50 rounded-lg flex items-center justify-center shrink-0">
          <JurifyLogoIcon size={16} />
        </div>
        <span className="font-serif text-[19px] font-semibold text-[var(--t)] tracking-[0.4px]">Jurify</span>
        <span className="text-[9px] font-bold tracking-[1px] uppercase bg-[#f06464]/20 border border-[#f06464]/30 rounded px-1.5 py-0.5 text-[#f06464] ml-auto">Admin</span>
      </Link>
      
      <div className="px-4 pt-3.5 pb-1 text-[9px] uppercase tracking-[1.3px] text-[rgba(245,240,234,0.22)] font-medium">Main</div>
      
      <div 
        className={cn(
          "flex items-center gap-2.5 px-3.5 py-2 mx-1.5 mb-0.5 rounded-[9px] cursor-pointer text-sm transition-all duration-180 border select-none hover:bg-white/[0.04] hover:text-[var(--t)]",
          currentTab === 'overview' ? "bg-og/10 text-o2 border-og/18" : "border-transparent text-[var(--tm)]"
        )}
        onClick={() => setCurrentTab('overview')}
      >
        <svg className={cn("shrink-0", currentTab === 'overview' ? "opacity-90" : "opacity-55")} width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
          <rect x="8.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
          <rect x="1.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
          <rect x="8.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
        </svg>
        Overview
      </div>
      
      <div className="px-4 pt-3.5 pb-1 text-[9px] uppercase tracking-[1.3px] text-[rgba(245,240,234,0.22)] font-medium">Management</div>
      
      <div 
        className={cn(
          "flex items-center gap-2.5 px-3.5 py-2 mx-1.5 mb-0.5 rounded-[9px] cursor-pointer text-sm transition-all duration-180 border select-none hover:bg-white/[0.04] hover:text-[var(--t)]",
          currentTab === 'users' ? "bg-og/10 text-o2 border-og/18" : "border-transparent text-[var(--tm)]"
        )}
        onClick={() => setCurrentTab('users')}
      >
        <svg className={cn("shrink-0", currentTab === 'users' ? "opacity-90" : "opacity-55")} width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.1"/>
          <circle cx="11.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.1"/>
          <path d="M2 13c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        </svg>
        Users
        <span className="ml-auto min-w-[18px] h-[18px] rounded-full text-[10px] font-semibold flex items-center justify-center px-1.25 bg-og/20 text-o2">1.2k</span>
      </div>
      
      <div 
        className={cn(
          "flex items-center gap-2.5 px-3.5 py-2 mx-1.5 mb-0.5 rounded-[9px] cursor-pointer text-sm transition-all duration-180 border select-none hover:bg-white/[0.04] hover:text-[var(--t)]",
          currentTab === 'verifications' ? "bg-og/10 text-o2 border-og/18" : "border-transparent text-[var(--tm)]"
        )}
        onClick={() => setCurrentTab('verifications')}
      >
        <svg className={cn("shrink-0", currentTab === 'verifications' ? "opacity-90" : "opacity-55")} width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M7.5 1.5L3 4v4c0 3 2 5 4.5 5.5C10 13 12 11 12 8V4L7.5 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
          <path d="M5.5 7.5l1.5 1.5L10 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Verifications
        {pendingVerifications > 0 && (
          <span className="ml-auto min-w-[18px] h-[18px] rounded-full text-[10px] font-semibold flex items-center justify-center px-1.25 bg-warn/20 text-o2">{pendingVerifications}</span>
        )}
      </div>
      
      <div 
        className={cn(
          "flex items-center gap-2.5 px-3.5 py-2 mx-1.5 mb-0.5 rounded-[9px] cursor-pointer text-sm transition-all duration-180 border select-none hover:bg-white/[0.04] hover:text-[var(--t)]",
          currentTab === 'cases' ? "bg-og/10 text-o2 border-og/18" : "border-transparent text-[var(--tm)]"
        )}
        onClick={() => setCurrentTab('cases')}
      >
        <svg className={cn("shrink-0", currentTab === 'cases' ? "opacity-90" : "opacity-55")} width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect x="1.5" y="1.5" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
          <line x1="4" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1"/>
          <line x1="4" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1"/>
          <line x1="4" y1="10.5" x2="7.5" y2="10.5" stroke="currentColor" strokeWidth="1"/>
        </svg>
        Cases
      </div>
      
      <div 
        className={cn(
          "flex items-center gap-2.5 px-3.5 py-2 mx-1.5 mb-0.5 rounded-[9px] cursor-pointer text-sm transition-all duration-180 border select-none hover:bg-white/[0.04] hover:text-[var(--t)]",
          currentTab === 'blogs' ? "bg-og/10 text-o2 border-og/18" : "border-transparent text-[var(--tm)]"
        )}
        onClick={() => setCurrentTab('blogs')}
      >
        <svg className={cn("shrink-0", currentTab === 'blogs' ? "opacity-90" : "opacity-55")} width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M2.5 9.5l1-3.5L10 1l2 2-6.5 6.5-3 1z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="8" y1="3" x2="10.5" y2="5.5" stroke="currentColor" strokeWidth="1.1"/>
        </svg>
        Insights / Blogs
      </div>
      
      <div 
        className={cn(
          "flex items-center gap-2.5 px-3.5 py-2 mx-1.5 mb-0.5 rounded-[9px] cursor-pointer text-sm transition-all duration-180 border select-none hover:bg-white/[0.04] hover:text-[var(--t)]",
          currentTab === 'reports' ? "bg-og/10 text-o2 border-og/18" : "border-transparent text-[var(--tm)]"
        )}
        onClick={() => setCurrentTab('reports')}
      >
        <svg className={cn("shrink-0", currentTab === 'reports' ? "opacity-90" : "opacity-55")} width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M7.5 2L13 12H2L7.5 2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
          <line x1="7.5" y1="6" x2="7.5" y2="9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          <circle cx="7.5" cy="10.5" r=".7" fill="currentColor"/>
        </svg>
        Reports
        {openReports > 0 && (
          <span className="ml-auto min-w-[18px] h-[18px] rounded-full text-[10px] font-semibold flex items-center justify-center px-1.25 bg-[#f06464]/20 text-[#f06464]">{openReports}</span>
        )}
      </div>
      
      <div className="px-4 pt-3.5 pb-1 text-[9px] uppercase tracking-[1.3px] text-[rgba(245,240,234,0.22)] font-medium">System</div>
      
      <div 
        className={cn(
          "flex items-center gap-2.5 px-3.5 py-2 mx-1.5 mb-0.5 rounded-[9px] cursor-pointer text-sm transition-all duration-180 border select-none hover:bg-white/[0.04] hover:text-[var(--t)]",
          currentTab === 'logs' ? "bg-og/10 text-o2 border-og/18" : "border-transparent text-[var(--tm)]"
        )}
        onClick={() => setCurrentTab('logs')}
      >
        <svg className={cn("shrink-0", currentTab === 'logs' ? "opacity-90" : "opacity-55")} width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect x="1.5" y="2.5" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
          <line x1="4" y1="5.5" x2="8" y2="5.5" stroke="currentColor" strokeWidth="1"/>
          <line x1="4" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1"/>
        </svg>
        Audit Logs
      </div>
      
      <div 
        className={cn(
          "flex items-center gap-2.5 px-3.5 py-2 mx-1.5 mb-0.5 rounded-[9px] cursor-pointer text-sm transition-all duration-180 border select-none hover:bg-white/[0.04] hover:text-[var(--t)]",
          currentTab === 'settings' ? "bg-og/10 text-o2 border-og/18" : "border-transparent text-[var(--tm)]"
        )}
        onClick={() => setCurrentTab('settings')}
      >
        <svg className={cn("shrink-0", currentTab === 'settings' ? "opacity-90" : "opacity-55")} width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.1"/>
          <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M3 3l1 1M11 11l1 1M3 12l1-1M11 4l1-1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        </svg>
        Settings
      </div>
      
      <div className="mt-auto p-3.5 border-t border-white/[0.06] flex items-center gap-2.5">
        <div className="w-[30px] h-[30px] rounded-full bg-[#f06464]/20 border-[1.5px] border-[#f06464]/35 flex items-center justify-center text-[11px] font-bold text-[#f06464] shrink-0">SA</div>
        <div>
          <div className="text-[12.5px] font-medium text-[var(--t)]">Super Admin</div>
          <div className="text-[10px] text-[#f06464] font-medium">Full Access</div>
        </div>
      </div>
    </aside>
  )
}
