// FILE: components/ai/AiInputBar.tsx
// TYPE: Client Component

'use client'

import { useRef, useState, ChangeEvent } from 'react'
import { AI_ACCEPTED_FILE_TYPES, AI_INPUT_QUICK_ACTIONS, AI_QUICK_ACTION_PROMPTS } from '@/lib/data/ai'
import { useAiStore } from '@/stores/aiStore'
import { useUiStore } from '@/stores/uiStore'
import type { AiQuickAction } from '@/types'

export function AiInputBar() {
  const hasDocument = useAiStore((s) => s.hasDocument)
  const isTyping = useAiStore((s) => s.isTyping)
  const sendMessage = useAiStore((s) => s.sendMessage)

  const showToast = useUiStore((s) => s.showToast)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('')
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handles file upload and updates status based on backend response
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    try {
      const resp = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: form,
      });
      if (resp.ok) {
        showToast(`"${file.name}" uploaded & indexed`, 'ok');
        setUploadStatus('success');
      } else {
        showToast(`Upload failed: ${resp.statusText}`, 'error');
        setUploadStatus('error');
      }
    } catch (err) {
      showToast(`Upload error: ${err}`, 'error');
      setUploadStatus('error');
    }
    // Reset input for next upload
    e.target.value = '';
    // Reset status after brief display
    setTimeout(() => setUploadStatus('idle'), 3000);
  };

  const placeholder = hasDocument
    ? 'Ask anything about your document…'
    : 'Ask any legal question…'

  function autoResize() {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`
  }

  async function handleSend() {
    const text = value.trim()
    if (!text || isTyping) return
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    await sendMessage(text)
  }

  function handleQuickAction(action: AiQuickAction) {
    if (action === 'compare') {
      showToast('Attach the second document to compare', 'info')
      fileInputRef.current?.click()
      return
    }
    const prompt = AI_QUICK_ACTION_PROMPTS[action]
    setValue(prompt)
    autoResize()
    textareaRef.current?.focus()
    void sendMessage(prompt)
  }

  return (
    <div className="shrink-0 border-t border-white/[0.07] bg-[rgba(10,10,9,0.9)] px-5 pb-[18px] pt-3.5">
      <div className="mb-2.5 flex flex-wrap gap-[7px]">
        {AI_INPUT_QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => handleQuickAction(action.id)}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-[5px] font-sans text-[11.5px] text-[var(--td)] transition-all duration-200 hover:border-og/22 hover:bg-og/[0.08] hover:text-o2"
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-2.5">
        <div className="flex flex-1 items-end gap-2.5 rounded-[14px] border border-white/10 bg-white/[0.04] px-3.5 py-3 transition-all focus-within:border-og/[0.42] focus-within:shadow-[0_0_0_3px_rgba(212,133,58,0.08)]">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              autoResize()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (value.trim()) void handleSend()
              }
            }}
            placeholder={placeholder}
            rows={1}
            className="max-h-[120px] min-h-[22px] flex-1 resize-none border-none bg-transparent font-sans text-[13.5px] leading-snug text-[var(--t)] outline-none placeholder:text-[rgba(245,240,234,0.2)]"
          />
          <button
            type="button"
            title="Attach document"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-[7px] border border-white/[0.09] bg-transparent text-[var(--td)] transition-all duration-200 hover:bg-white/[0.07] hover:text-[var(--tm)]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M12 7.5L6.5 12A4 4 0 012 7.5L8 1.5A2.5 2.5 0 0112 5l-6 6A1 1 0 014.5 9.5l5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept={AI_ACCEPTED_FILE_TYPES}
            className="hidden"
            onChange={handleFileChange}
          />
          {uploadStatus === 'success' && (
            <span className="ml-2 text-[var(--td)]">✅ Uploaded</span>
          )}
          {uploadStatus === 'error' && (
            <span className="ml-2 text-[var(--td)]">❌ Failed</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => void handleSend()}
          disabled={!value.trim() || isTyping}
          className="btn-gradient-nav flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border-none transition-all duration-200 hover:-translate-y-px hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p className="mt-2 px-0.5 text-[11px] leading-snug text-[rgba(245,240,234,0.22)]">
        AI outputs are for informational purposes only and are not legal advice. Always verify with a
        qualified advocate.
      </p>
    </div>
  )
}
