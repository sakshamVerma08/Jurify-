'use client'

import { useMemo } from 'react'
import { INSIGHT_CATEGORIES, INSIGHT_SORT_OPTIONS } from '@/lib/data/insights'
import { cn } from '@/lib/utils'
import { useInsightsStore } from '@/stores/insightsStore'
import { useUiStore } from '@/stores/uiStore'
import { useRouter } from 'next/navigation'
import { InsightsFeaturedPost } from '@/components/insights/InsightsFeaturedPost'
import { InsightsPostCard } from '@/components/insights/InsightsPostCard'
import type { InsightSortOption } from '@/types'
import { useSession } from '@/lib/auth/auth-client'

export function InsightsListingView() {
  const searchQuery = useInsightsStore((s) => s.searchQuery)
  const category = useInsightsStore((s) => s.category)
  const verifiedOnly = useInsightsStore((s) => s.verifiedOnly)
  const sortBy = useInsightsStore((s) => s.sortBy)
  const visibleGridCount = useInsightsStore((s) => s.visibleGridCount)
  const setSearchQuery = useInsightsStore((s) => s.setSearchQuery)
  const setCategory = useInsightsStore((s) => s.setCategory)
  const setSortBy = useInsightsStore((s) => s.setSortBy)
  const toggleVerifiedOnly = useInsightsStore((s) => s.toggleVerifiedOnly)
  const router = useRouter()
  const loadMore = useInsightsStore((s) => s.loadMore)
  const getFeatured = useInsightsStore((s) => s.getFeatured)
  const getFilteredGridArticles = useInsightsStore((s) => s.getFilteredGridArticles)
  const showToast = useUiStore((s) => s.showToast)
  const { data: session } = useSession()

  const featured = useMemo(() => getFeatured(), [getFeatured])
  const filtered = useMemo(
    () => getFilteredGridArticles(),
    [getFilteredGridArticles, searchQuery, category, verifiedOnly, sortBy]
  )

  const visible = filtered.slice(0, visibleGridCount)
  const showFeatured = category === 'All Topics' && !searchQuery.trim() && !verifiedOnly

  return (
    <>
      <div className="ins-hero-band">
        <div className="ins-hb-inner">
          <div className="ins-hb-kicker">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
              <rect x="1" y="1" width="9" height="9" rx="1.5" stroke="rgba(245,240,234,0.4)" strokeWidth="1" />
              <line x1="3" y1="4.5" x2="8" y2="4.5" stroke="rgba(245,240,234,0.4)" strokeWidth=".9" />
              <line x1="3" y1="6.5" x2="8" y2="6.5" stroke="rgba(245,240,234,0.4)" strokeWidth=".9" />
            </svg>
            From Verified Legal Professionals
          </div>
          <h1 className="ins-hb-title">
            Legal <em>Insights</em>
          </h1>
          <div className="ins-hb-row">
            <p className="ins-hb-sub">
              Plain-language legal guides, analysis, and commentary written by Jurify&apos;s verified advocates.
              Understand your rights — for free.
            </p>
            <div className="ins-hb-right">
              <div className="ins-search-wrap">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                  <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="10" y1="10" x2="13" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <input
                  className="ins-search-input"
                  type="text"
                  placeholder="Search articles…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {session && (session.user as any).role === 'LAWYER' && (
                <button type="button" className="ins-write-btn" onClick={() => router.push('/insights/write')}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                    <path d="M2 9.5l1-3L9.5 1l2 2-6.5 6.5-3 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Write
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="ins-filter-bar">
        <div className="ins-fb-tabs">
          {INSIGHT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={cn('ins-cat-tab', category === cat && 'active')}
              onClick={() => {
                setCategory(cat)
                showToast(`Filtered: ${cat}`, 'info')
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="ins-fb-right">
          <select
            className="ins-sort-select login-input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as InsightSortOption)}
          >
            {INSIGHT_SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={cn('ins-verified-toggle', verifiedOnly && 'on')}
            onClick={() => {
              toggleVerifiedOnly()
              showToast(verifiedOnly ? 'Showing all authors' : 'Showing verified authors only', 'info')
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path d="M6.5 1L2 3v3.5c0 3 2 5 4.5 5.5C9 12 11 10 11 6.5V3L6.5 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
              <path d="M4.5 6.5l1.5 1.5L9 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified Authors Only
            <div className={cn('ins-vt-track', verifiedOnly && 'on')}>
              <div className="ins-vt-thumb" />
            </div>
          </button>
        </div>
      </div>

      <div className="ins-listing-content">
        {showFeatured && (
          <>
            <div className="ins-section-label">Featured Article</div>
            <InsightsFeaturedPost article={featured} />
          </>
        )}

        <div className="ins-section-label">Latest Articles</div>
        <div className="ins-posts-grid">
          {visible.map((article, index) => (
            <InsightsPostCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {visible.length < filtered.length && (
          <div className="ins-load-more-wrap">
            <button
              type="button"
              className="ins-load-more-btn"
              onClick={() => {
                loadMore()
                showToast('Loading more articles…', 'info')
              }}
            >
              Load more articles
            </button>
          </div>
        )}
      </div>
    </>
  )
}
