import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find Lawyers — Jurify',
  description: 'Browse verified advocates across 18+ practice areas. Connect directly or explore pro bono availability on Jurify.',
}

export default function LawyersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
