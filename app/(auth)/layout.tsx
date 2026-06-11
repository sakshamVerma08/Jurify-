import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In — Jurify',
  description: 'Sign in to your Jurify account to access cases, your network, and the AI legal assistant.',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
