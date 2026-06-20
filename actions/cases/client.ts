'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma/prisma'
import { requireAuth } from '@/lib/auth/auth-helper'
import { postCaseSchema, type PostCaseFormData } from '@/lib/validations/case'

import { formatDistanceToNow } from 'date-fns'

function mapStage(stage: string): string {
  switch (stage) {
    case 'Initial Consultation': return 'INITIAL_CONSULTATION'
    case 'Investigation': return 'INVESTIGATION'
    case 'Pre-Hearing / Filing': return 'PRE_HEARING'
    case 'Trial': return 'TRIAL'
    case 'Appeal': return 'APPEAL'
    default: return 'INITIAL_CONSULTATION'
  }
}

function mapStageToFrontend(stage: string) {
  switch (stage) {
    case 'INITIAL_CONSULTATION': return { stage: 'initial', label: 'Initial Stage' }
    case 'INVESTIGATION': return { stage: 'investigation', label: 'Investigation' }
    case 'PRE_HEARING': return { stage: 'hearing', label: 'Pre-Hearing' }
    case 'TRIAL': return { stage: 'trial', label: 'Trial' }
    case 'VERDICT': return { stage: 'verdict', label: 'Verdict' }
    case 'APPEAL': return { stage: 'appeal', label: 'Appeal' }
    default: return { stage: 'initial', label: 'Initial Stage' }
  }
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return 'U'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

export async function getMyCasesAction() {
  try {
    const session = await requireAuth()
    if (!session) return { success: false, error: 'Unauthorized' }

    const cases = await prisma.case.findMany({
      where: { clientId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        applications: {
          include: {
            lawyer: {
              include: {
                lawyerProfile: true,
              }
            }
          }
        }
      }
    })

    const formattedCases = cases.map((c) => {
      const { stage, label } = mapStageToFrontend(c.stage)

      // Calculate progress step based on stage
      let progressStep = 0
      if (c.stage === 'INVESTIGATION') progressStep = 1
      if (c.stage === 'PRE_HEARING') progressStep = 2
      if (c.stage === 'TRIAL') progressStep = 3
      if (c.stage === 'VERDICT' || c.stage === 'APPEAL') progressStep = 4

      // Find if there is an accepted lawyer
      const acceptedApp = c.applications.find(a => a.status === 'ACCEPTED')

      const applicantsDetail = c.applications.map(app => {
        const profile = app.lawyer.lawyerProfile
        const name = app.lawyer.name || 'Unknown Lawyer'
        return {
          id: app.lawyer.id,
          name: name,
          initials: getInitials(name),
          rating: profile?.rating ? Number(profile.rating) : 0,
          experience: profile?.yearsOfExperience || 0,
          bio: profile?.bio || 'Professional lawyer ready to assist you.'
        }
      })

      return {
        id: c.id,
        title: c.title,
        category: c.category,
        isProBono: c.isProBono,
        location: c.location || 'Not specified',
        postedAgo: formatDistanceToNow(new Date(c.createdAt), { addSuffix: true }),
        stage: stage as any,
        stageLabel: label,
        progressStep,
        applicantInitials: applicantsDetail.map(a => a.initials).slice(0, 3), // Show max 3 initials
        applicantCount: applicantsDetail.length,
        description: c.description,
        incidentDate: c.incidentDate ? c.incidentDate.toISOString().split('T')[0] : undefined,
        deadline: c.deadline ? c.deadline.toISOString().split('T')[0] : undefined,
        opposingName: c.opposingParty || undefined,
        opposingRelationship: c.opposingRelationship || undefined,
        contactName: c.contactName || undefined,
        contactEmail: c.contactEmail || undefined,
        contactPhone: c.contactPhone || undefined,
        contactAddress: c.contactAddress || undefined,
        assignedLawyerId: acceptedApp ? acceptedApp.lawyer.id : null,
        assignedLawyerName: acceptedApp ? acceptedApp.lawyer.name : null,
        applicantsDetail: applicantsDetail
      }
    })

    return { success: true, cases: formattedCases }
  } catch (error) {
    console.error('[getMyCasesAction] Error:', error)
    return { success: false, error: 'Failed to fetch your cases.' }
  }
}

export async function closeCaseAction(caseId: string) {
  try {
    const session = await requireAuth()
    if (!session) return { success: false, error: 'Unauthorized' }

    // Ensure the case belongs to the user
    const existingCase = await prisma.case.findUnique({ where: { id: caseId } })
    if (!existingCase || existingCase.clientId !== session.user.id) {
      return { success: false, error: 'Case not found or unauthorized' }
    }

    //Instead of this we can soft delete the data as well by creating a new column isDeleted.
    //This is how it's usually done in the real world production apps too.
    await prisma.case.delete({
      where: { id: caseId }
    })

    revalidatePath('/cases')
    return { success: true }
  } catch (error) {
    console.error('[closeCaseAction] Error:', error)
    return { success: false, error: 'Failed to close case.' }
  }
}

export async function editCaseAction(caseId: string, data: PostCaseFormData) {
  try {
    const session = await requireAuth()
    if (!session) return { success: false, error: 'Unauthorized' }

    // Ensure the case belongs to the user
    const existingCase = await prisma.case.findUnique({ where: { id: caseId } })
    if (!existingCase || existingCase.clientId !== session.user.id) {
      return { success: false, error: 'Case not found or unauthorized' }
    }

    const parsedData = postCaseSchema.safeParse(data)
    if (!parsedData.success) {
      return { success: false, error: parsedData.error.issues[0]?.message || 'Invalid form data' }
    }

    const validData = parsedData.data

    await prisma.case.update({
      where: { id: caseId },
      data: {
        title: validData.title,
        description: validData.description,
        category: validData.category,
        isProBono: validData.isProBono,
        stage: mapStage(validData.stage),
        incidentDate: validData.incidentDate ? new Date(validData.incidentDate) : null,
        deadline: validData.deadline ? new Date(validData.deadline) : null,
        location: validData.location,
        opposingParty: validData.opposingName,
        opposingRelationship: validData.opposingRelationship || null,
        contactName: validData.contactName,
        contactEmail: validData.contactEmail,
        contactPhone: validData.contactPhone || null,
        contactAddress: validData.contactAddress || null,
      }
    })

    revalidatePath('/cases')
    return { success: true }
  } catch (error) {
    console.error('[editCaseAction] Error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update case.' }
  }
}

export async function acceptLawyerAction(caseId: string, lawyerId: string) {
  try {
    const session = await requireAuth()
    if (!session) return { success: false, error: 'Unauthorized' }

    // Ensure the case belongs to the user
    const existingCase = await prisma.case.findUnique({
      where: { id: caseId }
    })

    if (!existingCase || existingCase.clientId !== session.user.id) {
      return { success: false, error: 'Case not found or unauthorized' }
    }

    // Execute updates securely within a transaction
    await prisma.$transaction([
      // 1. Mark the chosen application as ACCEPTED
      prisma.caseApplication.update({
        where: { caseId_lawyerId: { caseId, lawyerId } },
        data: { status: 'ACCEPTED' }
      }),
      // 2. Mark all other PENDING applications for this case as REJECTED
      prisma.caseApplication.updateMany({
        where: { caseId, lawyerId: { not: lawyerId }, status: 'PENDING' },
        data: { status: 'REJECTED' }
      }),
      // 3. Update the Case status to ACTIVE
      prisma.case.update({
        where: { id: caseId },
        data: { status: 'ACTIVE' }
      })
    ])

    revalidatePath('/cases')
    return { success: true }
  } catch (error) {
    console.error('[acceptLawyerAction] Error:', error)
    return { success: false, error: 'Failed to assign lawyer.' }
  }
}
