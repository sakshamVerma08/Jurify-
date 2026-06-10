import { Skeleton } from '@/components/ui/Skeleton'

export default function AiAssistantLoading() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg">
      <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-white/[0.07] px-7">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-7 w-40 rounded-lg" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[260px] shrink-0 border-r border-white/[0.07] p-3.5 md:block">
          <Skeleton className="mb-3 h-10 w-full rounded-[10px]" />
          <Skeleton className="mb-4 h-9 w-full rounded-[9px]" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="mb-2 h-12 w-full rounded-[9px]" />
          ))}
        </aside>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
          <Skeleton className="h-14 w-14 rounded-[15px]" />
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-16 w-full max-w-[500px]" />
          <Skeleton className="h-40 w-full max-w-[500px] rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
