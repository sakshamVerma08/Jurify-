// FILE: app/(app)/messages/page.tsx
// TYPE: Server Page Component

import { Suspense } from 'react'
import { MessagesPageContent } from '@/components/messages/MessagesPageContent'

export const metadata = {
  title: 'Messages — Jurify',
  description: 'Secure, end-to-end encrypted attorney-client messaging room for Indian legal consultations on Jurify.',
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-[#080808] text-white/50">Loading conversations...</div>}>
      <MessagesPageContent />
    </Suspense>
  )
}
