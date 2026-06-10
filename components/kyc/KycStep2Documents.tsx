// FILE: components/kyc/KycStep2Documents.tsx
// TYPE: Client Component

'use client'

import { useState } from 'react'
import { KycDocumentUpload } from '@/components/kyc/KycDocumentUpload'
import { KycStepHeader } from '@/components/kyc/KycStepHeader'
import { KycStepNav } from '@/components/kyc/KycStepNav'
import { KYC_REQUIRED_DOCUMENTS } from '@/lib/data/kyc'
import { validateKycDocuments } from '@/lib/validations/kyc'
import type { KycDocumentId } from '@/types'
import { useKycStore } from '@/stores/kycStore'
import { useUiStore } from '@/stores/uiStore'

const DOC_LABELS: Record<KycDocumentId, string> = {
  aadhaar: 'Aadhaar Card',
  pan: 'PAN Card',
  bar: 'Bar Council Certificate',
}

export function KycStep2Documents() {
  const documents = useKycStore((s) => s.documents)
  const setDocument = useKycStore((s) => s.setDocument)
  const removeDocument = useKycStore((s) => s.removeDocument)
  const nextStep = useKycStore((s) => s.nextStep)
  const prevStep = useKycStore((s) => s.prevStep)
  const showToast = useUiStore((s) => s.showToast)
  const [showErrors, setShowErrors] = useState(false)

  const { missing } = validateKycDocuments(documents)

  function handleContinue() {
    const result = validateKycDocuments(documents)
    if (!result.valid) {
      setShowErrors(true)
      showToast('Please upload all three required documents', 'err')
      return
    }
    setShowErrors(false)
    nextStep()
  }

  return (
    <div className="kyc-step-panel-in">
      <KycStepHeader
        step={2}
        title={
          <>
            Identity <em className="italic text-o2">Verification</em>
          </>
        }
        subtitle="Upload your official documents for verification. All documents are encrypted and processed securely. Your data will never be shared with third parties."
      />

      <section className="mb-8">
        <h3 className="mb-[18px] border-b border-white/[0.05] pb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
          Required Documents <span className="normal-case tracking-normal text-danger">(all 3 mandatory)</span>
        </h3>

        <div className="mb-4 grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {KYC_REQUIRED_DOCUMENTS.map((doc) => (
            <KycDocumentUpload
              key={doc.id}
              id={doc.id}
              label={doc.label}
              sub={doc.sub}
              types={doc.types}
              maxMb={doc.maxMb}
              required
              file={documents[doc.id] ?? null}
              error={showErrors && missing.includes(doc.id) ? `${DOC_LABELS[doc.id]} is required` : undefined}
              onUpload={(file) => {
                setDocument(doc.id, file)
                if (showErrors) setShowErrors(false)
              }}
              onRemove={() => removeDocument(doc.id)}
            />
          ))}
        </div>

        {showErrors && missing.length > 0 && (
          <p className="mb-4 text-[12px] text-danger">
            Missing: {missing.map((id) => DOC_LABELS[id]).join(', ')}
          </p>
        )}

        <div className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.07] bg-white/[0.03] px-[18px] py-3.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="rgba(212,133,58,0.7)" strokeWidth="1.2" />
            <path d="M5 7V5a3 3 0 016 0v2" stroke="rgba(212,133,58,0.7)" strokeWidth="1.2" />
          </svg>
          <span className="text-xs text-[rgba(245,240,234,0.4)]">
            All documents are encrypted with AES-256 and stored on Indian servers. Access is restricted to verified Jurify admins only.
          </span>
        </div>
      </section>

      <KycStepNav step={2} onBack={prevStep} onNext={handleContinue} />
    </div>
  )
}
