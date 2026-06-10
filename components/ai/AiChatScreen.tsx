// FILE: components/ai/AiChatScreen.tsx
// TYPE: Client Component

'use client'

import { AiDocPanel } from '@/components/ai/AiDocPanel'
import { AiInputBar } from '@/components/ai/AiInputBar'
import { AiMessageList } from '@/components/ai/AiMessageList'
import { AI_QUICK_ACTION_PROMPTS } from '@/lib/data/ai'
import { useAiStore } from '@/stores/aiStore'
import { useUiStore } from '@/stores/uiStore'
import type { AiQuickAction } from '@/types'

export function AiChatScreen() {
  const hasDocument = useAiStore((s) => s.hasDocument)
  const sendMessage = useAiStore((s) => s.sendMessage)
  const showToast = useUiStore((s) => s.showToast)

  function handleQuickAction(action: string) {
    const typed = action as AiQuickAction
    if (typed === 'compare') {
      showToast('Attach the second document to compare', 'info')
      return
    }
    const prompt = AI_QUICK_ACTION_PROMPTS[typed as Exclude<AiQuickAction, 'compare'>]
    if (prompt) void sendMessage(prompt)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {hasDocument && <AiDocPanel onQuickAction={handleQuickAction} />}
      <AiMessageList />
      <AiInputBar />
    </div>
  )
}
