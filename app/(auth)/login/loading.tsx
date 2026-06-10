// FILE: app/(auth)/login/loading.tsx
// TYPE: Server Component

import { Skeleton } from '@/components/ui/Skeleton'

export default function LoginLoading() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-bg">
      <div className="login-bg-layer fixed inset-0 z-0" aria-hidden="true" />
      <div className="login-bg-grid fixed inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[420px] p-5">
        <div className="rounded-[22px] border border-white/[0.09] bg-[rgba(14,13,11,0.95)] px-9 pb-9 pt-10 backdrop-blur-[20px]">
          <div className="mb-7 flex items-center justify-center gap-2.5">
            <Skeleton className="h-[38px] w-[38px] rounded-[10px]" />
            <Skeleton className="h-7 w-20" />
          </div>
          <Skeleton className="mx-auto mb-2 h-9 w-48" />
          <Skeleton className="mx-auto mb-7 h-4 w-72" />

          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-[46px] w-full rounded-[11px]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-[46px] w-full rounded-[11px]" />
            </div>
            <Skeleton className="mt-2 h-[50px] w-full rounded-[11px]" />
          </div>

          <div className="my-[22px] flex items-center gap-3">
            <Skeleton className="h-px flex-1" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-px flex-1" />
          </div>

          <Skeleton className="h-[46px] w-full rounded-[11px]" />
          <Skeleton className="mx-auto mt-[22px] h-4 w-52" />
        </div>

        <div className="mt-6 space-y-2 text-center">
          <Skeleton className="mx-auto h-3 w-64" />
          <Skeleton className="mx-auto h-3 w-40" />
        </div>
      </div>
    </div>
  )
}
