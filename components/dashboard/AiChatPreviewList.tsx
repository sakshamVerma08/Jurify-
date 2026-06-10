// FILE: components/dashboard/AiChatPreviewList.tsx
// TYPE: Server Component

import Link from 'next/link'
import { AI_CHAT_PREVIEWS } from '@/lib/data/dashboard'

export function AiChatPreviewList() {
  return (
    <div className="flex flex-col gap-[7px]">
      {AI_CHAT_PREVIEWS.map((chat) => (
        <Link
          key={chat.id}
          href="/ai-assistant"
          className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 no-underline transition-colors duration-150 hover:border-og/20"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-og/20 bg-og/10 text-xs">
            ✦
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium text-[var(--t)]">{chat.title}</p>
            <p className="mt-0.5 text-[11px] text-[var(--td)]">{chat.subtitle}</p>
          </div>
          <span className="shrink-0 text-[10.5px] text-[var(--td)]">{chat.time}</span>
        </Link>
      ))}
    </div>
  )
}
