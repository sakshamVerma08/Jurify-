// FILE: components/dashboard/DashboardNotificationList.tsx
// TYPE: Server Component

import { cn } from '@/lib/utils'
import type { DashboardNotification } from '@/types'

const ICON_CLASSES = {
  case: 'bg-og/10 border-og/20',
  msg: 'bg-[rgba(100,150,255,0.1)] border-[rgba(100,150,255,0.2)]',
  system: 'bg-success/10 border-success/20',
  alert: 'bg-danger/10 border-danger/20',
}

export function DashboardNotificationList({ items }: { items: DashboardNotification[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            'flex cursor-pointer items-start gap-2.5 rounded-[10px] px-3 py-2.5 transition-colors duration-150 hover:bg-white/[0.03]',
            item.unread && 'border-l-2 border-og/30 bg-og/[0.04]'
          )}
        >
          <div
            className={cn(
              'flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg border',
              ICON_CLASSES[item.icon]
            )}
          >
            <NotifIcon type={item.icon} />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-[12.5px] leading-relaxed text-[var(--tm)] [&_strong]:font-medium [&_strong]:text-[var(--t)]"
              dangerouslySetInnerHTML={{ __html: item.html }}
            />
            <p className="mt-[3px] text-[10.5px] text-[var(--td)]">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function NotifIcon({ type }: { type: DashboardNotification['icon'] }) {
  if (type === 'msg') {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M1 2h11v8H7.5L4 12V10H1V2z" stroke="rgba(120,180,255,0.8)" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'system') {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5l2.2 2.2L11 3" stroke="#4ade80" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'alert') {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M6.5 2L11.5 11H1.5L6.5 2z" stroke="rgba(240,130,100,0.8)" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="#D4853A" strokeWidth="1" />
    </svg>
  )
}
