// FILE: components/terms/TermsInteractiveController.tsx
// TYPE: Client Component

'use client'

import { useEffect, useState } from 'react'

export function TermsInteractiveController() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop || document.body.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setScrollProgress(pct)
      setShowBackToTop(scrollTop > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed inset-x-0 top-0 z-[999] h-[2px] bg-gradient-to-r from-[var(--og)] to-[var(--o2)] transition-[width] duration-100 ease-linear"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Back to top button */}
      <button
        type="button"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className={`fixed bottom-8 right-8 z-[500] flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-[rgba(212,133,58,0.3)] bg-[rgba(14,13,11,0.95)] text-[var(--og)] shadow-[0_8px_28px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,133,58,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(212,133,58,0.5)] hover:bg-[rgba(212,133,58,0.14)] ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  )
}
