// FILE: components/dashboard/DashboardConsultationList.tsx
// TYPE: Server Component

import { cn } from '@/lib/utils'
import type { DashboardConsultation } from '@/types'

export function DashboardConsultationList({ items }: { items: DashboardConsultation[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex cursor-pointer items-center gap-3 rounded-[10px] border border-white/[0.06] bg-white/[0.03] px-3.5 py-[11px] transition-colors duration-150 hover:border-og/20"
        >
          <div className="w-11 shrink-0 text-center">
            <p className="text-[13px] font-semibold text-[var(--t)]">{item.time}</p>
            <p className="text-[10px] text-[var(--td)]">{item.ampm}</p>
          </div>
          <div className="h-8 w-px shrink-0 bg-white/[0.07]" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-[var(--t)]">{item.name}</p>
            <p className="mt-0.5 text-[11px] text-[var(--td)]">{item.type}</p>
          </div>
          <span
            className={cn(
              'shrink-0 rounded-full border px-[9px] py-[3px] text-[10.5px]',
              item.status === 'confirmed' &&
                'border-success/25 bg-success/10 text-success',
              item.status === 'pending' && 'border-warn/25 bg-warn/10 text-warn'
            )}
          >
            {item.status === 'confirmed' ? 'Confirmed' : 'Pending'}
          </span>
        </div>
      ))}
    </div>
  )
}
