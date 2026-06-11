// FILE: app/(app)/lawyer-profile/loading.tsx
// TYPE: Server Component

import { Skeleton } from '@/components/ui/Skeleton'

export default function LawyerProfileLoading() {
  return (
    <div className="min-h-screen bg-bg pt-[68px]">
      <Skeleton className="h-[220px] w-full rounded-none" />
      <div className="px-6 pt-6 lg:px-[52px]">
        <div className="-mt-14 mb-6 flex items-end justify-between">
          <Skeleton className="h-28 w-28 rounded-full" />
          <Skeleton className="h-11 w-48 rounded-[10px]" />
        </div>
        <Skeleton className="mb-2 h-9 w-80 max-w-full" />
        <Skeleton className="mb-4 h-4 w-64" />
        <div className="mb-8 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-24 rounded-full" />
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-6 pb-20 lg:grid-cols-[1fr_340px] lg:px-[52px]">
        <div className="space-y-5">
          <Skeleton className="h-36 w-full rounded-[18px]" />
          <Skeleton className="h-64 w-full rounded-[18px]" />
          <Skeleton className="h-48 w-full rounded-[18px]" />
        </div>
        <div className="space-y-5">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
