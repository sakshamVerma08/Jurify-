'use server'

import { prisma } from '@/lib/prisma/prisma'
import type { LawyerListing } from '@/types'
import { requireAuth } from '@/lib/auth/auth-helper'
import { mapLawyerProfileToListing } from '@/lib/data/lawyerSearch'

export async function getLawyersAction(): Promise<{ success: boolean; data?: LawyerListing[]; error?: string }> {
  try {
    const session = await requireAuth()
    const profiles = await prisma.lawyerProfile.findMany({
      where: {
        isSearchable: true,
        ...(session?.user?.id ? { userId: { not: session.user.id } } : {}),
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        reputationPoints: 'desc',
      },
    })

    const listings: LawyerListing[] = profiles.map(mapLawyerProfileToListing)


    return { success: true, data: listings }
  } catch (error: any) {
    console.error('Failed to fetch lawyers:', error)
    return { success: false, error: error.message || 'Failed to fetch lawyers' }
  }
}

