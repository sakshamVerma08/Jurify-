import { CasesPageContent } from '@/components/cases/CasesPageContent'
import { Navbar } from '@/components/layout/Navbar'
import { Toast } from '@/components/ui/Toast'

import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/auth-helper'
import { prisma } from '@/lib/prisma/prisma'

export const dynamic = 'force-dynamic'

export default async function CasesPage() {
  const session = await requireAuth()
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (!user) redirect('/login')

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-[68px]">
        <CasesPageContent userRole={user.role as 'LAWYER' | 'CLIENT'} />
      </div>
      <Toast />
    </>
  )
}
