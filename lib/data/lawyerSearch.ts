import type { LawyerListing, LawyerSearchSortOption } from '@/types'

export const LAWYER_SEARCH_PRACTICE_AREAS = [
  'Family Law',
  'Criminal Law',
  'Property Law',
  'Labour Rights',
  'Civil Rights',
  'Corporate Law',
  'Cyber Law',
  'Immigration Law',
] as const

export const LAWYER_SEARCH_LANGUAGES = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Marathi',
  'Bengali',
  'Gujarati',
] as const

export const LAWYER_SEARCH_LOCATIONS = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Jaipur',
] as const

export const LAWYER_SORT_OPTIONS: { value: LawyerSearchSortOption; label: string }[] = [
  { value: 'relevant', label: 'Sort: Most Relevant' },
  { value: 'rating', label: 'Sort: Highest Rated' },
  { value: 'experience', label: 'Sort: Most Experience' },
  { value: 'probono', label: 'Sort: Pro Bono Hours' },
]

export const LAWYER_LISTINGS: LawyerListing[] = [
  {
    id: 'priya-mehta',
    profileHref: '/lawyers/priya-mehta',
    name: 'Adv. Priya Mehta',
    initials: 'PM',
    location: 'New Delhi, Delhi',
    experience: 8,
    areas: ['Family Law', 'Civil Rights', 'Criminal Law'],
    languages: ['English', 'Hindi'],
    verified: true,
    successRate: 94,
    cases: 87,
    proBonoHours: 240,
    connections: 145,
    rating: 4.9,
    availability: 'Both',
    bio: 'Senior advocate at Delhi High Court with 8 years of experience specialising in family law and civil rights. Committed to accessible justice through pro bono work.',
    connectStatus: 'none',
  },
  {
    id: 'rahul-sharma',
    profileHref: '/lawyers/rahul-sharma',
    name: 'Adv. Rahul Sharma',
    initials: 'RS',
    location: 'Mumbai, Maharashtra',
    experience: 12,
    areas: ['Corporate Law', 'Taxation', 'Banking & Finance'],
    languages: ['English', 'Hindi', 'Marathi'],
    verified: true,
    successRate: 89,
    cases: 143,
    proBonoHours: 80,
    connections: 312,
    rating: 4.7,
    availability: 'Paid',
    bio: 'Corporate law specialist with 12 years of practice across Mumbai and Pune. Extensive experience in M&A transactions, regulatory compliance, and tax advisory.',
    connectStatus: 'connected',
  },
  {
    id: 'lakshmi-iyer',
    profileHref: '/lawyers/lakshmi-iyer',
    name: 'Adv. Lakshmi Iyer',
    initials: 'LI',
    location: 'Chennai, Tamil Nadu',
    experience: 6,
    areas: ['Labour Rights', 'Consumer Protection', 'Civil Rights'],
    languages: ['English', 'Tamil', 'Hindi'],
    verified: true,
    successRate: 91,
    cases: 62,
    proBonoHours: 320,
    connections: 97,
    rating: 4.8,
    availability: 'Both',
    bio: 'Passionate labour rights advocate based in Chennai. Dedicated to representing daily wage workers, domestic workers, and marginalised communities in labour disputes.',
    connectStatus: 'pending',
  },
  {
    id: 'vikram-choudhary',
    profileHref: '/lawyers/vikram-choudhary',
    name: 'Adv. Vikram Choudhary',
    initials: 'VC',
    location: 'Jaipur, Rajasthan',
    experience: 15,
    areas: ['Property Law', 'Civil Rights'],
    languages: ['Hindi', 'English'],
    verified: true,
    successRate: 88,
    cases: 210,
    proBonoHours: 150,
    connections: 203,
    rating: 4.6,
    availability: 'Both',
    bio: 'Senior advocate with 15 years in property and civil matters across Rajasthan courts. Specialises in land acquisition disputes and rural tenant rights.',
    connectStatus: 'none',
  },
  {
    id: 'ananya-bose',
    profileHref: '/lawyers/ananya-bose',
    name: 'Adv. Ananya Bose',
    initials: 'AB',
    location: 'Kolkata, West Bengal',
    experience: 4,
    areas: ['Criminal Law', 'Family Law'],
    languages: ['English', 'Bengali', 'Hindi'],
    verified: false,
    successRate: 82,
    cases: 38,
    proBonoHours: 190,
    connections: 54,
    rating: 4.4,
    availability: 'ProBono',
    bio: 'Emerging criminal defence lawyer based in Kolkata. Strong background in bail applications, remand hearings, and domestic violence cases.',
    connectStatus: 'none',
  },
  {
    id: 'siddharth-nair',
    profileHref: '/lawyers/siddharth-nair',
    name: 'Adv. Siddharth Nair',
    initials: 'SN',
    location: 'Bangalore, Karnataka',
    experience: 9,
    areas: ['Cyber Law', 'Intellectual Property', 'Corporate Law'],
    languages: ['English', 'Kannada', 'Hindi'],
    verified: true,
    successRate: 93,
    cases: 74,
    proBonoHours: 60,
    connections: 178,
    rating: 4.8,
    availability: 'Paid',
    bio: 'Technology law specialist at Bangalore High Court. Advises startups, tech firms, and individuals on cybercrime, IP infringement, and data protection compliance.',
    connectStatus: 'none',
  },
  {
    id: 'meera-pillai',
    profileHref: '/lawyers/meera-pillai',
    name: 'Adv. Meera Pillai',
    initials: 'MP',
    location: 'Kochi, Kerala',
    experience: 11,
    areas: ['Immigration Law', 'Family Law', 'Consumer Protection'],
    languages: ['English', 'Malayalam', 'Hindi'],
    verified: true,
    successRate: 96,
    cases: 119,
    proBonoHours: 410,
    connections: 221,
    rating: 4.9,
    availability: 'Both',
    bio: 'Renowned immigration law specialist in Kerala with extensive experience in asylum claims, visa disputes, and NRI legal matters. Strong track record in international family law.',
    connectStatus: 'none',
  },
  {
    id: 'arjun-gupta',
    profileHref: '/lawyers/arjun-gupta',
    name: 'Adv. Arjun Gupta',
    initials: 'AG',
    location: 'Lucknow, Uttar Pradesh',
    experience: 7,
    areas: ['Criminal Law', 'Labour Rights', 'Constitutional Law'],
    languages: ['Hindi', 'English', 'Urdu'],
    verified: false,
    successRate: 85,
    cases: 91,
    proBonoHours: 280,
    connections: 112,
    rating: 4.5,
    availability: 'ProBono',
    bio: "Public interest lawyer committed to constitutional rights and criminal defence. Active in cases involving police excesses, custodial violence, and workers' rights.",
    connectStatus: 'none',
  },
  {
    id: 'sneha-patel',
    profileHref: '/lawyers/sneha-patel',
    name: 'Adv. Sneha Patel',
    initials: 'SP',
    location: 'Ahmedabad, Gujarat',
    experience: 5,
    areas: ['Corporate Law', 'Taxation', 'Property Law'],
    languages: ['Gujarati', 'Hindi', 'English'],
    verified: true,
    successRate: 87,
    cases: 47,
    proBonoHours: 95,
    connections: 89,
    rating: 4.6,
    availability: 'Paid',
    bio: 'Corporate and tax law practitioner based in Ahmedabad. Specialises in startup legal structuring, GST compliance, and commercial property transactions.',
    connectStatus: 'none',
  },
]

