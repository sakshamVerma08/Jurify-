import type { KycDocumentId, KycStepMeta } from '@/types'
import { BAR_COUNCIL_STATES } from '@/lib/data/register'

export const KYC_STEPS: KycStepMeta[] = [
  { id: 1, label: 'Professional Details', description: 'Bar council, degree & practice areas' },
  { id: 2, label: 'Identity Verification', description: 'Aadhaar, PAN & Bar certificate' },
  { id: 3, label: 'Profile Setup', description: 'Photo, bio & languages' },
  { id: 4, label: 'Review & Submit', description: 'Confirm and send for verification' },
]

export const KYC_PRACTICE_AREAS = [
  'Family Law',
  'Property Law',
  'Criminal Law',
  'Labour Rights',
  'Civil Rights',
  'Consumer Protection',
  'Cyber Law',
  'Immigration Law',
  'Corporate Law',
  'Taxation',
  'Intellectual Property',
  'Banking & Finance',
  'Constitutional Law',
  'Environmental Law',
  'Alternative Dispute Resolution',
] as const

export const KYC_LANGUAGES = [
  'English',
  'Hindi',
  'Punjabi',
  'Bengali',
  'Gujarati',
  'Marathi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Urdu',
  'Odia',
] as const

export const KYC_DEGREES = [
  'LLB (3-Year)',
  'LLB (5-Year Integrated)',
  'LLM',
  'LLD',
  'LLB + LLM',
] as const

export const KYC_EXPERIENCE_RANGES = [
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5–10 years',
  '10–20 years',
  '20+ years',
] as const

export const KYC_OFFICE_STATES = [
  'Delhi',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Gujarat',
  'Rajasthan',
  'West Bengal',
  'Uttar Pradesh',
  'Telangana',
  'Kerala',
  'Punjab',
  'Haryana',
  'Other',
] as const

export const KYC_COUNTRIES = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Other'] as const

export const KYC_BAR_COUNCIL_STATES = BAR_COUNCIL_STATES

const currentYear = new Date().getFullYear()
export const KYC_ENROLLMENT_YEARS = Array.from({ length: currentYear - 1969 }, (_, i) =>
  String(currentYear - i)
)

export const KYC_REQUIRED_DOCUMENTS: {
  id: KycDocumentId
  label: string
  sub: string
  types: string
  maxMb: number
}[] = [
  {
    id: 'aadhaar',
    label: 'Aadhaar Card',
    sub: 'Both sides required\nClear, unedited scan',
    types: 'PDF · JPG · PNG · Max 5MB',
    maxMb: 5,
  },
  {
    id: 'pan',
    label: 'PAN Card',
    sub: 'For tax identity\nverification',
    types: 'PDF · JPG · PNG · Max 5MB',
    maxMb: 5,
  },
  {
    id: 'bar',
    label: 'Bar Council Certificate',
    sub: 'Original enrollment\ncertificate',
    types: 'PDF · JPG · PNG · Max 10MB',
    maxMb: 10,
  },
]

export const KYC_APPLICATION_ID = 'JRF-2026-84221'
