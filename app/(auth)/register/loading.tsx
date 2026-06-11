// FILE: app/(auth)/register/loading.tsx
// TYPE: Server Component

import { Skeleton } from '@/components/ui/Skeleton'

export default function RegisterLoading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-bg px-5 py-6">
      <div className="register-bg-layer pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <div className="login-bg-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center p-5">
        <div className="mb-7 flex items-center gap-2.5">
          <Skeleton className="h-[38px] w-[38px] rounded-[10px]" />
          <Skeleton className="h-7 w-20" />
        </div>

        <div className="mb-7 flex w-full max-w-[260px] items-center justify-between">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-7 w-7 rounded-full" />
              <Skeleton className="h-2.5 w-10" />
            </div>
          ))}
        </div>

        <div className="w-full rounded-[22px] border border-white/[0.08] bg-[rgba(14,13,11,0.96)] px-9 pb-[34px] pt-[38px] backdrop-blur-[20px]">
          <Skeleton className="mb-2 h-3 w-32" />
          <Skeleton className="mb-2 h-9 w-48" />
          <Skeleton className="mb-7 h-4 w-full max-w-sm" />

          <div className="mb-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-44 w-full rounded-2xl" />
          </div>

          <Skeleton className="h-[50px] w-full rounded-[11px]" />
        </div>

        <div className="mt-5 space-y-2 text-center">
          <Skeleton className="mx-auto h-3 w-72" />
          <Skeleton className="mx-auto h-3 w-56" />
        </div>
      </div>
    </div>
  )
}