export function filterAndSortLawyers(
  lawyers: LawyerListing[],
  opts: {
    searchQuery: string
    verifiedOnly: boolean
    availabilityFilter: 'Both' | 'Pro Bono' | 'Paid'
    practiceAreas: string[]
    minExperience: number
    languages: string[]
    locations: string[]
    sortBy: LawyerSearchSortOption
  }
): LawyerListing[] {
  const q = opts.searchQuery.trim().toLowerCase()

  let result = lawyers.filter((l) => {
    if (q) {
      const matchText =
        l.name.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.areas.some((a) => a.toLowerCase().includes(q))
      if (!matchText) return false
    }
    if (opts.verifiedOnly && !l.verified) return false
    if (opts.availabilityFilter === 'Pro Bono' && l.availability === 'Paid') return false
    if (opts.availabilityFilter === 'Paid' && l.availability === 'ProBono') return false
    if (opts.practiceAreas.length > 0 && !opts.practiceAreas.some((a) => l.areas.includes(a))) return false
    if (l.experience < opts.minExperience) return false
    if (opts.languages.length > 0 && !opts.languages.some((lang) => l.languages.includes(lang))) return false
    if (opts.locations.length > 0 && !opts.locations.some((loc) => l.location.includes(loc))) return false
    return true
  })

  result = [...result]
  switch (opts.sortBy) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'experience':
      result.sort((a, b) => b.experience - a.experience)
      break
    case 'probono':
      result.sort((a, b) => b.proBonoHours - a.proBonoHours)
      break
    default:
      break
  }

  return result
}
