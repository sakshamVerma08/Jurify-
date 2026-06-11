// FILE: components/layout/Navbar.tsx
// TYPE: Server Component

import type { ReactNode } from 'react'
import Link from 'next/link'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'
import { NavAuthButtons } from '@/components/layout/NavAuthButtons'
import { NavLinks } from '@/components/layout/NavLinks'
import { NavMobileMenu } from '@/components/layout/NavMobileMenu'

export function Navbar({ rightSlot }: { rightSlot?: ReactNode }) {
  return (
    <header>
      <nav
        aria-label="Main navigation"
        className="nav-blur fixed inset-x-0 top-0 z-[200] flex h-[68px] items-center justify-between border-b border-white/[0.07] px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5 no-underline">
          <div className="flex h-9 w-9 items-center justify-center rounded-[9px] border-[1.5px] border-[rgba(212,133,58,0.5)] bg-gradient-to-br from-[rgba(212,133,58,0.25)] to-[rgba(200,98,42,0.1)]">
            <JurifyLogoIcon />
          </div>
          <span className="font-serif text-[22px] font-semibold tracking-[0.5px] text-[var(--t)]">
            Jurify
          </span>
        </Link>

        <NavLinks className="hidden lg:flex" />

        <div className="hidden items-center gap-2.5 lg:flex">
          {rightSlot ?? <NavAuthButtons />}
        </div>

        <NavMobileMenu />
      </nav>
    </header>
  )
}
