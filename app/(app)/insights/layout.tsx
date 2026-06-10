import type { Metadata } from 'next'
import { InsightsNavActions } from '@/components/insights/InsightsNavActions'
import { Navbar } from '@/components/layout/Navbar'
import { Toast } from '@/components/ui/Toast'

export const metadata: Metadata = {
  title: 'Legal Insights — Jurify',
  description:
    'Plain-language legal guides, analysis, and commentary written by Jurify verified advocates. Understand your rights for free.',
}

export default function InsightsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="insights-bg min-h-screen bg-bg">
      <Navbar rightSlot={<InsightsNavActions />} />
      <Toast />

      <div className="relative z-[1] pt-[68px]">
        {children}
      </div>
    </div>
  )
}
