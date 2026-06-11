'use client'

import Link from 'next/link'
import { INSIGHT_RELATED } from '@/lib/data/insights'
import { cn } from '@/lib/utils'
import { useInsightsStore } from '@/stores/insightsStore'
import { useUiStore } from '@/stores/uiStore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function InsightsPostView({ slug }: { slug: string }) {
  const article = useInsightsStore((s) => s.getArticle(slug))
  const router = useRouter()
  const toggleLike = useInsightsStore((s) => s.toggleLike)
  const toggleSave = useInsightsStore((s) => s.toggleSave)
  const likedIds = useInsightsStore((s) => s.likedIds)
  const savedIds = useInsightsStore((s) => s.savedIds)
  const likeCounts = useInsightsStore((s) => s.likeCounts)
  const articleId = article?.id ?? ''
  const isLiked = likedIds.has(articleId)
  const isSaved = savedIds.has(articleId)
  const likeCount = likeCounts[articleId] ?? article?.likes ?? 0
  const comments = useInsightsStore((s) => s.comments)
  const addComment = useInsightsStore((s) => s.addComment)
  const showToast = useUiStore((s) => s.showToast)
  const [commentText, setCommentText] = useState('')

  if (!article) return null

  const contentHtml = article.contentHtml ?? `<p>${article.excerpt}</p>`

  const handlePostComment = () => {
    const text = commentText.trim()
    if (!text) {
      showToast('Please write a comment first', 'info')
      return
    }
    addComment(text)
    setCommentText('')
    showToast('Comment posted!', 'ok')
  }

  return (
    <div className="ins-post-view">
      <button type="button" className="ins-pv-back" onClick={() => router.push('/insights')}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M8 2L3 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Insights
      </button>

      <header className="ins-pv-header">
        <div className="ins-pv-cat-row">
          <span className="ins-pv-cat-badge">{article.category}</span>
          <span className="ins-pv-date">{article.date}</span>
        </div>
        <h1 className="ins-pv-title">
          {article.id === 'right-to-silence' ? (
            <>
              Your Right to Silence: What Police <em>Can and Cannot Do</em> During Questioning
            </>
          ) : (
            article.title
          )}
        </h1>
        {article.subtitle && <p className="ins-pv-subtitle">{article.subtitle}</p>}
        <div className="ins-pv-author-row">
          <div className="ins-pva-av">{article.author.initials}</div>
          <div>
            <div className="ins-pva-name">
              {article.author.name}
              {article.author.verified && (
                <span className="ins-pva-verified">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                    <path d="M1.5 4.5l2 1.5L7.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Verified Advocate
                </span>
              )}
            </div>
            <div className="ins-pva-meta">
              {article.author.role} · {article.readTime} · {article.views}
            </div>
          </div>
        </div>
      </header>

      <div className="ins-pv-layout">
        <aside className="ins-pv-sticky-actions">
          <button
            type="button"
            className={cn('ins-sact-btn', isLiked && 'liked')}
            onClick={() => {
              toggleLike(article.id)
              showToast(isLiked ? 'Like removed' : 'Article liked!', 'info')
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M1.5 7h2.5l2-4L10 6.5V15H5.5L1.5 12V7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <span className="ins-sact-count">{likeCount}</span>
          </button>
          <button
            type="button"
            className={cn('ins-sact-btn', isSaved && 'saved')}
            onClick={() => {
              toggleSave(article.id)
              showToast(isSaved ? 'Removed from reading list' : 'Saved to reading list', 'info')
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M3 2.5h12v13l-6-4.5L3 15.5V2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="ins-sact-sep" />
          <button type="button" className="ins-sact-btn" onClick={() => showToast('Link copied', 'info')}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <circle cx="13" cy="3.5" r="2" stroke="currentColor" strokeWidth="1.1" />
              <circle cx="3.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.1" />
              <circle cx="13" cy="14.5" r="2" stroke="currentColor" strokeWidth="1.1" />
              <line x1="5.2" y1="7.8" x2="11.3" y2="4.7" stroke="currentColor" strokeWidth="1.1" />
              <line x1="5.2" y1="10.2" x2="11.3" y2="13.3" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </button>
          <button type="button" className="ins-sact-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M1.5 3h15v11H9L6 17v-3H1.5V3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <span className="ins-sact-count">{comments.length + article.comments}</span>
          </button>
        </aside>

        <div className="ins-pv-content">
          <div className="ins-pv-cover">
            <div className="ins-pv-cover-pattern" />
          </div>
          <div className="ins-pv-rich-text" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {article.tags && article.tags.length > 0 && (
            <div className="ins-pv-tags">
              {article.tags.map((tag) => (
                <span key={tag} className="ins-pv-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="ins-author-card">
            <div className="ins-ac-av">{article.author.initials}</div>
            <div className="ins-ac-info">
              <div className="ins-ac-name">{article.author.name}</div>
              <div className="ins-ac-role">{article.author.role}</div>
              {article.author.bio && <p className="ins-ac-bio">{article.author.bio}</p>}
              {article.author.profileHref && (
                <Link href={article.author.profileHref} className="ins-ac-profile-btn">
                  View Profile
                </Link>
              )}
            </div>
          </div>

          <section className="ins-comments-section">
            <h2 className="ins-cs-head">
              Comments
              <span className="text-[var(--td)] text-sm font-normal">({comments.length})</span>
            </h2>
            <div className="ins-comment-input-row">
              <div className="ins-ci-av">PM</div>
              <div className="ins-ci-wrap">
                <textarea
                  className="ins-ci-input"
                  placeholder="Add your thoughts, questions, or insights…"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="button" className="ins-ci-btn" onClick={handlePostComment}>
                  Post Comment
                </button>
              </div>
            </div>
            <div className="ins-comments-list">
              {comments.map((c) => (
                <div key={c.id} className="ins-comment">
                  <div className={cn('ins-cmt-av', c.authorHighlight && 'highlight')}>{c.authorInitial}</div>
                  <div className="ins-cmt-body">
                    <div className="ins-cmt-head">
                      <span className={cn('ins-cmt-name', c.authorHighlight && 'highlight')}>{c.authorName}</span>
                      <span className="ins-cmt-time">{c.time}</span>
                    </div>
                    <p className="ins-cmt-text">{c.text}</p>
                    <div className="ins-cmt-actions">
                      <button type="button" className="ins-cmt-act">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path d="M1 5h2l1.5-3L7 4.5V11H4L1 9V5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                        </svg>
                        {c.likes}
                      </button>
                    </div>
                    {c.replies && c.replies.length > 0 && (
                      <div className="ins-cmt-replies">
                        {c.replies.map((r) => (
                          <div key={r.id} className="ins-cmt-reply">
                            <div className={cn('ins-cmt-av small', r.authorHighlight && 'highlight')}>{r.authorInitial}</div>
                            <div className="ins-cmt-body">
                              <div className="ins-cmt-head">
                                <span className={cn('ins-cmt-name', r.authorHighlight && 'highlight')}>{r.authorName}</span>
                                <span className="ins-cmt-time">{r.time}</span>
                              </div>
                              <p className="ins-cmt-text">{r.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="ins-pv-sidebar">
          <div className="ins-pvs-card">
            <div className="ins-pvs-title">Related Articles</div>
            {INSIGHT_RELATED.map((rp) => (
              <button
                key={rp.id}
                type="button"
                className="ins-related-post"
                onClick={() => router.push(`/insights/${rp.id}`)}
              >
                <div className="ins-rp-thumb" />
                <div>
                  <div className="ins-rp-title">{rp.title}</div>
                  <div className="ins-rp-meta">
                    {rp.author} · {rp.readTime}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
