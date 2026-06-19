// FILE: app/(auth)/kyc/page.tsx
// TYPE: Client Component shell
// RENDERING: CSR — multi-step KYC wizard, file uploads, validation

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma/prisma'
import { requireAuth } from '@/lib/auth/auth-helper'
import { KycPageContent } from '@/components/kyc/KycPageContent'
import { KycNavbar } from '@/components/kyc/KycNavbar'
import { KycSubmittedStatus } from '@/components/kyc/KycSubmittedStatus'
import { Toast } from '@/components/ui/Toast'

export default async function KycPage() {
  const session = await requireAuth()
  if (!session) redirect('/login')

  const lawyerProfile = await prisma.lawyerProfile.findUnique({
    where: { userId: session.user.id }
  })

  let existingApp = null
  if (lawyerProfile) {
    existingApp = await prisma.kycApplication.findFirst({
      where: { lawyerId: lawyerProfile.id }
    })
  }

  return (
    <div className="min-h-screen bg-bg pt-[68px]">
      <Toast />
      <KycNavbar />
      {existingApp ? (
        <KycSubmittedStatus referenceNumber={existingApp.referenceNumber} status={existingApp.status} />
      ) : (
        <KycPageContent />
      )}
    </div>
  )
}
