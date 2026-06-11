import { Skeleton } from '@/components/ui/Skeleton'

export default function DashboardLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <aside className="hidden w-[220px] shrink-0 border-r border-white/[0.07] p-4 md:block">
        <Skeleton className="mb-6 h-8 w-28" />
        <Skeleton className="mb-4 h-9 w-full rounded-[9px]" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="mb-2 h-9 w-full rounded-[9px]" />
        ))}
      </aside>
      <div className="flex flex-1 flex-col">
        <div className="flex h-[62px] items-center justify-between border-b border-white/[0.07] px-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 px-8 xl:grid-cols-2">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
