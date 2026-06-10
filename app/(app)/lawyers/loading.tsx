// FILE: app/(app)/lawyers/loading.tsx
// TYPE: Server Component

import { Skeleton } from '@/components/ui/Skeleton'

export default function LawyersLoading() {
  return (
    <div className="min-h-screen bg-bg pt-[68px]">
      <div className="border-b border-white/[0.06] px-8 py-12 pb-9 max-lg:px-6">
        <Skeleton className="mb-3.5 h-7 w-48 rounded-full" />
        <Skeleton className="mb-2 h-12 w-[360px] max-w-full" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-white/[0.06] px-7 py-8 lg:block">
          <Skeleton className="mb-5 h-4 w-20" />
          <Skeleton className="mb-5 h-10 w-full rounded-[10px]" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="mb-4 h-24 w-full rounded-xl" />
          ))}
        </aside>
        <main className="px-6 py-8 lg:px-12">
          <Skeleton className="mb-7 h-10 w-full max-w-md" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-[18px]" />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
