import { CasesPageContent } from '@/components/cases/CasesPageContent'
import { Navbar } from '@/components/layout/Navbar'
import { Toast } from '@/components/ui/Toast'

export default function CasesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-[68px]">
        <CasesPageContent />
      </div>
      <Toast />
    </>
  )
}
