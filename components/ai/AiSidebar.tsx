// FILE: components/ai/AiSidebar.tsx
// TYPE: Client Component

'use client'

import { AI_CHAT_HISTORY, AI_HISTORY_GROUP_LABELS, AI_LANGUAGES } from '@/lib/data/ai'
import { cn } from '@/lib/utils'
import { useAiStore } from '@/stores/aiStore'
import { useUiStore } from '@/stores/uiStore'
import type { AiHistoryGroup } from '@/types'

const GROUP_ORDER: AiHistoryGroup[] = ['today', 'yesterday', 'week']

export function AiSidebar() {
  const language = useAiStore((s) => s.language)
  const activeHistoryId = useAiStore((s) => s.activeHistoryId)
  const setLanguage = useAiStore((s) => s.setLanguage)
  const setActiveHistory = useAiStore((s) => s.setActiveHistory)
  const newChat = useAiStore((s) => s.newChat)
  const showToast = useUiStore((s) => s.showToast)

  return (
    <aside className="flex w-[260px] shrink-0 flex-col overflow-hidden border-r border-white/[0.07] bg-[rgba(10,10,9,0.6)] max-md:hidden">
      <div className="shrink-0 border-b border-white/[0.05] px-3.5 pb-3 pt-4">
        <button
          type="button"
          onClick={newChat}
          className="btn-gradient-nav relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[10px] border-none py-[11px] font-sans text-[13px] font-medium text-white transition-all duration-200 hover:-translate-y-px hover:opacity-92"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          New Chat
        </button>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value)
            const label = AI_LANGUAGES.find((l) => l.id === e.target.value)?.label ?? e.target.value
            showToast(`Language changed to ${label}`, 'info')
          }}
          className="login-input mt-2.5 w-full cursor-pointer rounded-[9px] border border-white/[0.09] px-3 py-2 font-sans text-[12.5px] text-[var(--tm)] outline-none transition-colors focus:border-og/35"
        >
          {AI_LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id} className="bg-bg3 text-[var(--t)]">
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto px-2.5 pb-4 pt-3">
        {GROUP_ORDER.map((group) => {
          const items = AI_CHAT_HISTORY.filter((h) => h.group === group)
          if (items.length === 0) return null
          return (
            <div key={group}>
              <p className="mb-1.5 mt-1 px-1.5 text-[9.5px] font-medium uppercase tracking-[1.2px] text-[rgba(245,240,234,0.22)]">
                {AI_HISTORY_GROUP_LABELS[group]}
              </p>
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveHistory(item.id)
                    showToast('Chat history loaded', 'info')
                  }}
                  className={cn(
                    'mb-0.5 flex w-full cursor-pointer items-center gap-[9px] rounded-[9px] border border-transparent px-2.5 py-[9px] text-left transition-colors duration-150 hover:border-white/[0.05] hover:bg-white/[0.04]',
                    activeHistoryId === item.id && 'border-og/15 bg-og/[0.08]'
                  )}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border border-og/20 bg-og/10">
                    <DocIcon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'truncate text-[12.5px] leading-snug text-[var(--tm)]',
                        activeHistoryId === item.id && 'text-[var(--t)]'
                      )}
                    >
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[10.5px] text-[var(--td)]">{item.subtitle}</p>
                  </div>
                  <span className="flex shrink-0 cursor-pointer items-center rounded-[5px] p-1 text-[var(--td)]">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" aria-hidden="true">
                      <circle cx="6.5" cy="3" r="1" />
                      <circle cx="6.5" cy="6.5" r="1" />
                      <circle cx="6.5" cy="10" r="1" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          )
        })}
      </div>

      <div className="shrink-0 border-t border-white/[0.05] px-3.5 py-3">
        <SidebarFooterItem label="My Account" />
        <SidebarFooterItem label="Help & FAQ" />
      </div>
    </aside>
  )
}

function DocIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="2" y="1" width="9" height="11" rx="1.5" stroke="#D4853A" strokeWidth="1" />
      <line x1="4.5" y1="4.5" x2="8.5" y2="4.5" stroke="#D4853A" strokeWidth="0.9" />
      <line x1="4.5" y1="6.5" x2="8.5" y2="6.5" stroke="#D4853A" strokeWidth="0.9" />
    </svg>
  )
}

function SidebarFooterItem({ label }: { label: string }) {
  return (
    <div className="flex cursor-pointer items-center gap-[9px] rounded-lg px-2 py-[7px] text-[12.5px] text-[rgba(245,240,234,0.35)] transition-all duration-150 hover:bg-white/[0.04] hover:text-[var(--tm)]">
      {label}
    </div>
  )
}
