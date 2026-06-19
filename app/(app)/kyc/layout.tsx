import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/auth-helper'
import { prisma } from '@/lib/prisma/prisma'

export default async function KycLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAuth()

  // The (app) layout already handles the redirect to /login if !session,
  // but it's safe to check here as well before accessing session.user
  if (!session || !session.user) {
    redirect('/login')
  }

  // Fetch the role directly from Prisma to bypass any better-auth session caching or field stripping issues
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  // Only lawyers can access the KYC section
  if (dbUser?.role !== 'LAWYER') {
    redirect('/dashboard')
  }

  return <>{children}</>
}
