import { create } from 'zustand'
import { filterAndSortLawyers } from '@/lib/data/lawyerSearch'
import type {
  LawyerListing,
  LawyerSearchRole,
  LawyerSearchSortOption,
  LawyerSearchViewMode,
} from '@/types'

interface LawyerSearchState {
  lawyers: LawyerListing[]
  viewRole: LawyerSearchRole
  viewMode: LawyerSearchViewMode
  searchQuery: string
  verifiedOnly: boolean
  availabilityFilter: 'Both' | 'Pro Bono' | 'Paid'
  practiceAreas: string[]
  minExperience: number
  languages: string[]
  locations: string[]
  sortBy: LawyerSearchSortOption
  selectedLawyerId: string | null
  modalOpen: boolean
  setViewRole: (role: LawyerSearchRole) => void
  setViewMode: (mode: LawyerSearchViewMode) => void
  setSearchQuery: (q: string) => void
  setVerifiedOnly: (v: boolean) => void
  toggleVerifiedOnly: () => void
  setAvailabilityFilter: (f: 'Both' | 'Pro Bono' | 'Paid') => void
  togglePracticeArea: (area: string) => void
  setMinExperience: (n: number) => void
  toggleLanguage: (lang: string) => void
  toggleLocation: (loc: string) => void
  setSortBy: (sort: LawyerSearchSortOption) => void
  resetFilters: () => void
  openModal: (id: string) => void
  closeModal: () => void
  sendConnect: (id: string) => void
  getFilteredLawyers: () => LawyerListing[]
  getSelectedLawyer: () => LawyerListing | null
}

const defaultFilters = {
  searchQuery: '',
  verifiedOnly: false,
  availabilityFilter: 'Both' as const,
  practiceAreas: [] as string[],
  minExperience: 0,
  languages: [] as string[],
  locations: [] as string[],
  sortBy: 'relevant' as LawyerSearchSortOption,
}

export const useLawyerSearchStore = create<LawyerSearchState>((set, get) => ({
  lawyers: [],
  viewRole: 'client',
  viewMode: 'grid',
  ...defaultFilters,
  selectedLawyerId: null,
  modalOpen: false,

  setViewRole: (role) => set({ viewRole: role }),

  setViewMode: (mode) => set({ viewMode: mode }),

  setSearchQuery: (q) => set({ searchQuery: q }),

  setVerifiedOnly: (v) => set({ verifiedOnly: v }),

  toggleVerifiedOnly: () => set((s) => ({ verifiedOnly: !s.verifiedOnly })),

  setAvailabilityFilter: (f) => set({ availabilityFilter: f }),

  togglePracticeArea: (area) =>
    set((s) => ({
      practiceAreas: s.practiceAreas.includes(area)
        ? s.practiceAreas.filter((a) => a !== area)
        : [...s.practiceAreas, area],
    })),

  setMinExperience: (n) => set({ minExperience: n }),

  toggleLanguage: (lang) =>
    set((s) => ({
      languages: s.languages.includes(lang)
        ? s.languages.filter((l) => l !== lang)
        : [...s.languages, lang],
    })),

  toggleLocation: (loc) =>
    set((s) => ({
      locations: s.locations.includes(loc)
        ? s.locations.filter((l) => l !== loc)
        : [...s.locations, loc],
    })),

  setSortBy: (sort) => set({ sortBy: sort }),

  resetFilters: () => set({ ...defaultFilters }),

  openModal: (id) => set({ selectedLawyerId: id, modalOpen: true }),

  closeModal: () => set({ modalOpen: false, selectedLawyerId: null }),

  sendConnect: (id) =>
    set((s) => ({
      lawyers: s.lawyers.map((l) =>
        l.id === id && l.connectStatus === 'none' ? { ...l, connectStatus: 'pending' as const } : l
      ),
    })),

  getFilteredLawyers: () => {
    const s = get()
    return filterAndSortLawyers(s.lawyers, {
      searchQuery: s.searchQuery,
      verifiedOnly: s.verifiedOnly,
      availabilityFilter: s.availabilityFilter,
      practiceAreas: s.practiceAreas,
      minExperience: s.minExperience,
      languages: s.languages,
      locations: s.locations,
      sortBy: s.sortBy,
    })
  },

  getSelectedLawyer: () => {
    const { lawyers, selectedLawyerId } = get()
    return lawyers.find((l) => l.id === selectedLawyerId) ?? null
  },
}))
