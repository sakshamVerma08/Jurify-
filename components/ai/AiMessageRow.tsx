// FILE: components/ai/AiMessageRow.tsx
// TYPE: Client Component

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/uiStore'
import type { AiMessage } from '@/types'

interface AiMessageRowProps {
  message: AiMessage
  onFollowup: (text: string) => void
}

export function AiMessageRow({ message, onFollowup }: AiMessageRowProps) {
  const showToast = useUiStore((s) => s.showToast)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [copied, setCopied] = useState(false)

  if (message.role === 'user') {
    return (
      <div className="ai-msg-in flex items-end justify-end gap-2.5">
        <div className="max-w-[68%] rounded-[16px_16px_4px_16px] bg-gradient-to-br from-og to-[#b8521e] px-4 py-3.5 text-[13.5px] font-light leading-[1.72] text-white">
          {message.content}
        </div>
      </div>
    )
  }

  const htmlContent = message.content.replace(/\n/g, '<br />')

  async function handleCopy() {
    const plain = message.content.replace(/<[^>]+>/g, '')
    try {
      await navigator.clipboard.writeText(plain)
      setCopied(true)
      showToast('Copied to clipboard', 'info')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('Could not copy', 'err')
    }
  }

  return (
    <div className="group/msg ai-msg-in flex items-end justify-start gap-2.5">
      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-og/30 bg-og/15 text-xs">
        ✦
      </div>
      <div>
        <div
          className="max-w-[68%] rounded-[4px_16px_16px_16px] border border-white/[0.08] bg-[rgba(20,19,17,0.9)] px-4 py-3.5 text-[13.5px] font-light leading-[1.72] text-[rgba(245,240,234,0.85)] [&_em]:italic [&_strong]:font-semibold [&_strong]:text-o2"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        {message.followups && message.followups.length > 0 && (
          <div className="mt-2.5 flex max-w-[68%] flex-wrap gap-1.5">
            {message.followups.map((followup) => (
              <button
                key={followup}
                type="button"
                onClick={() => onFollowup(followup)}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-1.5 font-sans text-xs text-[var(--tm)] transition-all duration-200 hover:border-og/22 hover:bg-og/[0.08] hover:text-[var(--t)]"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M2 5.5h7M6.5 3l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {followup}
              </button>
            ))}
          </div>
        )}
        <div className="mt-2 flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover/msg:opacity-100 [.ai-msg-in:hover_&]:opacity-100">
          <ActionButton
            title="Copy"
            active={copied}
            activeClass="border-og/25 bg-og/10 text-og"
            onClick={handleCopy}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
              <path d="M3.5 3.5V2A1 1 0 012 1H1.5A1 1 0 011 2v5a1 1 0 001 1H3.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </ActionButton>
          <ActionButton
            title="Good response"
            active={liked}
            activeClass="border-success/25 bg-success/10 text-success"
            onClick={() => {
              setLiked((v) => !v)
              setDisliked(false)
              showToast('Thanks for your feedback!', 'info')
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M1 5.5h1.5L4 2.5 6 1.5V5l2.5.5 1 .5-.5 3.5H3.5L1 7.5V5.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          </ActionButton>
          <ActionButton
            title="Poor response"
            active={disliked}
            activeClass="border-danger/25 bg-danger/10 text-danger"
            onClick={() => {
              setDisliked((v) => !v)
              setLiked(false)
              showToast("Feedback noted — we'll improve", 'info')
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M10 5.5H8.5L7 8.5 5 9.5V6L2.5 5.5 1.5 5l.5-3.5h5.5L10 3.5V5.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          </ActionButton>
        </div>
        {message.showTime && message.timestamp && (
          <p className="mt-1 text-right text-[10px] text-[rgba(245,240,234,0.2)]">{message.timestamp}</p>
        )}
      </div>
    </div>
  )
}

function ActionButton({
  children,
  title,
  active,
  activeClass,
  onClick,
}: {
  children: React.ReactNode
  title: string
  active: boolean
  activeClass: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        'flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[7px] border border-white/[0.07] bg-transparent text-[var(--td)] transition-all duration-150 hover:bg-white/[0.07] hover:text-[var(--tm)]',
        active && activeClass
      )}
    >
      {children}
    </button>
  )
}
