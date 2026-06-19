import { cn } from '@/lib/utils'

export function CaseCardSkeleton({ index = 0 }: { index?: number }) {
  const animClass = `case-card-in-${(index % 6) + 1}`

  return (
    <article
      className={cn(
        'case-card-in relative overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-[22px_24px]',
        animClass
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-[7px]">
          <div className="h-6 w-20 animate-pulse rounded-full bg-white/5" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-white/5" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-white/10" />
        </div>
        <div className="h-5 w-5 animate-pulse rounded bg-white/5" />
      </div>

      <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-white/5" />
      <div className="mb-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-white/5" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-white/5" />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-5">
        <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
        <div className="h-3 w-28 animate-pulse rounded bg-white/5" />
        <div className="h-3 w-32 animate-pulse rounded bg-white/5" />
        <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
      </div>

      <div className="mb-4 h-px bg-white/[0.05]" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="h-[30px] w-[30px] shrink-0 animate-pulse rounded-full bg-white/10" />
          <div className="space-y-1.5">
            <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
            <div className="h-2.5 w-16 animate-pulse rounded bg-white/5" />
          </div>
        </div>
        <div className="flex items-center gap-[7px]">
          <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
        </div>
        <div className="h-[34px] w-[90px] animate-pulse rounded-xl bg-white/10" />
      </div>
    </article>
  )
}
