import { z } from 'zod'

export const postCaseSchema = z.object({
  title: z
    .string()
    .min(1, 'Please enter a case title')
    .min(10, 'Title should be at least 10 characters'),
  description: z
    .string()
    .min(1, 'Please describe your situation')
    .min(30, 'Description should be at least 30 characters')
    .max(800, 'Description cannot exceed 800 characters'),
  category: z.string().min(1, 'Please select a category'),
  stage: z.string().min(1, 'Please select the current stage'),
  incidentDate: z.string().min(1, 'Please enter the date of incident'),
  deadline: z.string().min(1, 'Please enter the application deadline'),
  opposingName: z.string().min(1, 'Please enter the opposing party name'),
  opposingRelationship: z.string().optional(),
  location: z.string().min(1, 'Please enter the location'),
  contactName: z.string().min(1, 'Please enter your full name'),
  contactEmail: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
  isProBono: z.boolean(),
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: 'Please accept the Terms & Conditions',
  }),
}).superRefine((data, ctx) => {
  if (data.incidentDate) {
    const incident = new Date(data.incidentDate)
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    
    if (incident > today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Incident date cannot be in the future',
        path: ['incidentDate'],
      })
    }
    
    if (data.deadline) {
      const deadlineDate = new Date(data.deadline)
      incident.setHours(0, 0, 0, 0)
      deadlineDate.setHours(0, 0, 0, 0)

      if (deadlineDate < incident) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Deadline cannot be before the incident date',
          path: ['deadline'],
        })
      }
    }
  }
})

export type PostCaseFormData = z.infer<typeof postCaseSchema>

export const applyCaseSchema = z.object({
  coverNote: z
    .string()
    .min(1, 'Please write a brief cover note')
    .min(20, 'Cover note should be at least 20 characters'),
})

export type ApplyCaseFormData = z.infer<typeof applyCaseSchema>
