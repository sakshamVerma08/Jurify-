import { DashboardCaseList } from '@/components/dashboard/DashboardCaseList'
import { LAWYER_ACTIVE_CASES } from '@/lib/data/dashboard'

export function LawyerMyCasesView() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[var(--t)]">My Cases</h2>
        <p className="mt-1 text-sm text-[var(--td)]">
          All cases you are handling or have applied to.
        </p>
      </div>
      <div className="rounded-2xl border border-white/[0.07] bg-card p-[22px]">
        <DashboardCaseList cases={LAWYER_ACTIVE_CASES} />
      </div>
    </div>
  )
}
