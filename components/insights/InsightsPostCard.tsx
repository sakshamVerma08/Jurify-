'use client'

import type { InsightArticle, InsightThumbVariant } from '@/types'
import { cn } from '@/lib/utils'
import { useInsightsStore } from '@/stores/insightsStore'
import { useUiStore } from '@/stores/uiStore'
import { useRouter } from 'next/navigation'

function PostThumbIcon() {
  return (
    <svg className="ins-pt-icon absolute bottom-3 right-3 opacity-10" width="50" height="50" viewBox="0 0 50 50" fill="none" aria-hidden>
      <rect x="5" y="5" width="40" height="40" rx="5" stroke="white" strokeWidth="2" />
      <line x1="12" y1="18" x2="38" y2="18" stroke="white" strokeWidth="1.5" />
      <line x1="12" y1="26" x2="38" y2="26" stroke="white" strokeWidth="1.5" />
      <line x1="12" y1="34" x2="28" y2="34" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}

function catClass(variant: InsightThumbVariant) {
  if (variant === 'blue') return 'blue'
  if (variant === 'green') return 'green'
  if (variant === 'purple') return 'purple'
  return ''
}

interface InsightsPostCardProps {
  article: InsightArticle
  index?: number
}

export function InsightsPostCard({ article, index = 0 }: InsightsPostCardProps) {
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

  const variant = catClass(article.thumbVariant)
  const viewsLabel = article.views.includes('views') ? article.views : `${article.views} views`

  return (
    <article
      className="ins-post-card cursor-pointer"
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => router.push(`/insights/${article.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && router.push(`/insights/${article.id}`)}
      role="button"
      tabIndex={0}
    >
      <div className={cn('ins-post-thumb', variant)}>
        <span className={cn('ins-pt-cat', variant)}>{article.category}</span>
        <PostThumbIcon />
      </div>
      <div className="ins-post-body">
        <h3 className="ins-pc-title">{article.title}</h3>
        <p className="ins-pc-excerpt">{article.excerpt}</p>
        <div className="ins-pc-author">
          <div className="ins-pc-av">{article.author.initials}</div>
          <div className="ins-pc-av-name">{article.author.name}</div>
          {article.author.verified && (
            <div className="ins-pc-vbadge">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                <path d="M1.5 4l1.8 1.8L6.5 2" stroke="#D4853A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
        <div className="ins-pc-meta">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1" />
            <path d="M5.5 3.5v2l1.2 1.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {article.readTime}
          <div className="ins-pc-meta-dot" />
          {article.date}
          <div className="ins-pc-meta-dot" />
          {viewsLabel}
          <div className="ins-pc-actions">
            <button
              type="button"
              className={cn('ins-pc-act-btn', isLiked && 'liked')}
              onClick={(e) => {
                e.stopPropagation()
                toggleLike(article.id)
                showToast(isLiked ? 'Like removed' : 'Article liked!', 'info')
              }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M1 4.5h1.5l1.5-3L7 4V10H3.5L1 8V4.5z" stroke="currentColor" strokeWidth=".9" strokeLinejoin="round" />
              </svg>
              {likeCount}
            </button>
            <button
              type="button"
              className={cn('ins-pc-act-btn', isSaved && 'saved')}
              onClick={(e) => {
                e.stopPropagation()
                toggleSave(article.id)
                showToast(isSaved ? 'Removed from reading list' : 'Saved to reading list', 'info')
              }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M2 1.5h7v9l-3.5-2.5L2 10.5V1.5z" stroke="currentColor" strokeWidth=".9" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="ins-pc-act-btn" onClick={(e) => e.stopPropagation()}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M1 2h9v7H6L4 11V9H1V2z" stroke="currentColor" strokeWidth=".9" strokeLinejoin="round" />
              </svg>
              {article.comments}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
