import { Skeleton } from '@/components/ui/Skeleton'

export default function InsightsLoading() {
  return (
    <>
      <div className="border-b border-white/[0.06] px-8 py-14 pb-10 max-lg:px-6">
        <Skeleton className="mb-4 h-7 w-56 rounded-full" />
        <Skeleton className="mb-3 h-14 w-[420px] max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="border-b border-white/[0.06] px-8 py-4 max-lg:px-6">
        <Skeleton className="h-10 w-full max-w-2xl" />
      </div>
      <div className="mx-auto max-w-[1240px] px-8 py-10 max-lg:px-6">
        <Skeleton className="mb-12 h-72 w-full rounded-[22px]" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-[18px]" />
          ))}
        </div>
      </div>
    </>
  )
}
