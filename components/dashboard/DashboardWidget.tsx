// FILE: components/dashboard/DashboardWidget.tsx
// TYPE: Server Component

interface DashboardWidgetProps {
  title: string
  subtitle?: string
  actionLabel?: string
  actionHref?: string
  onActionClick?: () => void
  children: React.ReactNode
}

export function DashboardWidget({
  title,
  subtitle,
  actionLabel,
  actionHref,
  onActionClick,
  children,
}: DashboardWidgetProps) {
  return (
    <section className="dash-card-in rounded-2xl border border-white/[0.07] bg-card p-[22px]">
      <div className="mb-[18px] flex items-center justify-between">
        <div>
          <h3 className="text-[14.5px] font-semibold text-[var(--t)]">{title}</h3>
          {subtitle && <p className="mt-0.5 text-[11.5px] text-[var(--td)]">{subtitle}</p>}
        </div>
        {actionLabel && (
          onActionClick ? (
            <button
              type="button"
              onClick={onActionClick}
              className="rounded-[7px] border border-og/20 bg-og/[0.08] px-3 py-[5px] font-sans text-xs text-og no-underline transition-all duration-150 hover:border-og/35 hover:bg-og/[0.16]"
            >
              {actionLabel}
            </button>
          ) : (
            <a
              href={actionHref ?? '#'}
              className="rounded-[7px] border border-og/20 bg-og/[0.08] px-3 py-[5px] font-sans text-xs text-og no-underline transition-all duration-150 hover:border-og/35 hover:bg-og/[0.16]"
            >
              {actionLabel}
            </a>
          )
        )}
      </div>
      {children}
    </section>
  )
}
