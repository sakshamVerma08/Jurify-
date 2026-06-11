// FILE: components/layout/Footer.tsx
// TYPE: Server Component

import Link from 'next/link'
import { FOOTER_LINKS } from '@/lib/data/landing'

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] px-6 py-9 sm:flex-row sm:px-10 lg:px-[60px]">
      <span className="font-serif text-xl font-semibold text-[var(--t)]">Jurify</span>
      <span className="text-xs text-[var(--td)]">© 2026 · Built for legal accessibility</span>
      <div className="flex gap-6">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="text-xs text-[var(--td)] no-underline transition-colors duration-200 hover:text-[var(--t)]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
