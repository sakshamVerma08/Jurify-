'use client'

import type { InsightArticle } from '@/types'
import { cn } from '@/lib/utils'
import { useInsightsStore } from '@/stores/insightsStore'
import { useUiStore } from '@/stores/uiStore'
import { useRouter } from 'next/navigation'

interface InsightsFeaturedPostProps {
  article: InsightArticle
}

export function InsightsFeaturedPost({ article }: InsightsFeaturedPostProps) {
  const router = useRouter()
  const toggleLike = useInsightsStore((s) => s.toggleLike)
  const toggleSave = useInsightsStore((s) => s.toggleSave)
  const likedIds = useInsightsStore((s) => s.likedIds)
  const savedIds = useInsightsStore((s) => s.savedIds)
  const likeCounts = useInsightsStore((s) => s.likeCounts)
  const isLiked = likedIds.has(article.id)
  const isSaved = savedIds.has(article.id)
  const likeCount = likeCounts[article.id] ?? article.likes
  const showToast = useUiStore((s) => s.showToast)

  return (
    <div
      className="ins-featured-post"
      onClick={() => router.push(`/insights/${article.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && router.push(`/insights/${article.id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="ins-fp-thumb">
        <div className="ins-fp-thumb-pattern" />
        <span className="ins-fp-cat-badge">{article.category}</span>
        <span className="ins-fp-featured-pill">✦ Featured</span>
        <svg className="ins-fp-thumb-icon" width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden>
          <path d="M50 10L20 25v25c0 20 13 34 30 40 17-6 30-20 30-40V25L50 10z" stroke="white" strokeWidth="3" />
        </svg>
      </div>
      <div className="ins-fp-body">
        <div className="ins-fp-meta">
          <span>{article.date}</span>
          <span className="ins-fp-dot" />
          <span>{article.readTime}</span>
          <span className="ins-fp-dot" />
          <span>{article.views}</span>
        </div>
        <h2 className="ins-fp-title">
          Your Right to Silence: What Police <em>Can and Cannot Do</em> During Questioning
        </h2>
        <p className="ins-fp-excerpt">{article.excerpt}</p>
        <div className="ins-fp-author">
          <div className="ins-fp-av">{article.author.initials}</div>
          <div>
            <div className="ins-fp-av-name">
              {article.author.name}
              {article.author.verified && (
                <span className="ins-fp-av-badge">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                    <path d="M1.5 4l1.8 1.8L6.5 2" stroke="#D4853A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
            <div className="ins-fp-av-role">{article.author.role}</div>
          </div>
        </div>
        <div className="ins-fp-actions">
          <button
            type="button"
            className={cn('ins-fp-action-btn', isLiked && 'liked')}
            onClick={(e) => {
              e.stopPropagation()
              toggleLike(article.id)
              showToast(isLiked ? 'Like removed' : 'Article liked!', 'info')
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path d="M1 5h2l1.5-3L7 4.5V11H3L1 9V5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
            {likeCount}
          </button>
          <button
            type="button"
            className={cn('ins-fp-action-btn', isSaved && 'saved')}
            onClick={(e) => {
              e.stopPropagation()
              toggleSave(article.id)
              showToast(isSaved ? 'Removed from reading list' : 'Saved to reading list', 'info')
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path d="M2 2h9v10l-4.5-3L2 12V2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
            Save
          </button>
          <button
            type="button"
            className="ins-fp-action-btn"
            onClick={(e) => {
              e.stopPropagation()
              showToast('Link copied', 'info')
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <circle cx="10" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1" />
              <circle cx="2.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1" />
              <circle cx="10" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1" />
              <line x1="3.8" y1="5.5" x2="8.7" y2="3.5" stroke="currentColor" strokeWidth="1" />
              <line x1="3.8" y1="7.5" x2="8.7" y2="9.5" stroke="currentColor" strokeWidth="1" />
            </svg>
            Share
          </button>
          <button type="button" className="ins-fp-action-btn" onClick={(e) => e.stopPropagation()}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path d="M1 2h11v8H7L4.5 12V10H1V2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
            {article.comments}
          </button>
          <button type="button" className="ins-fp-read-btn" onClick={(e) => { e.stopPropagation(); router.push(`/insights/${article.id}`) }}>
            Read article
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path d="M2 6.5h9M7.5 3l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
