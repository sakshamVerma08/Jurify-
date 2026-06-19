// FILE: app/(app)/profile/page.tsx
// TYPE: Server Page Component

import { Suspense } from 'react'
import { ProfilePageContent } from '@/components/profile/ProfilePageContent'

import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/auth-helper'
import { prisma } from '@/lib/prisma/prisma'
import { ProfileData } from '@/types'
import { initialProfileState } from '@/lib/data/profile'

export const metadata = {
  title: 'My Profile — Jurify',
  description: 'Manage your profile details, professional details, notifications, appearance settings, and account security.',
}

export default async function ProfilePage() {
  const session = await requireAuth()
  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      clientProfile: true,
      lawyerProfile: true,
    },
  })

  if (!user) {
    redirect('/login')
  }

  // Map experience Int to string
  const expInt = user.lawyerProfile?.yearsOfExperience || 0
  let experienceStr = ''
  if (expInt === 0) experienceStr = 'Less than 1 year'
  else if (expInt === 1) experienceStr = '1–3 years'
  else if (expInt === 3) experienceStr = '3–5 years'
  else if (expInt === 5) experienceStr = '5–10 years'
  else if (expInt === 10) experienceStr = '10–20 years'
  else if (expInt === 20) experienceStr = '20+ years'

  // Map DB data to the shape ProfilePageContent expects
  const mappedData: ProfileData = {
    ...initialProfileState, // Fallback for any missing UI fields
    
    // Lawyer fields
    lawyerFirstName: user.lawyerProfile?.firstName || '',
    lawyerLastName: user.lawyerProfile?.lastName || '',
    lawyerEmail: user.email,
    lawyerPhone: user.lawyerProfile?.phone || '',
    lawyerDob: user.lawyerProfile?.dob ? user.lawyerProfile.dob.toISOString().split('T')[0] : '',
    lawyerCity: user.lawyerProfile?.city || '',
    lawyerState: user.lawyerProfile?.state || '',
    lawyerPhotoUrl: user.lawyerProfile?.photoUrl || null,
    
    enrollmentNo: user.lawyerProfile?.enrollmentNo || '',
    barState: user.lawyerProfile?.barCouncilState || '',
    enrollmentYear: user.lawyerProfile?.enrollmentYear?.toString() || '',
    degree: user.lawyerProfile?.degree || '',
    university: user.lawyerProfile?.university || '',
    experienceYears: experienceStr,
    primaryCourt: user.lawyerProfile?.primaryCourt || '',
    practiceAreas: user.lawyerProfile?.practiceAreas || [],
    languages: user.lawyerProfile?.languages || [],
    bio: user.lawyerProfile?.bio || '',
    isVerified: user.lawyerProfile?.isVerified || false,
    videoName: user.lawyerProfile?.videoKey || null,

    // Client fields
    clientFirstName: user.clientProfile?.firstName || '',
    clientLastName: user.clientProfile?.lastName || '',
    clientEmail: user.email,
    clientPhone: user.clientProfile?.phone || '',
    clientDob: user.clientProfile?.dob ? user.clientProfile.dob.toISOString().split('T')[0] : '',
    clientCity: user.clientProfile?.city || '',
    clientState: user.clientProfile?.state || '',
    clientPhotoUrl: user.clientProfile?.photoUrl || null,
  }

  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-[#080808] text-white/50">Loading profile settings...</div>}>
      <ProfilePageContent initialData={mappedData} userRole={user.role as 'LAWYER' | 'CLIENT'} />
    </Suspense>
  )
}
