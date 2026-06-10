// FILE: components/ai/AiMessageList.tsx
// TYPE: Client Component

'use client'

import { useEffect, useRef } from 'react'
import { AiMessageRow } from '@/components/ai/AiMessageRow'
import { AiTypingIndicator } from '@/components/ai/AiTypingIndicator'
import { useAiStore } from '@/stores/aiStore'

export function AiMessageList() {
  const messages = useAiStore((s) => s.messages)
  const isTyping = useAiStore((s) => s.isTyping)
  const sendMessage = useAiStore((s) => s.sendMessage)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
      {messages.map((message) => (
        <AiMessageRow
          key={message.id}
          message={message}
          onFollowup={(text) => sendMessage(text)}
        />
      ))}
      {isTyping && <AiTypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
