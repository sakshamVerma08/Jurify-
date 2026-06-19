'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma/prisma'
import { requireAuth } from '@/lib/auth/auth-helper'
import { applyCaseSchema, type ApplyCaseFormData } from '@/lib/validations/case'

export async function applyCaseAction(caseId: string, data: ApplyCaseFormData) {
  try {
    const session = await requireAuth()
    if (!session) {
      return { success: false, error: 'Unauthorized. Please log in.' }
    }

    if (session.user.role !== 'LAWYER') {
      return { success: false, error: 'Only lawyers can apply for cases.' }
    }

    // Strict validation of cover note
    const parsedData = applyCaseSchema.safeParse(data)
    if (!parsedData.success) {
      return { success: false, error: parsedData.error.issues[0]?.message || 'Invalid form data' }
    }

    const validData = parsedData.data

    // Find the lawyer profile and check KYC verification status
    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (!lawyerProfile) {
      return { success: false, error: 'Lawyer profile not found. Please set up your profile.' }
    }

    // The core security check for this feature: KYC must be APPROVED
    if (lawyerProfile.verificationStatus !== 'APPROVED') {
      return { 
        success: false, 
        requireKyc: true, 
        error: 'You must complete KYC verification before applying to cases.' 
      }
    }

    // Ensure the case exists and is open
    const targetCase = await prisma.case.findUnique({
      where: { id: caseId },
    })

    if (!targetCase || targetCase.status !== 'OPEN') {
      return { success: false, error: 'This case is no longer open for applications.' }
    }

    // Check if the lawyer has already applied to prevent duplicates
    const existingApp = await prisma.caseApplication.findUnique({
      where: {
        caseId_lawyerId: {
          caseId: caseId,
          lawyerId: session.user.id,
        }
      }
    })

    if (existingApp) {
      return { success: false, error: 'You have already applied for this case.' }
    }

    // Use a transaction to create the application and increment the case's application count securely
    await prisma.$transaction(async (tx) => {
      await tx.caseApplication.create({
        data: {
          caseId: caseId,
          lawyerId: session.user.id,
          profileId: lawyerProfile.id,
          coverLetter: validData.coverNote,
          status: 'PENDING',
        }
      })

      await tx.case.update({
        where: { id: caseId },
        data: {
          applicationCount: {
            increment: 1
          }
        }
      })
    })

    // Purge Next.js cache so the UI updates
    revalidatePath('/cases')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('[applyCaseAction] Error:', error)
    return { success: false, error: 'Internal server error. Please try again later.' }
  }
}

import { formatDistanceToNow } from 'date-fns'

export async function getMyApplicationsAction() {
  try {
    const session = await requireAuth()
    if (!session) {
      return { success: false, error: 'Unauthorized. Please log in.' }
    }

    if (session.user.role !== 'LAWYER') {
      return { success: false, error: 'Only lawyers can fetch applications.' }
    }

    // Fetch applications with the parent case details
    const applications = await prisma.caseApplication.findMany({
      where: { lawyerId: session.user.id },
      orderBy: { appliedAt: 'desc' },
      include: {
        case: true,
      }
    })

    const formattedApps = applications.map(app => {
      // Determine frontend status string
      let statusLabel = 'Pending'
      let status: 'pending' | 'accepted' | 'rejected' = 'pending'
      
      if (app.status === 'ACCEPTED') {
        status = 'accepted'
        statusLabel = 'Accepted'
      } else if (app.status === 'REJECTED') {
        status = 'rejected'
        statusLabel = 'Not Selected'
      }

      return {
        id: app.id,
        caseId: app.caseId,
        title: app.case.title,
        category: app.case.category,
        location: app.case.location || 'Not specified',
        appliedAgo: formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true }),
        status,
        statusLabel,
      }
    })

    return { success: true, applications: formattedApps }
  } catch (error) {
    console.error('[getMyApplicationsAction] Error:', error)
    return { success: false, error: 'Failed to fetch applications.' }
  }
}

function mapStageToFrontend(stage: string) {
  switch (stage) {
    case 'INITIAL_CONSULTATION': return { stage: 'initial', label: 'Initial Consultation' }
    case 'INVESTIGATION': return { stage: 'investigation', label: 'Investigation' }
    case 'PRE_HEARING': return { stage: 'hearing', label: 'Pre-Hearing' }
    case 'TRIAL': return { stage: 'trial', label: 'Trial' }
    case 'VERDICT': return { stage: 'verdict', label: 'Verdict' }
    case 'APPEAL': return { stage: 'appeal', label: 'Appeal' }
    default: return { stage: 'initial', label: 'Initial Stage' }
  }
}

export async function getActiveCasesAction() {
  try {
    const session = await requireAuth()
    if (!session) {
      return { success: false, error: 'Unauthorized. Please log in.' }
    }

    if (session.user.role !== 'LAWYER') {
      return { success: false, error: 'Only lawyers can fetch active cases.' }
    }

    // Active cases are those where the lawyer's application was ACCEPTED
    const activeApplications = await prisma.caseApplication.findMany({
      where: { 
        lawyerId: session.user.id,
        status: 'ACCEPTED'
      },
      orderBy: { updatedAt: 'desc' },
      include: {
        case: {
          include: {
            client: true // To get the clientName
          }
        }
      }
    })

    const activeCases = activeApplications.map(app => {
      const c = app.case
      const { stage, label } = mapStageToFrontend(c.stage)
      
      let progressStep = 0
      if (c.stage === 'INVESTIGATION') progressStep = 1
      if (c.stage === 'PRE_HEARING') progressStep = 2
      if (c.stage === 'TRIAL') progressStep = 3
      if (c.stage === 'VERDICT' || c.stage === 'APPEAL') progressStep = 4

      // Format nextEvent based on deadline if available
      const nextEvent = c.deadline 
        ? `Deadline: ${c.deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` 
        : 'Awaiting updates'

      // Client name fallback
      const clientName = c.client.name || c.contactName || 'Undisclosed Client'

      return {
        id: c.id,
        title: c.title,
        category: c.category,
        location: c.location || 'Not specified',
        clientName: clientName,
        nextEvent: nextEvent,
        stage: stage as any,
        stageLabel: label,
        progressStep,
      }
    })

    return { success: true, cases: activeCases }
  } catch (error) {
    console.error('[getActiveCasesAction] Error:', error)
    return { success: false, error: 'Failed to fetch active cases.' }
  }
}
