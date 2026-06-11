'use client'

import { INSIGHT_WRITE_CATEGORIES } from '@/lib/data/insights'
import { cn } from '@/lib/utils'
import { useInsightsStore } from '@/stores/insightsStore'
import { useUiStore } from '@/stores/uiStore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TOOLBAR_BUTTONS = ['B', 'I', 'U', 'H2', 'H3', '•', '1.', '"', '—'] as const

interface InsightsWriteViewProps {
  slug?: string
  isEditMode?: boolean
}

export function InsightsWriteView({ slug, isEditMode }: InsightsWriteViewProps) {
  const router = useRouter()
  const showToast = useUiStore((s) => s.showToast)
  const [activeTools, setActiveTools] = useState<Set<string>>(new Set())
  const [tags, setTags] = useState(['Criminal Law', 'BNSS 2023', 'Police Powers'])
  const [tagInput, setTagInput] = useState('')
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleTool = (btn: string) => {
    setActiveTools((prev) => {
      const next = new Set(prev)
      if (next.has(btn)) next.delete(btn)
      else next.add(btn)
      return next
    })
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    const val = tagInput.trim()
    if (!val || tags.includes(val)) return
    setTags([...tags, val])
    setTagInput('')
  }

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

  const publish = () => {
    showToast('Article published successfully!', 'ok')
    setTimeout(() => router.push('/insights/my-posts'), 1200)
  }

  return (
    <div className="ins-write-view">
      <button type="button" className="ins-pv-back mb-4" onClick={() => router.push('/insights')}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M8 2L3 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Insights
      </button>
      <div className="ins-wv-header">
        <h1 className="ins-wv-title-main">
          {isEditMode ? 'Edit' : 'Write an'} <em>Article</em>
        </h1>
        <div className="ins-wv-actions">
          <button type="button" className="ins-wv-btn-draft" onClick={() => showToast('Draft saved', 'info')}>
            Save Draft
          </button>
          <button type="button" className="ins-wv-btn-preview" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button type="button" className="ins-wv-btn-publish" onClick={publish}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 1v10M3.5 8l3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Publish
          </button>
        </div>
      </div>

      {showPreview ? (
        <div className="ins-wv-card">
          {coverImage && <img src={coverImage} alt="Cover" className="w-full rounded-xl mb-8 object-cover max-h-[400px]" />}
          <h1 className="text-[32px] font-bold leading-tight text-[var(--t)] mb-6">{title || 'Untitled Article'}</h1>
          <div className="whitespace-pre-wrap text-base leading-relaxed text-[var(--tm)] font-light">{content || 'Nothing written yet.'}</div>
        </div>
      ) : (
        <>
          <div className="ins-wv-card">
            <input className="ins-title-input" type="text" placeholder="Article title…" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="ins-form-input mb-5 w-full" type="text" placeholder="Short excerpt (shown in listings)…" />
            <div className="ins-editor-toolbar">
              {TOOLBAR_BUTTONS.map((btn, i) => (
                <span key={btn} className="contents">
                  {(btn === 'H2' || btn === '•') && i > 0 && <div className="ins-et-sep" />}
                  <button
                    type="button"
                    className={cn('ins-et-btn', activeTools.has(btn) && 'active')}
                    onClick={() => toggleTool(btn)}
                  >
                    {btn}
                  </button>
                </span>
              ))}
            </div>
            <textarea
              className="ins-editor-area"
              placeholder="Start writing your article here. Use plain language — your readers may not have a legal background."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="ins-wv-card">
            <div className="ins-cover-upload-zone relative overflow-hidden">
              {coverImage ? (
                <>
                  <img src={coverImage} alt="Cover" className="h-full w-full object-cover absolute inset-0 z-0 opacity-30 blur-sm" />
                  <div className="relative z-10 flex flex-col items-center p-4">
                    <img src={coverImage} alt="Cover preview" className="h-[120px] rounded-lg mb-4 object-cover shadow-lg" />
                    <button type="button" className="ins-cuz-title text-white hover:underline cursor-pointer bg-black/50 px-3 py-1 rounded" onClick={() => setCoverImage(null)}>
                      Remove image
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input type="file" accept="image/*" className="absolute inset-0 cursor-pointer opacity-0 z-20" onChange={handleImageUpload} title="Upload cover image" />
                  <div className="ins-cuz-icon relative z-10">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <rect x="2" y="3" width="16" height="14" rx="2" stroke="#D4853A" strokeWidth="1.3" />
                      <circle cx="7" cy="8" r="2" stroke="#D4853A" strokeWidth="1.1" />
                      <path d="M2 14l4-3.5 3 2.5 3-4 4 5" stroke="#D4853A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="ins-cuz-title relative z-10">Upload cover image</div>
                  <div className="ins-cuz-sub relative z-10">JPG, PNG, WebP · Max 5MB · Recommended 1400×700px</div>
                </>
              )}
            </div>
          </div>

          <div className="ins-wv-card">
            <div className="ins-wv-meta-grid">
              <div className="ins-form-group">
                <label className="ins-form-label">
                  Category <span className="text-[var(--danger)]">*</span>
                </label>
                <select className="ins-form-select login-input" defaultValue="">
                  <option value="" disabled>
                    Select category
                  </option>
                  {INSIGHT_WRITE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ins-form-group">
                <label className="ins-form-label">Reading Time (auto or manual)</label>
                <input className="ins-form-input" type="text" placeholder="e.g. 6 min read" />
              </div>
            </div>
            <div className="ins-form-group mt-3.5">
              <label className="ins-form-label">Tags</label>
              <div className="ins-tag-input-wrap" onClick={() => document.getElementById('ins-tag-input')?.focus()} onKeyDown={() => {}} role="presentation">
                {tags.map((tag) => (
                  <span key={tag} className="ins-tag-chip">
                    {tag}
                    <button type="button" className="ins-tag-chip-remove" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                      ×
                    </button>
                  </span>
                ))}
                <input
                  id="ins-tag-input"
                  className="ins-tag-input"
                  type="text"
                  placeholder="Add tag and press Enter…"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end gap-2.5">
        <button type="button" className="ins-wv-btn-draft px-6 py-3" onClick={() => router.push('/insights/my-posts')}>
          Cancel
        </button>
        <button type="button" className="ins-wv-btn-publish px-8 py-3" onClick={publish}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M7 1v10M3.5 8l3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {isEditMode ? 'Save Changes' : 'Publish Article'}
        </button>
      </div>
    </div>
  )
}
