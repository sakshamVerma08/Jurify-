// FILE: components/lawyer-profile/LawyerProfileBlogs.tsx
// TYPE: Client Component

'use client'

import { ProfileSectionCard } from '@/components/lawyer-profile/ProfileSectionCard'
import { useUiStore } from '@/stores/uiStore'
import type { LawyerBlogPost } from '@/types'

interface LawyerProfileBlogsProps {
  posts: LawyerBlogPost[]
}

export function LawyerProfileBlogs({ posts }: LawyerProfileBlogsProps) {
  const showToast = useUiStore((s) => s.showToast)

  return (
    <ProfileSectionCard
      tag="Section 06"
      title={
        <>
          Published <em className="italic text-o2">Insights</em>
        </>
      }
      action={
        <button
          type="button"
          onClick={() => showToast('Opening all posts…', 'info')}
          className="cursor-pointer rounded-lg border border-og/20 bg-og/[0.08] px-3.5 py-1.5 font-sans text-[12.5px] text-og transition-all duration-200 hover:border-og/35 hover:bg-og/[0.16]"
        >
          All posts →
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {posts.map((post) => (
          <button
            key={post.id}
            type="button"
            onClick={() => showToast('Opening article…', 'info')}
            className="group cursor-pointer overflow-hidden rounded-[14px] border border-white/[0.07] bg-white/[0.03] text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-og/25"
          >
            <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-[rgba(30,20,10,1)] to-[rgba(50,32,12,1)]">
              <svg className="opacity-15" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect x="5" y="5" width="30" height="30" rx="4" stroke="white" strokeWidth="1.5" />
                <line x1="11" y1="14" x2="29" y2="14" stroke="white" strokeWidth="1.2" />
                <line x1="11" y1="20" x2="29" y2="20" stroke="white" strokeWidth="1.2" />
                <line x1="11" y1="26" x2="22" y2="26" stroke="white" strokeWidth="1.2" />
              </svg>
              <span className="absolute left-2.5 top-2.5 rounded-full border border-og/30 bg-og/[0.18] px-2.5 py-0.5 text-[10px] font-medium text-o2">
                {post.tag}
              </span>
            </div>
            <div className="px-4 py-3.5">
              <p className="mb-2 text-[13.5px] font-medium leading-snug text-[var(--t)]">{post.title}</p>
              <div className="flex items-center gap-2 text-[11px] text-[var(--td)]">
                <span>{post.date}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/20" />
                <span>{post.readTime}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/20" />
                <span>{post.views}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ProfileSectionCard>
  )
}
