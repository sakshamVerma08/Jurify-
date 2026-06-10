// FILE: app/loading.tsx
// TYPE: Server Component

import { Skeleton } from '@/components/ui/Skeleton'

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-bg">
      <Skeleton className="fixed inset-x-0 top-0 z-[200] h-[68px] rounded-none" />
      <div className="pt-[68px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-12 lg:grid-cols-2 lg:px-14">
          <div className="space-y-6">
            <Skeleton className="h-8 w-56 rounded-full" />
            <Skeleton className="h-16 w-full max-w-lg" />
            <Skeleton className="h-5 w-full max-w-sm" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-48 rounded-xl" />
              <Skeleton className="h-12 w-48 rounded-xl" />
            </div>
          </div>
          <Skeleton className="h-[420px] w-full rounded-[18px]" />
        </div>
      </div>
    </div>
  )
}
