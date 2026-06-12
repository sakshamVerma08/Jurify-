import { DashboardPageContent } from '@/components/dashboard/DashboardPageContent'
import { requireAuth } from '@/lib/auth/auth-helper'

export default async function DashboardPage() {
  const session = await requireAuth()
  const role = session?.user?.role === 'LAWYER' ? 'lawyer' : 'client'

  return <DashboardPageContent initialRole={role} />
}
