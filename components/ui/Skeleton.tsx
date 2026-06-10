// FILE: components/ui/Skeleton.tsx
// TYPE: Server Component

import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export function Skeleton({ className }: Props) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-white/5', className)}
    />
  )
}
