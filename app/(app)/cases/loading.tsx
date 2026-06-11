import { Skeleton } from '@/components/ui/Skeleton'

export default function CasesLoading() {
  return (
    <div className="min-h-screen bg-bg pt-[68px]">
      <div className="border-b border-white/[0.06] px-[60px] pb-9 pt-[52px] max-md:px-6">
        <Skeleton className="mb-3.5 h-7 w-36 rounded-full" />
        <Skeleton className="mb-2 h-12 w-[420px] max-w-full" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <div className="border-b border-white/[0.06] px-[60px] py-4 max-md:px-6">
        <Skeleton className="h-10 w-52 rounded-[10px]" />
      </div>

      <div className="grid grid-cols-1 gap-7 px-[60px] pb-[60px] pt-8 lg:grid-cols-[280px_1fr] max-md:px-6">
        <aside className="space-y-4 rounded-2xl border border-white/[0.07] bg-card p-5">
          <Skeleton className="h-4 w-20" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-lg" />
          ))}
        </aside>
        <div className="space-y-4">
          <Skeleton className="h-11 w-full max-w-[400px] rounded-[10px]" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
