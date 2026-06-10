// FILE: components/ai/AiTypingIndicator.tsx
// TYPE: Server Component

export function AiTypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-og/30 bg-og/15 text-xs">
        ✦
      </div>
      <div className="flex items-center gap-[5px] rounded-[4px_16px_16px_16px] border border-white/[0.08] bg-[rgba(20,19,17,0.9)] px-[18px] py-3.5">
        <span className="ai-typing-dot h-[7px] w-[7px] rounded-full bg-og/60" />
        <span className="ai-typing-dot ai-typing-dot-2 h-[7px] w-[7px] rounded-full bg-og/60" />
        <span className="ai-typing-dot ai-typing-dot-3 h-[7px] w-[7px] rounded-full bg-og/60" />
      </div>
    </div>
  )
}
