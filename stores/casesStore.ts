import { create } from 'zustand'
import { LEGAL_CASES, MY_POSTED_CASES } from '@/lib/data/cases'
import type {
  CaseFilters,
  CasesTab,
  LegalCase,
  UserRole,
  MyPostedCase,
} from '@/types'

interface CasesState {
  viewRole: UserRole
  activeTab: CasesTab
  filters: CaseFilters
  bookmarkedIds: string[]
  detailCaseId: string | null
  postModalOpen: boolean
  detailModalOpen: boolean
  myPostedCases: MyPostedCase[]
  editingCaseId: string | null
  editModalOpen: boolean
  setViewRole: (role: UserRole) => void
  setActiveTab: (tab: CasesTab) => void
  setSearch: (search: string) => void
  setSort: (sort: CaseFilters['sort']) => void
  toggleCategory: (category: string) => void
  toggleUrgency: (urgency: CaseFilters['urgencies'][number]) => void
  toggleStage: (stage: CaseFilters['stages'][number]) => void
  setLocation: (location: string) => void
  setPostedWithin: (postedWithin: CaseFilters['postedWithin']) => void
  resetFilters: () => void
  toggleBookmark: (caseId: string) => void
  isBookmarked: (caseId: string) => boolean
  openDetailModal: (caseId: string) => void
  closeDetailModal: () => void
  openPostModal: () => void
  closePostModal: () => void
  openEditModal: (caseId: string) => void
  closeEditModal: () => void
  addPostedCase: (newCase: Omit<MyPostedCase, 'id' | 'postedAgo' | 'progressStep' | 'applicantCount' | 'applicantInitials' | 'stageLabel' | 'assignedLawyerId' | 'assignedLawyerName' | 'applicantsDetail'>) => void
  updatePostedCase: (caseId: string, updated: Partial<MyPostedCase>) => void
  assignLawyerToCase: (caseId: string, lawyerId: string, lawyerName: string, lawyerInitials: string) => void
  closePostedCase: (caseId: string) => void
  getFilteredCases: () => LegalCase[]
  getDetailCase: () => LegalCase | null
}

const DEFAULT_FILTERS: CaseFilters = {
  categories: [],
  urgencies: [],
  location: '',
  postedWithin: 'any',
  stages: [],
  search: '',
  sort: 'newest',
}

function parsePostedAgo(postedAgo: string): number {
  if (postedAgo.includes('day')) {
    const match = postedAgo.match(/(\d+)/)
    return match ? Number(match[1]) : 1
  }
  if (postedAgo.includes('week')) return 7
  return 30
}

function filterByPostedWithin(postedAgo: string, within: CaseFilters['postedWithin']): boolean {
  if (within === 'any') return true
  const days = parsePostedAgo(postedAgo)
  if (within === '24h') return days <= 1
  if (within === '7d') return days <= 7
  if (within === '30d') return days <= 30
  return true
}

