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

export function mapLawyerProfileToListing(p: any): LawyerListing {
  // Build initials
  const initials = `${p.firstName.charAt(0)}${p.lastName.charAt(0)}`.toUpperCase()

  // Location
  const locationParts = []
  if (p.city) locationParts.push(p.city)
  if (p.state) locationParts.push(p.state)
  const location = locationParts.length > 0 ? locationParts.join(', ') : p.country || 'India'

  // Availability mapping
  let availability: 'Both' | 'ProBono' | 'Paid' = 'Both'
  if (p.availability === 'PRO_BONO') availability = 'ProBono'
  else if (p.availability === 'PAID') availability = 'Paid'

  return {
    id: p.id,
    profileHref: `/lawyers/${p.id}`,
    name: p.displayName || `${p.firstName} ${p.lastName}`,
    initials,
    location,
    experience: p.yearsOfExperience || 0,
    areas: p.practiceAreas || [],
    languages: p.languages || [],
    verified: p.isVerified,
    successRate: p.successRate ? Number(p.successRate) : 0,
    cases: p.casesHandled || 0,
    proBonoHours: p.proBonoHours || 0,
    connections: p.connectionCount || 0,
    rating: p.rating ? Number(p.rating) : 0,
    availability,
    bio: p.bio || 'Legal professional ready to assist you.',
    connectStatus: 'none',
  }
}

