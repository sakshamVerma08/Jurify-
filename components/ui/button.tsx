// FILE: components/ui/Button.tsx
// TYPE: Server Component

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: React.ReactNode
  className?: string
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'btn-gradient-primary relative overflow-hidden text-white rounded-xl px-7 py-[15px] text-[14.5px] font-medium transition-all duration-200 hover:opacity-93 hover:-translate-y-0.5',
  secondary:
    'bg-white/5 text-[var(--t)] border border-white/[0.14] rounded-xl px-7 py-[15px] text-[14.5px] font-normal transition-all duration-200 hover:bg-white/[0.09] hover:border-white/[0.24]',
  ghost:
    'text-[var(--tm)] bg-transparent rounded-lg px-[18px] py-2 text-[13.5px] font-normal transition-all duration-200 hover:text-[var(--t)] hover:bg-white/5',
}

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 font-sans cursor-pointer',
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
