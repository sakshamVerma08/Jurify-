import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account — Jurify',
  description: 'Join Jurify — choose your role, create your account, and access India\'s professional legal network.',
}

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
