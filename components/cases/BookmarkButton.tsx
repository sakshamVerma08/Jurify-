// FILE: components/cases/BookmarkButton.tsx
// TYPE: Client Component

'use client'

import { cn } from '@/lib/utils'
import { useCasesStore } from '@/stores/casesStore'

interface BookmarkButtonProps {
  caseId: string
}

export function BookmarkButton({ caseId }: BookmarkButtonProps) {
  const bookmarked = useCasesStore((s) => s.bookmarkedIds.includes(caseId))
  const toggleBookmark = useCasesStore((s) => s.toggleBookmark)

  return (
    <button
      type="button"
      aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark case'}
      className={cn(
        'flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.04] text-[var(--tm)] transition-all duration-200 hover:border-og/30 hover:bg-og/10 hover:text-o2',
        bookmarked && 'border-og/30 bg-og/10 text-o2'
      )}
      onClick={(e) => {
        e.stopPropagation()
        toggleBookmark(caseId)
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M3 2.5h8v9L7 9.5 3 11.5V2.5z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill={bookmarked ? 'currentColor' : 'none'}
        />
      </svg>
    </button>
  )
}
