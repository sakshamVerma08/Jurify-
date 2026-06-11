// FILE: components/kyc/KycStepHeader.tsx
// TYPE: Server Component

interface KycStepHeaderProps {
  step: number
  title: React.ReactNode
  subtitle: string
}

export function KycStepHeader({ step, title, subtitle }: KycStepHeaderProps) {
  return (
    <header className="mb-9">
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-og">Step {step} of 4</p>
      <h1 className="mb-2 font-serif text-[40px] font-light leading-[1.08] tracking-[-0.8px] text-[var(--t)] max-md:text-[32px]">
        {title}
      </h1>
      <p className="max-w-[540px] text-sm font-light leading-relaxed text-[var(--tm)]">{subtitle}</p>
    </header>
  )
}
