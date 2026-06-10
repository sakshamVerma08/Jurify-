// FILE: components/lawyer-profile/ProfileSectionCard.tsx
// TYPE: Server Component

interface ProfileSectionCardProps {
  tag: string
  title: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function ProfileSectionCard({ tag, title, action, children, className }: ProfileSectionCardProps) {
  return (
    <section
      className={`mb-5 rounded-[18px] border border-white/[0.07] bg-card px-[30px] py-7 transition-colors duration-200 hover:border-white/[0.11] max-md:px-5 ${className ?? ''}`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[1.2px] text-og">{tag}</p>
          <h2 className="font-serif text-[22px] font-normal tracking-[-0.2px] text-[var(--t)]">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
