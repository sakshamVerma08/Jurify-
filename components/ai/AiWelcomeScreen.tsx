// FILE: components/ai/AiWelcomeScreen.tsx
// TYPE: Client Component

'use client'

import { useRef, useState } from 'react'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'
import { AI_ACCEPTED_FILE_TYPES, AI_SUGGESTIONS } from '@/lib/data/ai'
import { cn } from '@/lib/utils'
import { useAiStore } from '@/stores/aiStore'
import { useUiStore } from '@/stores/uiStore'

export function AiWelcomeScreen() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const processFile = useAiStore((s) => s.processFile)
  const startNoDoc = useAiStore((s) => s.startNoDoc)
  const sendMessage = useAiStore((s) => s.sendMessage)
  const showToast = useUiStore((s) => s.showToast)

  function handleFile(file: File) {
    processFile(file)
    showToast(`"${file.name}" loaded & indexed`, 'ok')
  }

  function onSuggestion(text: string) {
    startNoDoc()
    setTimeout(() => sendMessage(text), 100)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-8">
      <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border-[1.5px] border-og/30 bg-og/10 shadow-[0_0_28px_rgba(212,133,58,0.14)]">
        <JurifyLogoIcon size={26} />
      </div>
      <h1 className="mb-2 text-center font-serif text-[32px] font-light tracking-[-0.5px] text-[var(--t)]">
        Jurify <em className="italic text-o2">AI</em>
      </h1>
      <p className="mb-8 max-w-[440px] text-center text-sm font-light leading-relaxed text-[var(--tm)]">
        Upload your legal document and ask anything about it — or start a general legal conversation.
        Powered by RAG for grounded, accurate answers.
      </p>

      <div
        className={cn(
          'ai-upload-zone relative mb-4 w-full max-w-[500px] cursor-pointer overflow-hidden rounded-2xl border-[1.5px] border-dashed border-og/[0.38] bg-og/[0.03] px-6 py-10 text-center transition-all duration-200 hover:border-og/[0.65] hover:bg-og/[0.07]',
          dragOver && 'drag-over'
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          const file = e.dataTransfer.files[0]
          if (file) handleFile(file)
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click()
        }}
      >
        <div className="mx-auto mb-3.5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-og/20 bg-og/10 transition-all duration-200 group-hover:shadow-[0_0_16px_rgba(212,133,58,0.2)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 16V8M8 12l4-4 4 4" stroke="#D4853A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 16.5A3.5 3.5 0 0016.5 20h-9A3.5 3.5 0 004 16.5V7.5A3.5 3.5 0 007.5 4h5" stroke="#D4853A" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        <p className="mb-1 text-[15px] font-medium text-[var(--t)]">Upload your legal document</p>
        <p className="text-[13px] font-light leading-snug text-[var(--tm)]">
          Drop your file here or <span className="font-medium text-og">browse to upload</span>
        </p>
        <p className="mt-2 text-[11px] text-[rgba(245,240,234,0.28)]">PDF · DOC · DOCX · TXT · Max 20MB</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={AI_ACCEPTED_FILE_TYPES}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />

      <button
        type="button"
        onClick={startNoDoc}
        className="mb-7 flex cursor-pointer items-center gap-[7px] rounded-[10px] border border-white/[0.09] bg-white/[0.04] px-5 py-2.5 font-sans text-[13px] text-[var(--tm)] transition-all duration-200 hover:bg-white/[0.08] hover:text-[var(--t)]"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M6.5 1.5l1.3 3.5H11L8.4 7l1 3-2.9-2.1L3.6 10l1-3L2 5h3.2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
        Start without a document
      </button>

      <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-[1px] text-[rgba(245,240,234,0.28)]">
        Or try a question
      </p>
      <div className="flex max-w-[560px] flex-wrap justify-center gap-2">
        {AI_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSuggestion(suggestion)}
            className="flex cursor-pointer items-center gap-[7px] rounded-full border border-white/[0.09] bg-white/[0.04] px-3.5 py-2 font-sans text-[12.5px] text-[var(--tm)] transition-all duration-200 hover:border-og/25 hover:bg-og/[0.08] hover:text-[var(--t)] [&_svg]:opacity-50"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1" />
              <line x1="3.5" y1="5" x2="9.5" y2="5" stroke="currentColor" strokeWidth="0.9" />
            </svg>
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
