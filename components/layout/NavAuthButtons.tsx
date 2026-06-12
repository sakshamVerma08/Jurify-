// FILE: components/layout/NavAuthButtons.tsx
// TYPE: Client Component

'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSession, signOut } from '@/lib/auth/auth-client'
import { useUiStore } from '@/stores/uiStore'

interface Props {
  className?: string
}

function getInitials(name: string | undefined | null) {
  if (!name) return 'U'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

export function NavAuthButtons({ className }: Props) {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const showToast = useUiStore((s) => s.showToast)
  
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  async function handleLogout() {
    try {
      setMenuOpen(false)
      await signOut()
      showToast('Logged out successfully', 'ok')
      router.push('/')
      router.refresh()
    } catch (e) {
      showToast('Failed to log out', 'err')
    }
  }

  // Loading skeleton
  if (isPending) {
    return (
      <div className={cn('flex items-center gap-2.5', className)}>
        <div className="h-[38px] w-[38px] animate-pulse rounded-full bg-white/[0.08]" />
      </div>
    )
  }

  // Authenticated State (User Avatar & Dropdown)
  if (session?.user) {
    const { name, image, email } = session.user
    const initials = getInitials(name)

    return (
      <div className={cn('relative flex items-center', className)} ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative flex h-[38px] w-[38px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-[1.5px] border-[rgba(212,133,58,0.4)] bg-gradient-to-br from-[rgba(212,133,58,0.2)] to-[rgba(200,98,42,0.1)] text-sm font-semibold tracking-wide text-[#F5F0EA] outline-none transition-all duration-200 hover:border-[rgba(212,133,58,0.7)] hover:shadow-[0_0_12px_rgba(212,133,58,0.2)] focus-visible:ring-2 focus-visible:ring-o2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a09]"
          aria-expanded={menuOpen}
          aria-haspopup="true"
          aria-label="User menu"
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name || 'User'} className="h-full w-full object-cover" />
          ) : (
            <span>{initials}</span>
          )}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div 
            className="absolute right-0 top-[calc(100%+12px)] z-[300] w-56 animate-in slide-in-from-top-2 fade-in-0 zoom-in-95 rounded-xl border border-white/[0.08] bg-[#0e0d0b] py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl"
          >
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <p className="truncate font-sans text-sm font-medium text-[var(--t)]">
                {name || 'Jurify User'}
              </p>
              <p className="truncate font-sans text-xs text-[rgba(245,240,234,0.4)]">
                {email}
              </p>
            </div>
            
            <div className="p-1.5">
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-[var(--tm)] transition-colors hover:bg-white/[0.05] hover:text-[var(--t)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="opacity-70">
                  <path d="M2 5L8 1.5L14 5V13.5C14 14.3284 13.3284 15 12.5 15H3.5C2.67157 15 2 14.3284 2 13.5V5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.5 15V10.5C5.5 9.67157 6.17157 9 7 9H9C9.82843 9 10.5 9.67157 10.5 10.5V15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Dashboard
              </Link>
            </div>

            <div className="border-t border-white/[0.06] p-1.5">
              <button
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-[#f06464] transition-colors hover:bg-[#f06464]/10 hover:text-[#f87171]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="opacity-80">
                  <path d="M6 14H3.5C2.67157 14 2 13.3284 2 12.5V3.5C2 2.67157 2.67157 2 3.5 2H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M11 11.5L14.5 8L11 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.5 8H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Unauthenticated State
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Link
        href="/login"
        aria-label="Log in to Jurify"
        className="inline-flex items-center justify-center rounded-lg px-[18px] py-2 font-sans text-[13.5px] font-normal text-[var(--tm)] no-underline transition-all duration-200 hover:bg-white/5 hover:text-[var(--t)]"
      >
        Login
      </Link>
      <Link
        href="/register"
        aria-label="Sign up for Jurify"
        className="btn-gradient-nav inline-flex items-center gap-2 rounded-[10px] px-[22px] py-2.5 font-sans text-[13.5px] font-medium text-white no-underline transition-all duration-200 hover:-translate-y-px hover:opacity-92"
      >
        Sign Up
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  )
}
