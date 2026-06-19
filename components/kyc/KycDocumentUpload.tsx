// FILE: components/kyc/KycDocumentUpload.tsx
// TYPE: Client Component

'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { KycDocumentId, KycUploadedFile } from '@/types'
import { uploadToCloudinary } from '@/lib/cloudinary-upload'
import { useUiStore } from '@/stores/uiStore'

interface KycDocumentUploadProps {
  id: KycDocumentId
  label: string
  sub: string
  types: string
  maxMb: number
  file?: { name: string; sizeLabel: string } | null
  required?: boolean
  error?: string
  onUpload: (fileInfo: KycUploadedFile) => void
  onRemove: () => void
}

export function KycDocumentUpload({
  id,
  label,
  sub,
  types,
  maxMb,
  file,
  required,
  error,
  onUpload,
  onRemove,
}: KycDocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const showToast = useUiStore((s) => s.showToast)
  const hasFile = !!file

  async function handleFile(f: File) {
    if (f.size > maxMb * 1024 * 1024) {
      showToast(`File size must be under ${maxMb}MB`, 'err')
      return
    }

    try {
      setIsUploading(true)
      const fileInfo = await uploadToCloudinary(f)
      onUpload(fileInfo)
      showToast(`${label} uploaded successfully`, 'ok')
    } catch (err) {
      console.error(err)
      showToast(`Failed to upload ${label}`, 'err')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => !isUploading && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!isUploading && (e.key === 'Enter' || e.key === ' ')) inputRef.current?.click()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!isUploading) setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          if (!isUploading) {
            const f = e.dataTransfer.files[0]
            if (f) handleFile(f)
          }
        }}
        className={cn(
          'kyc-upload-zone cursor-pointer overflow-hidden rounded-[14px] border-[1.5px] border-dashed border-og/30 bg-og/[0.03] px-4 py-7 text-center transition-all duration-200 hover:border-og/60 hover:bg-og/[0.07]',
          dragOver && 'kyc-upload-drag',
          hasFile && 'border-success/40 bg-success/[0.04]',
          error && !hasFile && 'border-danger/40',
          isUploading && 'opacity-60 cursor-not-allowed border-og/40 bg-og/5'
        )}
      >
        <div
          className={cn(
            'mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-og/20 bg-og/10 transition-all duration-200',
            hasFile && 'border-success/30 bg-success/10'
          )}
        >
          {isUploading ? (
            <div className="w-5 h-5 rounded-full border-2 border-og/30 border-t-og animate-spin" />
          ) : hasFile ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 9l4 4 6-6" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <DocIcon type={id} />
          )}
        </div>
        <p className="mb-1 text-[13px] font-medium text-[var(--t)]">
          {isUploading ? 'Uploading...' : label}
          {required && !isUploading && <span className="text-danger"> *</span>}
        </p>
        {!isUploading && (
          <>
            <p className="whitespace-pre-line text-[11px] leading-snug text-[var(--td)]">{sub}</p>
            <p className="mt-1.5 text-[10px] text-[rgba(245,240,234,0.25)]">{types}</p>
          </>
        )}
      </div>

      {hasFile && !isUploading && (
        <div className="mt-2.5 flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-left">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border border-success/25 bg-success/10">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 5l2.5 2.5L10 3" stroke="#4ade80" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11.5px] font-medium text-[var(--t)]">{file.name}</p>
            <p className="text-[10px] text-[var(--td)]">{file.sizeLabel}</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
              if (inputRef.current) inputRef.current.value = ''
            }}
            className="shrink-0 cursor-pointer border-none bg-transparent font-sans text-sm leading-none text-[rgba(240,100,100,0.6)] hover:text-danger"
            aria-label={`Remove ${label}`}
          >
            ×
          </button>
        </div>
      )}

      {error && !hasFile && !isUploading && (
        <p className="mt-1.5 text-[11px] text-danger">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
        }}
      />
    </div>
  )
}

function DocIcon({ type }: { type: KycDocumentId }) {
  if (type === 'bar') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="14" height="16" rx="2" stroke="#D4853A" strokeWidth="1.3" />
        <path d="M7 7h6M7 10h6M7 13h4" stroke="#D4853A" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'pan') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="#D4853A" strokeWidth="1.3" />
        <line x1="5" y1="8" x2="15" y2="8" stroke="#D4853A" strokeWidth="1" />
        <line x1="5" y1="11" x2="11" y2="11" stroke="#D4853A" strokeWidth="1" />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="#D4853A" strokeWidth="1.3" />
      <line x1="5" y1="8" x2="9" y2="8" stroke="#D4853A" strokeWidth="1" />
      <line x1="5" y1="11" x2="8" y2="11" stroke="#D4853A" strokeWidth="1" />
      <rect x="12" y="7" width="4" height="5" rx="1" stroke="#D4853A" strokeWidth="1" />
    </svg>
  )
}
