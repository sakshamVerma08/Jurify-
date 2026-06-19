'use server'

import { prisma as db } from '@/lib/prisma/prisma'
import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'

export async function getKycStatus(referenceNumber: string) {
  try {
    const application = await db.kycApplication.findUnique({
      where: { referenceNumber },
      include: {
        lawyer: true,
        documents: true,
        statusEvents: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!application) {
      return { success: false, error: 'Application not found' }
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(application)),
    }
  } catch (error) {
    console.error('[GET_KYC_STATUS_ERROR]', error)
    return { success: false, error: 'Internal server error' }
  }
}
