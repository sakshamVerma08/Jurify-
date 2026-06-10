// FILE: components/landing/AnimatedCounter.tsx
// TYPE: Client Component

'use client'

import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'

interface Props {
  value: number
  suffix?: string
  useThousands?: boolean
  className?: string
  duration?: number
}

function formatCount(count: number, useThousands: boolean, suffix: string): string {
  if (useThousands) {
    return `${count}K${suffix}`
  }
  return `${count.toLocaleString('en-IN')}${suffix}`
}

export function AnimatedCounter({
  value,
  suffix = '',
  useThousands = false,
  className,
  duration = 1500,
}: Props) {
  const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>({
    threshold: 0.5,
    triggerOnce: true,
  })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const target = useThousands ? value : value
    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isVisible, value, duration, useThousands])

  return (
    <span ref={ref} className={cn(className)}>
      {isVisible ? formatCount(count, useThousands, suffix) : `0${suffix}`}
    </span>
  )
}
