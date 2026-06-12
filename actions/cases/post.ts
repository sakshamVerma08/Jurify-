'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma/prisma'
import { requireAuth } from '@/lib/auth/auth-helper'
import { postCaseSchema, type PostCaseFormData } from '@/lib/validations/case'
import { CaseStage } from '@prisma/client'

/**
 * Maps the frontend form string stage to the Prisma Enum CaseStage
 */
function mapStage(stage: string): CaseStage {
  switch (stage) {
    case 'Initial Consultation':
      return CaseStage.INITIAL_CONSULTATION
    case 'Investigation':
      return CaseStage.INVESTIGATION
    case 'Pre-Hearing / Filing':
      return CaseStage.PRE_HEARING
    case 'Trial':
      return CaseStage.TRIAL
    case 'Appeal':
      return CaseStage.APPEAL
    default:
      return CaseStage.INITIAL_CONSULTATION
  }
}

export async function postCaseAction(data: PostCaseFormData) {
  try {
    // 1. Authenticate the user securely via session
    const session = await requireAuth()
    if (!session) {
      return { success: false, error: 'Unauthorized. Please log in.' }
    }

    // 2. Optional: Check if user is a client, as lawyers shouldn't post cases
    // if (session.user.role !== 'CLIENT') {
    //   return { success: false, error: 'Only clients can post cases.' }
    // }

    // 3. Validate the incoming data strictly using our Zod schema
    const parsedData = postCaseSchema.safeParse(data)
    if (!parsedData.success) {
      // If validation fails, return the first error message
      const errorMsg = parsedData.error.issues[0]?.message || 'Invalid form data'
      return { success: false, error: errorMsg }
    }

    const validData = parsedData.data

    // 4. Save the case securely into the database using Prisma
    const newCase = await prisma.case.create({
      data: {
        clientId: session.user.id,
        title: validData.title,
        description: validData.description,
        category: validData.category,
        isProBono: validData.isProBono,
        stage: mapStage(validData.stage),
        
        // Convert string dates from the form into JavaScript Date objects for the DB
        incidentDate: validData.incidentDate ? new Date(validData.incidentDate) : null,
        deadline: validData.deadline ? new Date(validData.deadline) : null,
        
        location: validData.location,
        opposingParty: validData.opposingName,
        opposingRelationship: validData.opposingRelationship || null,
        
        contactName: validData.contactName,
        contactEmail: validData.contactEmail,
        contactPhone: validData.contactPhone || null,
        contactAddress: validData.contactAddress || null,
        
        // Defaults automatically set by Prisma: status (OPEN), urgency (MEDIUM)
      },
    })

    // 5. Invalidate Next.js cache so the UI immediately shows the new case
    revalidatePath('/cases')
    revalidatePath('/dashboard') // Also revalidate dashboard if it shows cases

    return { success: true, caseId: newCase.id }
  } catch (error) {
    console.error('[postCaseAction] Error:', error)
    return { success: false, error: 'Internal server error. Please try again.' }
  }
}
