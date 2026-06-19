'use client'

import { useRouter } from 'next/navigation'
import { useUiStore } from '@/stores/uiStore'
import { useSession } from '@/lib/auth/auth-client'

export function InsightsNavActions() {
  const router = useRouter()
  const showToast = useUiStore((s) => s.showToast)
  const { data: session } = useSession()

  // Only render these actions if the user is a lawyer
  if (!session || (session.user as any).role !== 'LAWYER') {
    return null
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          router.push('/insights/my-posts')
          showToast('My articles', 'info')
        }}
        className="rounded-lg px-[18px] py-2 text-[13.5px] text-[var(--tm)] transition-all hover:bg-white/5 hover:text-[var(--t)]"
      >
        My Posts
      </button>
      <button
        type="button"
        onClick={() => router.push('/insights/write')}
        className="flex items-center gap-2 rounded-[10px] bg-gradient-to-br from-[var(--og)] to-[#b8521e] px-[22px] py-2.5 text-[13.5px] font-medium text-white shadow-[0_4px_20px_rgba(200,98,42,0.3)] transition-all hover:-translate-y-px hover:opacity-90"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
          <path
            d="M2 9.5l1-3L9.5 1l2 2-6.5 6.5-3 1zM7.5 3l2 2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Write Post
      </button>
    </>
  )
}

