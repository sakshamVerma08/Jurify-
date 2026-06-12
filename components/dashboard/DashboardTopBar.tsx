// FILE: components/dashboard/DashboardTopBar.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { signOut } from '@/lib/auth/auth-client'
import { DASHBOARD_DATE_LABEL, DASHBOARD_PROFILES } from '@/lib/data/dashboard'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useUiStore } from '@/stores/uiStore'

export function DashboardTopBar() {
  const viewRole = useDashboardStore((s) => s.viewRole)
  const search = useDashboardStore((s) => s.search)
  const setSearch = useDashboardStore((s) => s.setSearch)
  const showToast = useUiStore((s) => s.showToast)
  const profile = DASHBOARD_PROFILES[viewRole]
  const router = useRouter()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <header className="relative z-50 flex h-[62px] shrink-0 items-center justify-between border-b border-white/[0.07] bg-[rgba(8,8,8,0.92)] px-8 backdrop-blur-[20px] max-md:px-4">
      <div>
        <h1 className="text-base font-semibold text-[var(--t)]">{profile.greeting}</h1>
        <p className="mt-px text-xs text-[var(--td)]">{DASHBOARD_DATE_LABEL}</p>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 rounded-[9px] border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 transition-colors hover:border-white/[0.14] max-sm:hidden">
          <svg className="opacity-35" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="9.5" y1="9.5" x2="12.5" y2="12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search cases, lawyers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-40 border-none bg-transparent font-sans text-[13px] text-[var(--t)] outline-none placeholder:text-[rgba(245,240,234,0.22)]"
          />
        </div>
        <button
          type="button"
          onClick={() => showToast('3 new notifications', 'info')}
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border border-white/[0.09] bg-white/[0.04] text-[var(--td)] transition-all duration-200 hover:bg-white/[0.08] hover:text-[var(--tm)]"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M7.5 1.5a5 5 0 015 5v3l1 2H1.5l1-2V6.5a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M6 12.5c0 .8.67 1.5 1.5 1.5s1.5-.67 1.5-1.5" stroke="currentColor" strokeWidth="1.1" />
          </svg>
          <span className="absolute right-[5px] top-[5px] h-[7px] w-[7px] rounded-full border-[1.5px] border-bg bg-danger shadow-[0_0_6px_rgba(240,100,100,0.5)]" />
        </button>
        <button
          type="button"
          onClick={() => showToast('Opening calendar', 'info')}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border border-white/[0.09] bg-white/[0.04] text-[var(--td)] transition-all duration-200 hover:bg-white/[0.08] hover:text-[var(--tm)] max-sm:hidden"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <rect x="1.5" y="2.5" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
            <path d="M4 1.5v2M11 1.5v2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            <line x1="1.5" y1="6" x2="13.5" y2="6" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <Link
          href="/"
          title="Go to Landing Page"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border border-white/[0.09] bg-white/[0.04] text-[var(--td)] transition-all duration-200 hover:bg-white/[0.08] hover:text-[var(--tm)]"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M7.5 1.5L1.5 7V13.5H5.5V9.5H9.5V13.5H13.5V7L7.5 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
          </svg>
        </Link>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border-[1.5px] border-og/30 bg-og/[0.18] font-serif text-sm font-semibold text-og transition-colors hover:border-og/50 hover:bg-og/[0.25]"
          >
            {profile.initials}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-1.5 shadow-xl ring-1 ring-black/5 z-[9999]">
              <Link
                href="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-[var(--t)] transition-colors hover:bg-white/[0.05]"
              >
                Profile
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false)
                  handleLogout()
                }}
                className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger/10"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
