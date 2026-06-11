import { create } from 'zustand'
import {
  INSIGHT_ARTICLES,
  INSIGHT_COMMENTS,
  INSIGHT_MY_POSTS,
  filterInsightArticles,
  getFeaturedArticle,
  getGridArticles,
} from '@/lib/data/insights'
import type {
  InsightArticle,
  InsightCategory,
  InsightComment,
  InsightMyPost,
  InsightSortOption,
  InsightView,
} from '@/types'

interface InsightsState {
  searchQuery: string
  category: InsightCategory
  verifiedOnly: boolean
  sortBy: InsightSortOption
  likedIds: Set<string>
  savedIds: Set<string>
  likeCounts: Record<string, number>
  comments: InsightComment[]
  myPosts: InsightMyPost[]
  visibleGridCount: number
  setSearchQuery: (q: string) => void
  setCategory: (cat: InsightCategory) => void
  setSortBy: (sort: InsightSortOption) => void
  toggleVerifiedOnly: () => void
  toggleLike: (id: string) => void
  toggleSave: (id: string) => void
  isLiked: (id: string) => boolean
  isSaved: (id: string) => boolean
  getLikeCount: (id: string, base: number) => number
  addComment: (text: string) => void
  loadMore: () => void
  deleteMyPost: (id: string) => void
  getArticle: (slug: string) => InsightArticle | null
  getFilteredGridArticles: () => InsightArticle[]
  getFeatured: () => InsightArticle
}

const initialLikes = Object.fromEntries(INSIGHT_ARTICLES.map((a) => [a.id, a.likes]))

export const useInsightsStore = create<InsightsState>((set, get) => ({
  searchQuery: '',
  category: 'All Topics',
  verifiedOnly: false,
  sortBy: 'latest',
  likedIds: new Set<string>(),
  savedIds: new Set<string>(),
  likeCounts: { ...initialLikes },
  comments: INSIGHT_COMMENTS.map((c) => ({ ...c, replies: c.replies ? [...c.replies] : undefined })),
  myPosts: [...INSIGHT_MY_POSTS],
  visibleGridCount: 6,

  setSearchQuery: (q) => set({ searchQuery: q }),

  setCategory: (cat) => set({ category: cat }),

  setSortBy: (sort) => set({ sortBy: sort }),

  toggleVerifiedOnly: () => set((s) => ({ verifiedOnly: !s.verifiedOnly })),

  toggleLike: (id) =>
    set((s) => {
      const liked = new Set(s.likedIds)
      const likeCounts = { ...s.likeCounts }
      const base = likeCounts[id] ?? 0
      if (liked.has(id)) {
        liked.delete(id)
        likeCounts[id] = Math.max(0, base - 1)
      } else {
        liked.add(id)
        likeCounts[id] = base + 1
      }
      return { likedIds: liked, likeCounts }
    }),

  toggleSave: (id) =>
    set((s) => {
      const saved = new Set(s.savedIds)
      if (saved.has(id)) saved.delete(id)
      else saved.add(id)
      return { savedIds: saved }
    }),

  isLiked: (id) => get().likedIds.has(id),
  isSaved: (id) => get().savedIds.has(id),
  getLikeCount: (id, base) => get().likeCounts[id] ?? base,

  addComment: (text) =>
    set((s) => ({
      comments: [
        {
          id: `c-${Date.now()}`,
          authorInitial: 'PM',
          authorName: 'You',
          authorHighlight: true,
          time: 'Just now',
          text,
          likes: 0,
        },
        ...s.comments,
      ],
    })),

  loadMore: () => set((s) => ({ visibleGridCount: s.visibleGridCount + 3 })),

  deleteMyPost: (id) => set((s) => ({ myPosts: s.myPosts.filter((p) => p.id !== id) })),

  getArticle: (slug: string) => {
    return INSIGHT_ARTICLES.find((a) => a.id === slug) ?? null
  },

  getFilteredGridArticles: () => {
    const { searchQuery, category, verifiedOnly, sortBy } = get()
    return filterInsightArticles(getGridArticles(), { searchQuery, category, verifiedOnly, sortBy })
  },

  getFeatured: () => getFeaturedArticle(),
}))
