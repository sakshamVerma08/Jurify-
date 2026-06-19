'use server'

import { prisma } from '@/lib/prisma/prisma'
import type { LawyerListing } from '@/types'
import { mapLawyerProfileToListing } from '@/lib/data/lawyerSearch'

export async function getLawyerProfileAction(id: string): Promise<{ success: boolean; data?: LawyerListing; error?: string }> {
  try {
    const profile = await prisma.lawyerProfile.findUnique({
      where: {
        id,
      },
    })

    if (!profile) {
      return { success: false, error: 'Lawyer profile not found' }
    }

    const listing = mapLawyerProfileToListing(profile)

    return { success: true, data: listing }
  } catch (error: any) {
    console.error('Failed to fetch lawyer profile:', error)
    return { success: false, error: error.message || 'Failed to fetch lawyer profile' }
  }
}
