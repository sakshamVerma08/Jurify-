// FILE: components/ai/AiPageContent.tsx
// TYPE: Client Component

'use client'

import { useEffect } from 'react'
import { AiChatScreen } from '@/components/ai/AiChatScreen'
import { AiNavbar } from '@/components/ai/AiNavbar'
import { AiSidebar } from '@/components/ai/AiSidebar'
import { AiWelcomeScreen } from '@/components/ai/AiWelcomeScreen'
import { Toast } from '@/components/ui/Toast'
import { useAiStore } from '@/stores/aiStore'

export function AiPageContent() {
  const screen = useAiStore((s) => s.screen)
  const initDemo = useAiStore((s) => s.initDemo)

  useEffect(() => {
    initDemo()
  }, [initDemo])

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg">
      <AiNavbar />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AiSidebar />
        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          {screen === 'welcome' ? <AiWelcomeScreen /> : <AiChatScreen />}
        </main>
      </div>
      <Toast />
    </div>
  )
}
