// FILE: app/(auth)/kyc/loading.tsx
// TYPE: Server Component

import { Skeleton } from '@/components/ui/Skeleton'

export default function KycLoading() {
  return (
    <div className="min-h-screen bg-bg pt-[68px]">
      <div className="fixed left-0 right-0 top-0 z-[200] flex h-[68px] items-center justify-between border-b border-white/[0.07] bg-[rgba(10,10,9,0.92)] px-8">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[300px_1fr]">
        <aside className="hidden border-r border-white/[0.06] px-8 py-10 lg:block">
          <Skeleton className="mb-4 h-3 w-32" />
          <Skeleton className="mb-2 h-9 w-48" />
          <Skeleton className="mb-8 h-16 w-full" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="mb-2 h-[72px] w-full rounded-xl" />
          ))}
        </aside>

        <main className="px-6 py-10 md:px-10 lg:px-14 lg:py-12">
          <Skeleton className="mb-3 h-3 w-20" />
          <Skeleton className="mb-2 h-10 w-72" />
          <Skeleton className="mb-9 h-4 w-full max-w-md" />
          <Skeleton className="mb-6 h-4 w-40" />
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Skeleton className="h-12 w-full rounded-[10px]" />
            <Skeleton className="h-12 w-full rounded-[10px]" />
            <Skeleton className="h-12 w-full rounded-[10px]" />
          </div>
          <Skeleton className="h-12 w-full rounded-[10px]" />
        </main>
      </div>
    </div>
  )
}
