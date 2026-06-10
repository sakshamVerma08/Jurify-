// FILE: app/(marketing)/terms/loading.tsx
// TYPE: Server Component

import { Skeleton } from '@/components/ui/Skeleton'

export default function TermsLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-[68px]">
      {/* Hero Band Skeleton */}
      <div className="border-b border-white/[0.06] bg-gradient-to-b from-[rgba(212,133,58,0.04)] to-transparent px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-[860px]">
          <Skeleton className="mb-4 h-6 w-32 rounded-full" />
          <Skeleton className="mb-4 h-14 w-3/4" />
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-5 w-40" />
            <div className="h-3.5 w-[1px] bg-white/10" />
            <Skeleton className="h-5 w-24" />
            <div className="h-3.5 w-[1px] bg-white/10" />
            <Skeleton className="h-6 w-48 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content Layout Skeleton */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-0 px-6 sm:px-12 md:grid-cols-[240px_1fr]">
        {/* Sidebar Skeleton */}
        <aside className="sticky top-[68px] hidden h-[calc(100vh-68px)] overflow-y-auto border-r border-white/[0.06] py-10 pr-7 md:block">
          <div className="pt-9">
            <Skeleton className="mb-4 h-4 w-20" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1">
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Skeleton */}
        <main className="py-12 pl-0 md:pl-12">
          {/* Callout Skeleton */}
          <div className="mb-10 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
            <div className="flex gap-4">
              <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          </div>

          {/* Section Skeletons */}
          {Array.from({ length: 3 }).map((_, sIdx) => (
            <div key={sIdx} className="mb-14">
              <div className="mb-6 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-5 w-2/3" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              {sIdx === 0 && (
                <div className="mt-8 space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              )}
              {sIdx > 0 && (
                <div className="mt-8 space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}
