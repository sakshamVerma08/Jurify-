import { DashboardCaseList } from '@/components/dashboard/DashboardCaseList'
import { LAWYER_ACTIVE_CASES } from '@/lib/data/dashboard'

export function LawyerActiveCasesView() {
  // Filter only active cases (for now, we'll just show the same active ones from data)
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[var(--t)]">Active Cases</h2>
        <p className="mt-1 text-sm text-[var(--td)]">
          Cases that are currently active and require your attention.
        </p>
      </div>
      <div className="rounded-2xl border border-white/[0.07] bg-card p-[22px]">
        <DashboardCaseList cases={LAWYER_ACTIVE_CASES} />
      </div>
    </div>
  )
}
