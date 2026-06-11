import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AdminPageContent } from '@/components/admin/AdminPageContent'

export const metadata: Metadata = {
  title: 'Admin Panel — Jurify',
  description: 'Jurify administrative dashboard and platform moderation system.',
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-bg text-[var(--tm)]">
        Loading administrative dashboard...
      </div>
    }>
      <AdminPageContent />
    </Suspense>
  )
}
