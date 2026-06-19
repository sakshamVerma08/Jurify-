import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/auth-helper'
import { InsightsWriteView } from '@/components/insights/InsightsWriteView'

export default async function InsightsWritePage() {
  const session = await requireAuth()
  if (!session || session.user.role !== 'LAWYER') {
    redirect('/insights')
  }

  return <InsightsWriteView />
}
