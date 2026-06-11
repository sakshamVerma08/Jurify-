import { create } from 'zustand'
import type { KycDocumentId, KycStep, KycUploadedFile } from '@/types'
import type { KycStep1FormData, KycStep3FormData } from '@/lib/validations/kyc'

interface KycState {
  currentStep: KycStep
  step1: Partial<KycStep1FormData>
  step3: Partial<Omit<KycStep3FormData, 'photo'>>
  documents: Partial<Record<KycDocumentId, KycUploadedFile>>
  photo: KycUploadedFile | null
  photoPreviewUrl: string | null
  showSuccess: boolean
  isSubmitting: boolean
  setStep: (step: KycStep) => void
  nextStep: () => void
  prevStep: () => void
  setStep1: (data: Partial<KycStep1FormData>) => void
  setStep3: (data: Partial<Omit<KycStep3FormData, 'photo'>>) => void
  setDocument: (id: KycDocumentId, file: File) => void
  removeDocument: (id: KycDocumentId) => void
  setPhoto: (file: File, previewUrl: string) => void
  removePhoto: () => void
  setShowSuccess: (show: boolean) => void
  setIsSubmitting: (v: boolean) => void
  getProgressPct: () => number
}

function formatSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export const useKycStore = create<KycState>((set, get) => ({
  currentStep: 1,
  step1: { practiceAreas: [] },
  step3: { languages: ['English', 'Hindi'], country: 'India' },
  documents: {},
  photo: null,
  photoPreviewUrl: null,
  showSuccess: false,
  isSubmitting: false,

  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get()
    if (currentStep < 4) set({ currentStep: (currentStep + 1) as KycStep })
  },

  prevStep: () => {
    const { currentStep } = get()
    if (currentStep > 1) set({ currentStep: (currentStep - 1) as KycStep })
  },

  setStep1: (data) => set((s) => ({ step1: { ...s.step1, ...data } })),

  setStep3: (data) => set((s) => ({ step3: { ...s.step3, ...data } })),

  setDocument: (id, file) =>
    set((s) => ({
      documents: {
        ...s.documents,
        [id]: { file, name: file.name, sizeLabel: formatSize(file.size) },
      },
    })),

  removeDocument: (id) =>
    set((s) => {
      const next = { ...s.documents }
      delete next[id]
      return { documents: next }
    }),

  setPhoto: (file, previewUrl) =>
    set({
      photo: { file, name: file.name, sizeLabel: formatSize(file.size) },
      photoPreviewUrl: previewUrl,
    }),

  removePhoto: () => {
    const { photoPreviewUrl } = get()
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl)
    set({ photo: null, photoPreviewUrl: null })
  },

  setShowSuccess: (show) => set({ showSuccess: show }),

  setIsSubmitting: (v) => set({ isSubmitting: v }),

  getProgressPct: () => {
    const { currentStep } = get()
    return Math.round(((currentStep - 1) / 4) * 100)
  },
}))
