'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma/prisma'
import { requireAuth } from '@/lib/auth/auth-helper'
import type { ProfileData } from '@/types'

export async function updateProfileAction(data: ProfileData, role: 'LAWYER' | 'CLIENT') {
  try {
    const session = await requireAuth()
    if (!session) {
      return { success: false, error: 'Unauthorized' }
    }

    const userId = session.user.id

    if (role === 'LAWYER') {
      // Map experience string back to int for storage
      let experienceInt = 0
      if (data.experienceYears === '1–3 years') experienceInt = 1
      else if (data.experienceYears === '3–5 years') experienceInt = 3
      else if (data.experienceYears === '5–10 years') experienceInt = 5
      else if (data.experienceYears === '10–20 years') experienceInt = 10
      else if (data.experienceYears === '20+ years') experienceInt = 20

      await prisma.lawyerProfile.update({
        where: { userId },
        data: {
          firstName: data.lawyerFirstName,
          lastName: data.lawyerLastName,
          displayName: `${data.lawyerFirstName} ${data.lawyerLastName}`,
          dob: data.lawyerDob ? new Date(data.lawyerDob) : null,
          city: data.lawyerCity,
          state: data.lawyerState,
          barCouncilState: data.barState,
          enrollmentYear: data.enrollmentYear ? parseInt(data.enrollmentYear) : null,
          degree: data.degree,
          university: data.university,
          yearsOfExperience: experienceInt,
          primaryCourt: data.primaryCourt,
          practiceAreas: data.practiceAreas,
          languages: data.languages,
          bio: data.bio,
        }
      })
    } else {
      await prisma.clientProfile.update({
        where: { userId },
        data: {
          firstName: data.clientFirstName,
          lastName: data.clientLastName,
          dob: data.clientDob ? new Date(data.clientDob) : null,
          city: data.clientCity,
          state: data.clientState,
        }
      })
    }

    revalidatePath('/profile')
    return { success: true }
  } catch (error: any) {
    console.error('Failed to update profile:', error)
    return { success: false, error: 'Failed to update profile' }
  }
}
