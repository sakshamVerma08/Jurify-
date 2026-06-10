// FILE: components/ui/Modal.tsx
// TYPE: Client Component

'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  boxClassName?: string
  ariaLabel: string
}

export function Modal({
  open,
  onClose,
  children,
  className,
  boxClassName,
  ariaLabel,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={cn(
        'modal-overlay fixed inset-0 z-[500] flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm opacity-100 pointer-events-all',
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
    >
      <div
        className={cn(
          'modal-box-in max-h-[88vh] w-full max-w-[720px] overflow-y-auto rounded-[20px] border border-white/10 bg-bg2 shadow-[0_40px_100px_rgba(0,0,0,0.6)] transition-transform duration-300',
          boxClassName
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
