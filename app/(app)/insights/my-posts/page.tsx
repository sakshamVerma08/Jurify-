import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/auth-helper'
import { InsightsMyPostsView } from '@/components/insights/InsightsMyPostsView'

export default async function InsightsMyPostsPage() {
  const session = await requireAuth()
  if (!session || session.user.role !== 'LAWYER') {
    redirect('/insights')
  }

  return <InsightsMyPostsView />
}
