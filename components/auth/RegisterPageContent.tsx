// FILE: components/auth/RegisterPageContent.tsx
// TYPE: Client Component

'use client'

import { RegisterBackground } from '@/components/auth/RegisterBackground'
import { RegisterCard } from '@/components/auth/RegisterCard'
import { Toast } from '@/components/ui/Toast'

export function RegisterPageContent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-bg px-5 py-6">
      <RegisterBackground />
      <RegisterCard />
      <Toast />
    </div>
  )
}
