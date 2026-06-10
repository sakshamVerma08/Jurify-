'use client'

import { useAdminStore } from '@/stores/adminStore'
import { useUiStore } from '@/stores/uiStore'

export function AdminTopbar() {
  const currentTab = useAdminStore((s) => s.currentTab)
  const setCurrentTab = useAdminStore((s) => s.setCurrentTab)
  const searchQuery = useAdminStore((s) => s.searchQuery)
  const setSearchQuery = useAdminStore((s) => s.setSearchQuery)
  const showToast = useUiStore((s) => s.showToast)

  // Map tab identifier to readable name
  const tabNames: Record<string, string> = {
    overview: 'Overview',
    users: 'User Management',
    verifications: 'Lawyer Verifications',
    cases: 'Case Management',
    blogs: 'Insights & Blogs',
    reports: 'User Reports',
    logs: 'Audit Logs',
    settings: 'Platform Settings'
  }

  const activeTabName = tabNames[currentTab] || 'Overview'

  return (
    <div className="shrink-0 flex items-center justify-between px-7 h-[60px] bg-[#080808]/95 border-b border-white/[0.07] backdrop-blur-[20px] z-10">
      <div className="text-xs md:text-sm text-[var(--td)]">
        Jurify / Admin / <strong className="text-[var(--t)] font-medium" id="breadcrumbCurrent">{activeTabName}</strong>
      </div>
      <div className="flex items-center gap-2.5">
        {currentTab !== 'overview' && currentTab !== 'settings' && currentTab !== 'logs' && (
          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-[9px] px-3.5 py-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="8.5" y1="8.5" x2="11.5" y2="11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input 
              type="text" 
              className="bg-transparent border-0 outline-none text-xs md:text-sm text-[var(--t)] w-32 md:w-40 placeholder-white/20"
              placeholder={`Search ${currentTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        <div className="w-[34px] h-[34px] rounded-[9px] border border-white/[0.09] bg-white/[0.04] flex items-center justify-center cursor-pointer text-[var(--td)] transition-all duration-150 hover:bg-white/[0.08] hover:text-[var(--tm)] relative" onClick={() => showToast('3 new notifications available', 'info')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5a4.5 4.5 0 014.5 4.5v3l1 2H1.5l1-2V6A4.5 4.5 0 017 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
            <path d="M5.5 11.5c0 .8.67 1.5 1.5 1.5s1.5-.67 1.5-1.5" stroke="currentColor" strokeWidth="1.1"/>
          </svg>
          <div className="absolute top-1 right-1 w-[7px] h-[7px] rounded-full bg-[#f06464] border border-bg"></div>
        </div>
        <div className="w-[34px] h-[34px] rounded-[9px] border border-white/[0.09] bg-white/[0.04] flex items-center justify-center cursor-pointer text-[var(--td)] transition-all duration-150 hover:bg-white/[0.08] hover:text-[var(--tm)] relative" onClick={() => setCurrentTab('settings')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.1"/>
            <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
