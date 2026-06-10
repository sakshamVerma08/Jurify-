// FILE: components/lawyer-profile/LawyerProfilePageContent.tsx
// TYPE: Client Component

'use client'

import { LawyerProfileAbout } from '@/components/lawyer-profile/LawyerProfileAbout'
import { LawyerProfileBlogs } from '@/components/lawyer-profile/LawyerProfileBlogs'
import { LawyerProfileCalendar } from '@/components/lawyer-profile/LawyerProfileCalendar'
import { LawyerProfileCaseChart } from '@/components/lawyer-profile/LawyerProfileCaseChart'
import { LawyerProfileCredentials } from '@/components/lawyer-profile/LawyerProfileCredentials'
import { LawyerProfileHero } from '@/components/lawyer-profile/LawyerProfileHero'
import { LawyerProfileSidebar } from '@/components/lawyer-profile/LawyerProfileSidebar'
import { LawyerProfileStats } from '@/components/lawyer-profile/LawyerProfileStats'
import { LawyerProfileTestimonials } from '@/components/lawyer-profile/LawyerProfileTestimonials'
import { LAWYER_PROFILE } from '@/lib/data/lawyerProfile'
import { LAWYER_LISTINGS } from '@/lib/data/lawyerSearch'

export function LawyerProfilePageContent({ lawyerId }: { lawyerId: string }) {
  const listing = lawyerId ? LAWYER_LISTINGS.find((l) => l.id === lawyerId) : null

  // If a listing is found, dynamically map its values onto a LawyerProfile structure
  const profile = listing
    ? {
        ...LAWYER_PROFILE,
        id: listing.id,
        initials: listing.initials,
        name: listing.name,
        degree: `${listing.areas[0] || 'Legal'} Advocate`,
        practiceAreas: listing.areas,
        location: listing.location,
        rating: listing.rating,
        experienceYears: listing.experience,
        connections: listing.connections || 120,
        proBonoAvailable: listing.availability !== 'Paid',
        bio: [
          listing.bio,
          `${listing.name} is highly recommended for clients in ${listing.location} seeking assistance with ${listing.areas.join(', ')}.`,
          `With a success rate of ${listing.successRate}% and over ${listing.proBonoHours} hours dedicated to pro bono initiatives, Adv. ${listing.name.replace('Adv. ', '')} stands out for their dedication to client success and accessible legal advocacy.`
        ],
        stats: [
          { id: 'success', type: 'circle' as const, label: 'Success Rate', sub: `${Math.round(listing.successRate * 0.95)} of ${listing.successRate} cases won`, value: listing.successRate, circlePct: listing.successRate },
          { id: 'cases', type: 'counter' as const, label: 'Cases Handled', sub: 'Across court levels', value: listing.cases },
          { id: 'probono', type: 'counter' as const, label: 'Pro Bono Hours', sub: 'Free legal service', value: listing.proBonoHours, suffix: 'h' },
          { id: 'experience', type: 'counter' as const, label: 'Years Experience', sub: `Enrolled ${2026 - listing.experience}`, value: listing.experience, suffix: 'y' },
        ],
        sidebarOverview: [
          { value: listing.location, sub: 'Practice Location' },
          { value: `Enrolled ${2026 - listing.experience}`, sub: `${listing.experience} years of practice` },
          { value: listing.areas.slice(0, 2).join(' & '), sub: 'Primary specialisation' },
          { value: `${listing.proBonoHours}+ Pro Bono Hours`, sub: 'Community service' },
          { value: listing.languages.join(' & '), sub: 'Languages spoken' },
        ],
      }
    : LAWYER_PROFILE

  const firstName = profile.name.replace(/^Advocate\s+/i, '').replace(/^Adv\.\s+/i, '').split(' ')[0] ?? 'Priya'

  return (
    <>
      <LawyerProfileHero profile={profile} />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-[52px] pb-20 pt-8 max-lg:px-6 lg:grid-cols-[1fr_340px]">
          <div>
            <LawyerProfileStats stats={profile.stats} />
            <LawyerProfileAbout firstName={firstName} bio={profile.bio} videoLabel={profile.videoLabel} />
            <LawyerProfileCredentials credentials={profile.credentials} practiceTags={profile.practiceTags} />
            <LawyerProfileCalendar
              baseDate={profile.calendarBaseDate}
              weeklySlots={profile.weeklySlots}
              bookedSlots={profile.bookedSlots}
              lawyerName={profile.name}
            />
            <LawyerProfileTestimonials
              rating={profile.rating}
              reviewCount={profile.reviewCount}
              ratingBars={profile.ratingBars}
              testimonials={profile.testimonials}
            />
            <LawyerProfileCaseChart segments={profile.caseDistribution} totalCases={profile.totalCases} />
            <LawyerProfileBlogs posts={profile.blogPosts} />
          </div>

          <LawyerProfileSidebar
            overview={profile.sidebarOverview}
            consultationFees={profile.consultationFees}
            similarLawyers={profile.similarLawyers}
          />
      </div>
    </>
  )
}
