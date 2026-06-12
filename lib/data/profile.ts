import { ProfileData } from '@/types'

export const initialProfileState: ProfileData = {
  lawyerFirstName: 'Priya',
  lawyerLastName: 'Mehta',
  lawyerEmail: 'priya.mehta@jurify.in',
  lawyerPhone: '+91 98765 43210',
  lawyerDob: '1992-03-14',
  lawyerCity: 'New Delhi',
  lawyerState: 'Delhi',

  clientFirstName: 'Sunita',
  clientLastName: 'Rawat',
  clientEmail: 'sunita.rawat@email.com',
  clientPhone: '+91 99999 88888',
  clientDob: '1990-08-20',
  clientCity: 'Gurugram',
  clientState: 'Haryana',

  enrollmentNo: 'D/4821/2016',
  barState: 'Delhi',
  enrollmentYear: '2016',
  degree: 'LLB (Hons.)',
  university: 'Faculty of Law, University of Delhi',
  experienceYears: '8 years',
  primaryCourt: 'Delhi High Court',
  practiceAreas: ['Family Law', 'Civil Rights', 'Criminal Law', 'Domestic Violence'],
  languages: ['English', 'Hindi'],
  bio: 'Senior advocate at Delhi High Court with 8 years of experience specialising in family law and civil rights. Committed to accessible justice through pro bono work.',
  isVerified: false,

  videoName: 'intro_priya_mehta.mp4',
  videoDate: '12 May 2026',

  lawyerPhotoUrl: null,
  clientPhotoUrl: null,

  theme: 'dark',
  language: '🌐 English',
  timezone: 'Asia/Kolkata (IST, UTC+5:30)',
  publicProfile: true,
  showContactInfo: true,
  showOnlineStatus: false,
  searchableProfile: true,
  compactMode: false,
  keyboardShortcuts: true,
  animationEffects: true,
  aiResponseLanguage: 'Same as display language',

  tfaEnabled: false,
  sessions: [
    { id: 's1', device: 'MacBook Pro 16', ip: '103.88.22.14', location: 'Delhi, India', current: true },
    { id: 's2', device: 'iPhone 15 Pro', ip: '103.88.22.89', location: 'Delhi, India', current: false },
    { id: 's3', device: 'Chrome on Windows', ip: '45.112.67.12', location: 'Mumbai, India', current: false },
  ],

  emailCases: true,
  emailMessages: true,
  emailRecs: false,
  emailOffers: false,
  pushNotifs: true,
  smsNotifs: false,
}

export const PRACTICE_AREAS = [
  'Family Law',
  'Civil Rights',
  'Criminal Law',
  'Domestic Violence',
  'Property Law',
  'Labour Rights',
  'Consumer Protection',
  'Corporate Law',
  'Cyber Law',
  'Immigration Law',
]

export const LANGUAGES = ['English', 'Hindi', 'Punjabi', 'Tamil', 'Bengali', 'Marathi']
