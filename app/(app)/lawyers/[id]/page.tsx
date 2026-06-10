// FILE: app/(app)/lawyer-profile/page.tsx
// TYPE: Client Component shell
// RENDERING: CSR — profile interactions, calendar, connect toggle

import React, { Suspense } from 'react'
import { LawyerProfilePageContent } from '@/components/lawyer-profile/LawyerProfilePageContent'
import { Navbar } from '@/components/layout/Navbar'
import { Toast } from '@/components/ui/Toast'

export default async function LawyerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  return (
    <div className="profile-page-bg min-h-screen bg-bg">
      <Navbar />
      <Toast />
      <div className="relative z-[1] pt-[68px]">
        <Suspense fallback={<div className="min-h-screen bg-[#080808] text-[var(--td)] flex items-center justify-center">Loading Profile...</div>}>
          <LawyerProfilePageContent lawyerId={resolvedParams.id} />
        </Suspense>
      </div>
    </div>
  )
}
