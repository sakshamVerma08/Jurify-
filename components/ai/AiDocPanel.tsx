// FILE: components/ai/AiDocPanel.tsx
// TYPE: Client Component

'use client'

import { cn } from '@/lib/utils'
import { useAiStore } from '@/stores/aiStore'
import { useUiStore } from '@/stores/uiStore'

interface AiDocPanelProps {
  onQuickAction: (action: string) => void
}

export function AiDocPanel({ onQuickAction }: AiDocPanelProps) {
  const document = useAiStore((s) => s.document)
  const expanded = useAiStore((s) => s.docPanelExpanded)
  const toggleDocPanel = useAiStore((s) => s.toggleDocPanel)
  const removeDocument = useAiStore((s) => s.removeDocument)
  const showToast = useUiStore((s) => s.showToast)

  if (!document) return null

  return (
    <div
      className={cn(
        'shrink-0 overflow-hidden border-b border-white/[0.07] bg-[rgba(12,11,9,0.9)] transition-[max-height] duration-300 ease-in-out',
        expanded ? 'max-h-[180px]' : 'max-h-[52px]'
      )}
    >
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-3 px-5 py-3.5 text-left"
        onClick={toggleDocPanel}
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-og/25 bg-og/[0.12]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="#D4853A" strokeWidth="1.1" />
            <line x1="4.5" y1="5" x2="9.5" y2="5" stroke="#D4853A" strokeWidth="0.9" />
            <line x1="4.5" y1="7" x2="9.5" y2="7" stroke="#D4853A" strokeWidth="0.9" />
          </svg>
        </div>
        <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[var(--t)]">{document.name}</span>
        <span className="shrink-0 text-[11px] text-[var(--td)]">{document.sizeLabel}</span>
        <svg
          className={cn('shrink-0 text-[var(--td)] transition-transform duration-250', expanded && 'rotate-180')}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex items-start gap-3.5 px-5 pb-3.5" onClick={(e) => e.stopPropagation()}>
        <div className="flex h-[88px] w-[70px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04]">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <rect x="3" y="1" width="16" height="20" rx="2" stroke="rgba(212,133,58,0.4)" strokeWidth="1.2" />
            <line x1="6" y1="6" x2="16" y2="6" stroke="rgba(212,133,58,0.3)" strokeWidth="0.9" />
            <line x1="6" y1="9" x2="16" y2="9" stroke="rgba(212,133,58,0.3)" strokeWidth="0.9" />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-og">{document.ext}</span>
        </div>
        <div className="flex-1">
          <p className="mb-1 text-xs text-[var(--td)]">
            <strong className="font-medium text-[var(--tm)]">File:</strong> {document.name}
          </p>
          {document.pages && (
            <p className="mb-1 text-xs text-[var(--td)]">
              <strong className="font-medium text-[var(--tm)]">Pages:</strong> {document.pages} ·{' '}
              <strong className="font-medium text-[var(--tm)]">Size:</strong> {document.sizeLabel.split(' · ')[0]}
            </p>
          )}
          <p className="mb-1 text-xs text-[var(--td)]">
            <strong className="font-medium text-[var(--tm)]">Status:</strong>{' '}
            <span className="text-success">✓ Indexed &amp; ready</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-[7px]">
            <DocActionButton label="Summarize" onClick={() => onQuickAction('summarize')} />
            <DocActionButton label="Compare Doc" onClick={() => onQuickAction('compare')} />
            <DocActionButton label="Key Terms" onClick={() => onQuickAction('keyterms')} />
            <button
              type="button"
              onClick={() => {
                removeDocument()
                showToast('Document removed', 'info')
              }}
              className="cursor-pointer rounded-lg border border-danger/15 bg-danger/[0.06] px-3 py-1.5 font-sans text-[11.5px] text-[rgba(240,100,100,0.6)] transition-all duration-200 hover:bg-danger/10 hover:text-danger"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DocActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-og/20 bg-og/[0.08] px-3 py-1.5 font-sans text-[11.5px] text-o2 transition-all duration-200 hover:border-og/35 hover:bg-og/[0.16]"
    >
      {label}
    </button>
  )
}
