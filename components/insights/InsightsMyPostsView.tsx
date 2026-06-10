'use client'

import { INSIGHT_MY_POST_STATS } from '@/lib/data/insights'
import { cn } from '@/lib/utils'
import { useInsightsStore } from '@/stores/insightsStore'
import { useRouter } from 'next/navigation'
import { useUiStore } from '@/stores/uiStore'
import type { InsightPostStatus } from '@/types'

function statusLabel(status: InsightPostStatus) {
  if (status === 'published') return 'Published'
  if (status === 'draft') return 'Draft'
  return 'Under Review'
}

export function InsightsMyPostsView() {
  const myPosts = useInsightsStore((s) => s.myPosts)
  const router = useRouter()
  const deleteMyPost = useInsightsStore((s) => s.deleteMyPost)
  const showToast = useUiStore((s) => s.showToast)

  return (
    <div className="ins-my-posts-view">
      <button type="button" className="ins-pv-back mb-4" onClick={() => router.push('/insights')}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M8 2L3 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Insights
      </button>
      <div className="ins-mp-header">
        <div>
          <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.2px] text-[var(--og)]">Lawyer Only</div>
          <h1 className="ins-mp-title">
            My <em>Articles</em>
          </h1>
        </div>
        <button type="button" className="ins-write-btn" onClick={() => router.push('/insights/write')}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
            <path d="M2 9.5l1-3L9.5 1l2 2-6.5 6.5-3 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Write New Article
        </button>
      </div>

      <div className="mb-7 grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {INSIGHT_MY_POST_STATS.map((stat) => (
          <div key={stat.label} className="rounded-[14px] border border-white/[0.07] bg-[var(--card)] px-5 py-[18px]">
            <div className="mb-1 text-2xl font-bold text-[var(--t)]">{stat.value}</div>
            <div className="text-[11.5px] text-[var(--td)]">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="ins-mp-list">
        {myPosts.map((post) => (
          <div key={post.id} className="ins-mp-card">
            <div className="ins-mp-thumb" />
            <div className="ins-mp-info">
              <div className="ins-mp-post-title">{post.title}</div>
              <div className="ins-mp-post-meta">
                <span className="ins-mp-meta">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                    <rect x="1" y="1" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  {post.category}
                </span>
                <span className="ins-mp-meta">{post.date}</span>
                {post.status === 'published' && (
                  <>
                    <span className="ins-mp-meta">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                        <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1" />
                        <line x1="3" y1="5.5" x2="5.5" y2="5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                      {post.views} views
                    </span>
                    <span className="ins-mp-meta">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                        <path d="M1 4.5h1.5l1.5-3L7 4V10H3.5L1 8V4.5z" stroke="currentColor" strokeWidth=".9" strokeLinejoin="round" />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="ins-mp-meta">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                        <path d="M1 2h9v7H6L4 11V9H1V2z" stroke="currentColor" strokeWidth=".9" strokeLinejoin="round" />
                      </svg>
                      {post.comments}
                    </span>
                  </>
                )}
              </div>
            </div>
            <span className={cn('ins-mp-status', post.status)}>{statusLabel(post.status)}</span>
            <div className="ins-mp-actions">
              {post.status === 'published' && (
                <button type="button" className="ins-mp-act-btn view" onClick={() => router.push(`/insights/${post.id}`)}>
                  View
                </button>
              )}
              <button type="button" className="ins-mp-act-btn edit" onClick={() => router.push(`/insights/${post.id}/edit`)}>
                Edit
              </button>
              <button
                type="button"
                className="ins-mp-act-btn del"
                onClick={() => {
                  deleteMyPost(post.id)
                  showToast('Post deleted', 'info')
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
