import type { Metadata } from 'next'
import { cormorant, outfit } from '@/app/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jurify — Professional Legal Network for India',
  description:
    'Connect with verified lawyers, discover pro bono opportunities, and use AI-powered legal assistance on India\'s professional legal network.',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  )
}
