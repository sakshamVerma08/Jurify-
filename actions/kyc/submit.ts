'use server'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth/auth'
import { prisma as db } from '@/lib/prisma/prisma'
import { VerificationStatus, KycStep, KycDocType } from '@prisma/client'

// Use any for the incoming data since it's validated loosely on client,
// but we'll enforce the structure here manually.
export async function submitKycApplication(data: any) {
  try {
    // 1. Get the authenticated session
    const reqHeaders = await headers()
    const session = await auth.api.getSession({
      headers: reqHeaders,
    })

    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized. Must be logged in.' }
    }

    const userId = session.user.id
    
    const dbUser = await db.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (dbUser?.role !== 'LAWYER') {
      return { success: false, error: 'Unauthorized. Must be logged in as a lawyer.' }
    }

    // 2. Extract Data from Frontend Submission
    const { step1, step3, documents, photo } = data
    
    // We need the lawyer's profile ID to associate the application
    const lawyerProfile = await db.lawyerProfile.findUnique({
      where: { userId }
    })

    if (!lawyerProfile) {
      return { success: false, error: 'Lawyer profile not found. Please contact support.' }
    }

    // 3. Generate Reference Number
    // Format: JRF-YYYY-STATE-XXXXX
    const year = new Date().getFullYear()
    const statePrefix = step3.state ? step3.state.substring(0, 2).toUpperCase() : 'XX'
    const randomSuffix = Math.floor(10000 + Math.random() * 90000)
    const referenceNumber = `JRF-${year}-${statePrefix}-${randomSuffix}`

    // 4. Secure Transaction
    // We update the LawyerProfile, create KycApplication, Documents, and initial StatusEvent
    await db.$transaction(async (tx) => {
      // Parse years of experience from string
      let experienceInt = 0
      if (step1.experience === '1–3 years') experienceInt = 1
      else if (step1.experience === '3–5 years') experienceInt = 3
      else if (step1.experience === '5–10 years') experienceInt = 5
      else if (step1.experience === '10–20 years') experienceInt = 10
      else if (step1.experience === '20+ years') experienceInt = 20

      // 4a. Update LawyerProfile with Step 1 and Step 3 details
      await tx.lawyerProfile.update({
        where: { id: lawyerProfile.id },
        data: {
          enrollmentNo: step1.enrollmentNumber,
          barCouncilState: step1.barCouncilState,
          enrollmentYear: step1.enrollmentYear ? parseInt(step1.enrollmentYear) : null,
          degree: step1.degree,
          university: step1.university,
          yearsOfExperience: experienceInt,
          practiceAreas: step1.practiceAreas || [],
          languages: step3.languages || [],
          city: step3.city,
          state: step3.state,
          country: step3.country || 'India',
          bio: step3.bio,
          primaryCourt: step3.courts,
          photoUrl: photo?.secure_url,
          verificationStatus: VerificationStatus.PENDING,
        }
      })

      // 4b. Create the KYC Application
      const application = await tx.kycApplication.create({
        data: {
          lawyerId: lawyerProfile.id,
          referenceNumber,
          status: VerificationStatus.PENDING,
          currentStep: KycStep.FORM_SUBMITTED,
        }
      })

      // 4c. Insert Documents
      const docInserts = []
      
      if (documents.aadhaar) {
        docInserts.push({
          applicationId: application.id,
          type: KycDocType.AADHAAR,
          fileKey: documents.aadhaar.public_id,
          fileName: documents.aadhaar.name,
          status: VerificationStatus.PENDING,
        })
      }
      
      if (documents.pan) {
        docInserts.push({
          applicationId: application.id,
          type: KycDocType.PAN,
          fileKey: documents.pan.public_id,
          fileName: documents.pan.name,
          status: VerificationStatus.PENDING,
        })
      }

      if (documents.bar) {
        docInserts.push({
          applicationId: application.id,
          type: KycDocType.BAR_CERTIFICATE,
          fileKey: documents.bar.public_id,
          fileName: documents.bar.name,
          status: VerificationStatus.PENDING,
        })
      }

      // Add the profile photo as a document too
      if (photo) {
        docInserts.push({
          applicationId: application.id,
          type: KycDocType.PROFILE_PHOTO,
          fileKey: photo.public_id,
          fileName: photo.name,
          status: VerificationStatus.PENDING,
        })
      }

      await tx.kycDocument.createMany({
        data: docInserts
      })

      // 4d. Create Initial Status Events
      await tx.kycStatusEvent.createMany({
        data: [
          {
            applicationId: application.id,
            step: KycStep.FORM_SUBMITTED,
            status: VerificationStatus.PENDING,
            note: 'Application form submitted successfully.',
            performedBy: 'System',
          },
          {
            applicationId: application.id,
            step: KycStep.DOCUMENTS_RECEIVED,
            status: VerificationStatus.PENDING,
            note: 'Verification documents received and queued for screening.',
            performedBy: 'System',
          }
        ]
      })
    })

    return { 
      success: true, 
      referenceNumber 
    }

  } catch (error) {
    console.error('[KYC_SUBMIT_ERROR]', error)
    return { success: false, error: 'Internal Server Error' }
  }
}
