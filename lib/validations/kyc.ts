import { z } from 'zod'
import type { KycDocumentId } from '@/types'

export const kycStep1Schema = z.object({
  enrollmentNumber: z
    .string()
    .min(1, 'Enrollment number is required')
    .min(3, 'Enter a valid enrollment number'),
  barCouncilState: z.string().min(1, 'Please select your Bar Council state'),
  enrollmentYear: z.string().min(1, 'Please select year of enrollment'),
  degree: z.string().min(1, 'Please select your degree'),
  university: z.string().min(1, 'University / college is required').min(3, 'Enter a valid institution name'),
  experience: z.string().min(1, 'Please select years of experience'),
  practiceAreas: z.array(z.string()).min(1, 'Select at least one practice area'),
})

export type KycStep1FormData = z.infer<typeof kycStep1Schema>

export const KYC_REQUIRED_DOC_IDS: KycDocumentId[] = ['aadhaar', 'pan', 'bar']

export function validateKycDocuments(
  documents: Partial<Record<KycDocumentId, unknown>>
): { valid: boolean; missing: KycDocumentId[] } {
  const missing = KYC_REQUIRED_DOC_IDS.filter((id) => !documents[id])
  return { valid: missing.length === 0, missing }
}

export const kycStep3Schema = z.object({
  city: z.string().min(1, 'City is required').min(2, 'Enter a valid city'),
  state: z.string().min(1, 'Please select your state'),
  country: z.string().min(1, 'Country is required'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  bio: z
    .string()
    .min(1, 'Professional bio is required')
    .min(30, 'Bio should be at least 30 characters')
    .max(500, 'Bio cannot exceed 500 characters'),
  courts: z.string().optional(),
  photo: z.custom<File>((val) => val instanceof File, 'Profile photo is required'),
})

export type KycStep3FormData = z.infer<typeof kycStep3Schema>
