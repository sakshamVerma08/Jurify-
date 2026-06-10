// FILE: components/dashboard/DashboardMessageList.tsx
// TYPE: Server Component

import { cn } from '@/lib/utils'
import type { DashboardMessage } from '@/types'

export function DashboardMessageList({ messages }: { messages: DashboardMessage[] }) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn(
            'flex cursor-pointer items-start gap-2.5 rounded-[10px] px-3 py-2.5 transition-colors duration-150 hover:bg-white/[0.03]',
            msg.unread && 'border border-og/10 bg-og/[0.05]'
          )}
        >
          <div
            className={cn(
              'flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border-[1.5px] font-serif text-sm font-semibold',
              msg.avatarStyle === 'support'
                ? 'border-[rgba(100,150,255,0.3)] bg-[rgba(100,150,255,0.12)] text-[rgba(120,180,255,0.9)] text-[11px]'
                : 'border-og/25 bg-og/15 text-og'
            )}
          >
            {msg.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-[3px] flex items-center justify-between">
              <span className="text-[13px] font-medium text-[var(--t)]">{msg.name}</span>
              <span className="text-[10.5px] text-[var(--td)]">{msg.time}</span>
            </div>
            <p
              className={cn(
                'truncate text-xs font-light text-[var(--tm)]',
                msg.unread && 'text-[rgba(245,240,234,0.65)]'
              )}
            >
              {msg.preview}
            </p>
          </div>
          {msg.unread && (
            <span className="mt-1 h-[7px] w-[7px] shrink-0 rounded-full bg-og shadow-[0_0_6px_rgba(212,133,58,0.5)]" />
          )}
        </div>
      ))}
    </div>
  )
}
