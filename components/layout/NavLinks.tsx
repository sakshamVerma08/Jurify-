// FILE: components/layout/NavLinks.tsx
// TYPE: Server Component

import Link from 'next/link'
import { NAV_LINKS } from '@/lib/data/landing'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

function NavIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'cases':
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="4.5" y1="5.5" x2="10.5" y2="5.5" stroke="currentColor" strokeWidth="1" />
          <line x1="4.5" y1="8" x2="8.5" y2="8" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    case 'lawyer':
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.2" />
          <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )
    case 'ai':
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M7 1l1.5 4H13L9.5 7.5 11 12 7 9.5 3 12l1.5-4.5L1 5h4.5L7 1z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'dashboard':
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
          <rect x="8.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
          <rect x="1.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
          <rect x="8.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      )
    case 'insights':
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M3 2h9v11H3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <line x1="5" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1" />
          <line x1="5" y1="7.5" x2="10" y2="7.5" stroke="currentColor" strokeWidth="1" />
          <line x1="5" y1="10" x2="8" y2="10" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    default:
      return null
  }
}

export function NavLinks({ className }: Props) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {NAV_LINKS.map((link) => {
        if (link.variant === 'ai') {
          return (
            <div key={link.id} className="flex items-center">
              <div className="mx-1 hidden h-5 w-px bg-white/10 lg:block" />
              <Link
                href={link.href}
                className="flex items-center gap-[7px] rounded-lg border border-[rgba(212,133,58,0.2)] bg-[rgba(212,133,58,0.08)] px-3.5 py-[7px] text-[13.5px] font-medium text-o2 transition-all duration-200 hover:border-[rgba(212,133,58,0.38)] hover:bg-[rgba(212,133,58,0.14)] hover:text-[var(--t)]"
              >
                <NavIcon icon={link.icon} />
                {link.label}
                <span className="nav-ai-badge rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.8px] text-black">
                  NEW
                </span>
              </Link>
            </div>
          )
        }

        return (
          <Link
            key={link.id}
            href={link.href}
            className="flex items-center gap-[7px] whitespace-nowrap rounded-lg px-3.5 py-[7px] text-[13.5px] font-normal text-[var(--tm)] transition-all duration-200 hover:bg-white/5 hover:text-[var(--t)] [&_svg]:opacity-65 hover:[&_svg]:opacity-100"
          >
            <NavIcon icon={link.icon} />
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}
