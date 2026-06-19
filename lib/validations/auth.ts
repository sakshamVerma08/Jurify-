import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const forgotPasswordSchema = z.object({
  email: z
    .email('Please enter a valid email address')
    .min(1, 'Email address is required'),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, 'Please enter the full 6-digit code')
    .regex(/^\d{6}$/, 'Code must contain only numbers'),
})

export type OtpFormData = z.infer<typeof otpSchema>

const phoneDigits = (value: string) => value.replace(/[\s\-()]/g, '')

export const registerSchema = () => {
  return z
    .object({
      role: z.enum(['LAWYER', 'CLIENT']),
      firstName: z
        .string()
        .min(1, 'Enter your first name')
        .min(2, 'Must be at least 2 characters'),
      lastName: z
        .string()
        .min(1, 'Enter your last name')
        .min(2, 'Must be at least 2 characters'),
      email: z
        .email('Enter a valid email address')
        .min(1, 'Email address is required'),
      phoneCode: z.string(),
      phone: z
        .string()
        .min(1, 'Enter a valid phone number')
        .refine(
          (value) => /^\d{7,15}$/.test(phoneDigits(value)),
          'Enter a valid phone number (digits only)'
        ),
      barCouncilState: z.string().optional(),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string().min(1, 'Please confirm your password'),
      acceptTerms: z.boolean().refine((value) => value === true, {
        message: 'Please accept the Terms & Conditions',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })
    .superRefine((data, ctx) => {
      if (data.role === 'LAWYER' && !data.barCouncilState) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please select your Bar Council state',
          path: ['barCouncilState'],
        })
      }
    })
}

export type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>

export interface PasswordStrength {
  width: string
  color: string
  label: string
}

export function getPasswordStrength(password: string): PasswordStrength {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const levels: PasswordStrength[] = [
    { width: '0%', color: 'transparent', label: '' },
    { width: '25%', color: '#f06464', label: 'Weak' },
    { width: '50%', color: '#f0b840', label: 'Fair' },
    { width: '75%', color: '#e8a44a', label: 'Good' },
    { width: '100%', color: '#4ade80', label: 'Strong' },
  ]

  return levels[score] ?? levels[0]
}