export const useCasesStore = create<CasesState>((set, get) => ({
  viewRole: 'lawyer',
  activeTab: 'browse',
  filters: DEFAULT_FILTERS,
  bookmarkedIds: [],
  detailCaseId: null,
  postModalOpen: false,
  detailModalOpen: false,
  myPostedCases: [...MY_POSTED_CASES],
  editingCaseId: null,
  editModalOpen: false,

  setViewRole: (role) =>
    set({
      viewRole: role,
      activeTab: 'browse',
    }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),

  setSort: (sort) =>
    set((state) => ({ filters: { ...state.filters, sort } })),

  toggleCategory: (category) =>
    set((state) => {
      const categories = state.filters.categories.includes(category)
        ? state.filters.categories.filter((c) => c !== category)
        : [...state.filters.categories, category]
      return { filters: { ...state.filters, categories } }
    }),

  toggleUrgency: (urgency) =>
    set((state) => {
      const urgencies = state.filters.urgencies.includes(urgency)
        ? state.filters.urgencies.filter((u) => u !== urgency)
        : [...state.filters.urgencies, urgency]
      return { filters: { ...state.filters, urgencies } }
    }),

  toggleStage: (stage) =>
    set((state) => {
      const stages = state.filters.stages.includes(stage)
        ? state.filters.stages.filter((s) => s !== stage)
        : [...state.filters.stages, stage]
      return { filters: { ...state.filters, stages } }
    }),

  setLocation: (location) =>
    set((state) => ({ filters: { ...state.filters, location } })),

  setPostedWithin: (postedWithin) =>
    set((state) => ({ filters: { ...state.filters, postedWithin } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  toggleBookmark: (caseId) =>
    set((state) => ({
      bookmarkedIds: state.bookmarkedIds.includes(caseId)
        ? state.bookmarkedIds.filter((id) => id !== caseId)
        : [...state.bookmarkedIds, caseId],
    })),

  isBookmarked: (caseId) => get().bookmarkedIds.includes(caseId),

  openDetailModal: (caseId) => set({ detailCaseId: caseId, detailModalOpen: true }),

  closeDetailModal: () => set({ detailModalOpen: false, detailCaseId: null }),

  openPostModal: () => set({ postModalOpen: true }),

  closePostModal: () => set({ postModalOpen: false }),

  openEditModal: (caseId) => set({ editingCaseId: caseId, editModalOpen: true }),

  closeEditModal: () => set({ editingCaseId: null, editModalOpen: false }),

  addPostedCase: (newCase) =>
    set((state) => {
      const id = `posted-${Math.floor(Math.random() * 10000)}`
      const createdCase: MyPostedCase = {
        ...newCase,
        id,
        category: newCase.category || 'Family Law',
        stage: (newCase.stage as any) || 'initial',
        stageLabel: newCase.stage || 'Initial Stage',
        postedAgo: 'Just now',
        progressStep: 0,
        applicantInitials: ['AB', 'RS'],
        applicantCount: 2,
        applicantsDetail: [
          {
            id: 'ananya-bose',
            name: 'Adv. Ananya Bose',
            initials: 'AB',
            rating: 4.4,
            experience: 4,
            bio: 'Emerging criminal defence lawyer based in Kolkata. Strong background in family law, custody mediations, and domestic violence matters.'
          },
          {
            id: 'rahul-sharma',
            name: 'Adv. Rahul Sharma',
            initials: 'RS',
            rating: 4.7,
            experience: 12,
            bio: 'Family disputes specialist with 12 years of practice. Extensive litigation and court representation history across Mumbai and Pune.'
          }
        ]
      }
      return { myPostedCases: [createdCase, ...state.myPostedCases] }
    }),

  updatePostedCase: (caseId, updated) =>
    set((state) => ({
      myPostedCases: state.myPostedCases.map((c) =>
        c.id === caseId ? { ...c, ...updated } : c
      ),
    })),

  assignLawyerToCase: (caseId, lawyerId, lawyerName, lawyerInitials) =>
    set((state) => ({
      myPostedCases: state.myPostedCases.map((c) =>
        c.id === caseId
          ? {
            ...c,
            assignedLawyerId: lawyerId,
            assignedLawyerName: lawyerName,
            progressStep: 1,
            stage: 'investigation',
            stageLabel: 'Investigation',
            applicantInitials: [lawyerInitials],
            applicantCount: 1,
          }
          : c
      ),
    })),

  closePostedCase: (caseId) =>
    set((state) => ({
      myPostedCases: state.myPostedCases.filter((c) => c.id !== caseId),
    })),

  getFilteredCases: () => {
    const { filters } = get()
    let results = [...LEGAL_CASES]

    if (filters.categories.length > 0) {
      results = results.filter((c) => filters.categories.includes(c.category))
    }
    if (filters.urgencies.length > 0) {
      results = results.filter((c) => filters.urgencies.includes(c.urgency))
    }
    if (filters.stages.length > 0) {
      results = results.filter((c) => filters.stages.includes(c.stage))
    }
    if (filters.location.trim()) {
      const q = filters.location.toLowerCase()
      results = results.filter((c) => c.location.toLowerCase().includes(q))
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      )
    }
    results = results.filter((c) => filterByPostedWithin(c.postedAgo, filters.postedWithin))

    if (filters.sort === 'deadline') {
      results.sort((a, b) => a.deadline.localeCompare(b.deadline))
    } else if (filters.sort === 'relevant') {
      const urgencyOrder = { high: 0, medium: 1, low: 2 }
      results.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency])
    }

    return results
  },

  getDetailCase: () => {
    const { detailCaseId } = get()
    if (!detailCaseId) return null
    return LEGAL_CASES.find((c) => c.id === detailCaseId) ?? null
  },
}))
