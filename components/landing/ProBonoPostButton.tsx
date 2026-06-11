// FILE: components/landing/ProBonoPostButton.tsx
// TYPE: Client Component

'use client'

import { useRouter } from 'next/navigation'

export function ProBonoPostButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.push('/cases')}
      aria-label="Post a pro bono case"
      className="mt-1 w-full cursor-pointer rounded-lg border-none bg-o px-5 py-2.5 font-sans text-[13px] font-medium text-white transition-opacity hover:opacity-90"
    >
      + Post a Case
    </button>
  )
}
