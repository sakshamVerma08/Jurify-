// FILE: app/(app)/profile/page.tsx
// TYPE: Server Page Component

import { Suspense } from 'react'
import { ProfilePageContent } from '@/components/profile/ProfilePageContent'

export const metadata = {
  title: 'My Profile — Jurify',
  description: 'Manage your profile details, professional details, notifications, appearance settings, and account security.',
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-[#080808] text-white/50">Loading profile settings...</div>}>
      <ProfilePageContent />
    </Suspense>
  )
}
