// FILE: components/lawyers/LawyerSearchPageContent.tsx
// TYPE: Client Component

'use client'

import { LawyerCard } from '@/components/lawyers/LawyerCard'
import { LawyerProfileModal } from '@/components/lawyers/LawyerProfileModal'
import { LawyerSearchEmpty } from '@/components/lawyers/LawyerSearchEmpty'
import { LawyerSearchFilters } from '@/components/lawyers/LawyerSearchFilters'
import { LawyerSearchHeader } from '@/components/lawyers/LawyerSearchHeader'
import { LawyerSearchToolbar } from '@/components/lawyers/LawyerSearchToolbar'
import { filterAndSortLawyers } from '@/lib/data/lawyerSearch'
import { cn } from '@/lib/utils'
import { useLawyerSearchStore } from '@/stores/lawyerSearchStore'
import { useEffect } from 'react'
import type { LawyerListing } from '@/types'

export function LawyerSearchPageContent({ initialLawyers }: { initialLawyers: LawyerListing[] }) {
  const viewRole = useLawyerSearchStore((s) => s.viewRole)
  const viewMode = useLawyerSearchStore((s) => s.viewMode)
  const lawyers = useLawyerSearchStore((s) => s.lawyers)
  const searchQuery = useLawyerSearchStore((s) => s.searchQuery)
  const verifiedOnly = useLawyerSearchStore((s) => s.verifiedOnly)
  const availabilityFilter = useLawyerSearchStore((s) => s.availabilityFilter)
  const practiceAreas = useLawyerSearchStore((s) => s.practiceAreas)
  const minExperience = useLawyerSearchStore((s) => s.minExperience)
  const languages = useLawyerSearchStore((s) => s.languages)
  const locations = useLawyerSearchStore((s) => s.locations)
  const sortBy = useLawyerSearchStore((s) => s.sortBy)

  // Hydrate store on mount
  useEffect(() => {
    useLawyerSearchStore.setState({ lawyers: initialLawyers })
  }, [initialLawyers])

  const filtered = filterAndSortLawyers(lawyers, {
    searchQuery,
    verifiedOnly,
    availabilityFilter,
    practiceAreas,
    minExperience,
    languages,
    locations,
    sortBy,
  })

  return (
    <>
      <LawyerSearchHeader />

        <div className="grid grid-cols-1 items-start lg:grid-cols-[280px_1fr]">
          <LawyerSearchFilters />

          <main className="px-6 py-8 pb-20 md:px-10 lg:pl-10 lg:pr-12">
            <LawyerSearchToolbar count={filtered.length} />

            <div
              className={cn(
                'grid gap-4',
                viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              )}
            >
              {filtered.length === 0 ? (
                <LawyerSearchEmpty />
              ) : (
                filtered.map((lawyer, index) => (
                  <LawyerCard
                    key={lawyer.id}
                    lawyer={lawyer}
                    index={index}
                    viewRole={viewRole}
                    viewMode={viewMode}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      <LawyerProfileModal />
    </>
  )
}
