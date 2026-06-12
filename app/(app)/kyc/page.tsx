// FILE: app/(auth)/kyc/page.tsx
// TYPE: Client Component shell
// RENDERING: CSR — multi-step KYC wizard, file uploads, validation

import { KycPageContent } from '@/components/kyc/KycPageContent'
import { KycNavbar } from '@/components/kyc/KycNavbar'
import { Toast } from '@/components/ui/Toast'

export default function KycPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Toast />
      <KycNavbar />
      <KycPageContent />
    </div>
  )
}
