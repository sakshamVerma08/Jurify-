// FILE: components/ui/Toast.tsx
// TYPE: Client Component

'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/uiStore'

const DOT_STYLES = {
  ok: 'bg-success shadow-[0_0_8px_rgba(74,222,128,0.5)]',
  err: 'bg-danger shadow-[0_0_8px_rgba(240,100,100,0.5)]',
  info: 'bg-og shadow-[0_0_8px_rgba(212,133,58,0.5)]',
} as const

export function Toast() {
  const visible = useUiStore((s) => s.visible)
  const message = useUiStore((s) => s.message)
  const type = useUiStore((s) => s.type)
  const hideToast = useUiStore((s) => s.hideToast)

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(hideToast, 3200)
    return () => clearTimeout(timer)
  }, [visible, hideToast])

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'pointer-events-none fixed bottom-7 right-7 z-[9999] flex max-w-[320px] items-center gap-2.5 rounded-xl border border-[rgba(212,133,58,0.3)] bg-[rgba(14,13,11,0.97)] px-[18px] py-3.5 text-[13px] text-[var(--t)] shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-[70px] opacity-0'
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
    >
      <div className={cn('h-2 w-2 shrink-0 rounded-full', DOT_STYLES[type])} />
      <span>{message}</span>
    </div>
  )
}
