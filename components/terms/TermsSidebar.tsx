// FILE: components/terms/TermsSidebar.tsx
// TYPE: Client Component

'use client'

import { useEffect, useState } from 'react'
import { TOC_ITEMS } from '@/lib/data/terms'

export function TermsSidebar() {
  const [activeId, setActiveId] = useState('s1')

  useEffect(() => {
    const sections = document.querySelectorAll('.tc-section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-68px 0px -60% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => sections.forEach((s) => observer.unobserve(s))
  }, [])

  return (
    <aside className="sticky top-[68px] hidden h-[calc(100vh-68px)] overflow-y-auto border-r border-white/[0.06] py-10 pr-7 md:block">
      <div className="pt-9">
        <div className="text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.28)] mb-3.5">
          Contents
        </div>
        <nav className="flex flex-col gap-[2px]">
          {TOC_ITEMS.map((item) => {
            const isActive = activeId === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-start gap-2.5 rounded-lg border-l-2 py-2 px-2.5 text-[12.5px] leading-snug no-underline transition-all duration-180 ${isActive
                    ? 'border-l-[var(--og)] bg-[rgba(212,133,58,0.07)] text-[var(--o2)]'
                    : 'border-l-transparent text-[rgba(245,240,234,0.38)] hover:border-l-[rgba(255,255,255,0.1)] hover:bg-white/[0.03] hover:text-[var(--tm)]'
                  }`}
              >
                <span
                  className={`text-[10px] shrink-0 mt-0.5 min-w-[16px] ${isActive ? 'text-[rgba(212,133,58,0.6)]' : 'text-[rgba(245,240,234,0.2)]'
                    }`}
                >
                  {item.num}
                </span>
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
