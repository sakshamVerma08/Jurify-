// FILE: components/auth/LoginPageContent.tsx
// TYPE: Client Component

'use client'

import { LoginBackground } from '@/components/auth/LoginBackground'
import { LoginCard } from '@/components/auth/LoginCard'
import { Toast } from '@/components/ui/Toast'

export function LoginPageContent() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-bg">
      <LoginBackground />
      <LoginCard />
      <Toast />
    </div>
  )
}
