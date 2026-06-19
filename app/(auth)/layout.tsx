import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/auth-helper'

export const metadata: Metadata = {
  title: 'Sign In — Jurify',
  description: 'Sign in to your Jurify account to access cases, your network, and the AI legal assistant.',
}

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // If the user is already logged in, they shouldn't be on the auth pages!
  // Bounce them to the landing page.
  const session = await requireAuth()
  if (session) {
    redirect('/')
  }

  return children
}
