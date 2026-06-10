import type { BarCouncilState, PhoneCountryCode, RoleOption } from '@/types'

export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'lawyer',
    title: "I'm a Lawyer",
    description: 'Build your profile, take on pro bono cases, and grow your network',
    tags: ['Pro Bono', 'Network', 'AI Tools'],
    icon: 'lawyer',
  },
  {
    id: 'client',
    title: 'I Need Legal Help',
    description: 'Post your case, find a verified lawyer, or use the free AI assistant',
    tags: ['Free AI', 'Find Lawyer', 'Post Case'],
    icon: 'client',
  },
]

export const PHONE_COUNTRY_CODES: PhoneCountryCode[] = [
  { id: 'in', label: '🇮🇳 +91', value: '+91' },
  { id: 'us', label: '🇺🇸 +1', value: '+1' },
  { id: 'uk', label: '🇬🇧 +44', value: '+44' },
  { id: 'au', label: '🇦🇺 +61', value: '+61' },
  { id: 'ae', label: '🇦🇪 +971', value: '+971' },
  { id: 'sg', label: '🇸🇬 +65', value: '+65' },
  { id: 'my', label: '🇲🇾 +60', value: '+60' },
]

export const BAR_COUNCIL_STATES: BarCouncilState[] = [
  { id: 'ap', name: 'Andhra Pradesh' },
  { id: 'as', name: 'Assam' },
  { id: 'br', name: 'Bihar' },
  { id: 'cg', name: 'Chhattisgarh' },
  { id: 'dl', name: 'Delhi' },
  { id: 'gj', name: 'Gujarat' },
  { id: 'hr', name: 'Haryana' },
  { id: 'hp', name: 'Himachal Pradesh' },
  { id: 'jh', name: 'Jharkhand' },
  { id: 'ka', name: 'Karnataka' },
  { id: 'kl', name: 'Kerala' },
  { id: 'mp', name: 'Madhya Pradesh' },
  { id: 'mh', name: 'Maharashtra' },
  { id: 'od', name: 'Odisha' },
  { id: 'ph', name: 'Punjab & Haryana' },
  { id: 'rj', name: 'Rajasthan' },
  { id: 'tn', name: 'Tamil Nadu' },
  { id: 'ts', name: 'Telangana' },
  { id: 'up', name: 'Uttar Pradesh' },
  { id: 'wb', name: 'West Bengal' },
  { id: 'bci', name: 'Bar Council of India' },
]
