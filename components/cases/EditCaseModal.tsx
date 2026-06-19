// FILE: components/cases/EditCaseModal.tsx
// TYPE: Client Component

'use client'

import { useEffect, useState } from 'react'
import { useForm, type UseFormRegisterReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError } from '@/components/auth/FieldError'
import { Modal } from '@/components/ui/Modal'
import {
  CASE_RELATIONSHIPS,
  POST_CASE_CATEGORIES,
  POST_CASE_STAGES,
} from '@/lib/data/cases'
import { z } from 'zod'
import { postCaseSchema, type PostCaseFormData } from '@/lib/validations/case'
import { editCaseAction, getMyCasesAction } from '@/actions/cases/client'
import { cn } from '@/lib/utils'
import { useCasesStore } from '@/stores/casesStore'
import { useUiStore } from '@/stores/uiStore'

const INPUT =
  'login-input w-full rounded-[10px] border border-white/[0.09] px-3.5 py-[11px] font-sans text-[13.5px] text-[var(--t)] outline-none transition-all placeholder:text-[rgba(245,240,234,0.22)]'

function enableField(event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  event.currentTarget.removeAttribute('readonly')
}

export function EditCaseModal() {
  const open = useCasesStore((s) => s.editModalOpen)
  const editingCaseId = useCasesStore((s) => s.editingCaseId)
  const closeEditModal = useCasesStore((s) => s.closeEditModal)
  const updatePostedCase = useCasesStore((s) => s.updatePostedCase)
  const setMyPostedCases = useCasesStore((s) => s.setMyPostedCases)
  const showToast = useUiStore((s) => s.showToast)
  const activeCase = useCasesStore((s) =>
    s.myPostedCases.find((c) => c.id === editingCaseId)
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostCaseFormData>({
    resolver: zodResolver(postCaseSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      stage: '',
      incidentDate: '',
      deadline: '',
      opposingName: '',
      opposingRelationship: '',
      location: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      contactAddress: '',
      isProBono: true,
      acceptTerms: true,
    },
  })

  // Prepopulate form when activeCase changes
  useEffect(() => {
    if (activeCase && open) {
      reset({
        title: activeCase.title || '',
        description: activeCase.description || '',
        category: activeCase.category || '',
        stage: activeCase.stageLabel || activeCase.stage || '',
        incidentDate: activeCase.incidentDate || '',
        deadline: activeCase.deadline || '',
        opposingName: activeCase.opposingName || '',
        opposingRelationship: activeCase.opposingRelationship || '',
        location: activeCase.location || '',
        contactName: activeCase.contactName || '',
        contactEmail: activeCase.contactEmail || '',
        contactPhone: activeCase.contactPhone || '',
        contactAddress: activeCase.contactAddress || '',
        isProBono: activeCase.isProBono ?? true,
        acceptTerms: true,
      })
    }
  }, [activeCase, open, reset])

  const description = watch('description') ?? ''
  const isProBono = watch('isProBono')
  const acceptTerms = watch('acceptTerms')

  function handleClose() {
    closeEditModal()
    reset()
  }

  async function onSubmit(data: PostCaseFormData) {
    if (!editingCaseId) return
    setIsSubmitting(true)
    
    const res = await editCaseAction(editingCaseId, data)
    
    setIsSubmitting(false)

    if (res.success) {
      showToast('Case details updated successfully!', 'ok')
      handleClose()
      // Refresh the store exactly like MyCasesTab does for a seamless background update
      const freshData = await getMyCasesAction()
      if (freshData.success && freshData.cases) {
        setMyPostedCases(freshData.cases)
      }
    } else {
      showToast(res.error || 'Failed to update case', 'err')
    }
  }

  function onInvalid() {
    showToast('Please fix the errors in the form', 'err')
  }

  return (
    <Modal open={open} onClose={handleClose} ariaLabel="Edit case">
      <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-white/[0.07] bg-bg2 px-7 py-6">
        <h2 className="font-serif text-[26px] font-light tracking-[-0.5px] text-[var(--t)]">
          Edit <em className="italic text-o2">Case Details</em>
        </h2>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border border-white/10 bg-white/[0.05] text-lg leading-none text-[var(--tm)] transition-all duration-200 hover:bg-white/10 hover:text-[var(--t)]"
        >
          ×
        </button>
      </div>

      <form
        className="p-7"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        autoComplete="off"
        noValidate
      >
        <input type="text" name="prevent_autofill" tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute h-0 w-0 opacity-0" />

        <FormSection title="Case Details">
          <div className="mb-3.5 flex flex-col gap-1.5">
            <label htmlFor="edit-case-title" className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
              Case Title <span className="text-danger">*</span>
            </label>
            <input
              id="edit-case-title"
              type="text"
              placeholder="Brief title describing your legal need"
              className={cn(INPUT, errors.title && 'border-danger/45')}
              {...register('title')}
              readOnly
              onFocus={enableField}
            />
            <FieldError message={errors.title?.message} show={!!errors.title} />
          </div>

          <div className="mb-3.5 flex flex-col gap-1.5">
            <label htmlFor="edit-case-desc" className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              id="edit-case-desc"
              placeholder="Describe your situation in detail..."
              className={cn(INPUT, 'min-h-[140px] resize-y leading-relaxed', errors.description && 'border-danger/45')}
              {...register('description')}
              readOnly
              onFocus={enableField}
            />
            <p className="-mt-2 text-right text-[11px] text-[rgba(245,240,234,0.25)]">
              {description.length}/800
            </p>
            <FieldError message={errors.description?.message} show={!!errors.description} />
          </div>

          <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <SelectField
              id="edit-case-category"
              label="Category"
              required
              error={errors.category?.message}
              options={POST_CASE_CATEGORIES.map((c) => ({ value: c, label: c }))}
              register={register('category')}
            />
            <SelectField
              id="edit-case-stage"
              label="Current Stage"
              required
              error={errors.stage?.message}
              options={POST_CASE_STAGES.map((s) => ({ value: s, label: s }))}
              register={register('stage')}
            />
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <InputField id="edit-incident-date" label="Date of Incident" required error={errors.incidentDate?.message} type="date" register={register('incidentDate')} />
            <InputField id="edit-deadline" label="Application Deadline" required error={errors.deadline?.message} type="date" register={register('deadline')} />
          </div>
        </FormSection>

        <FormSection title="Opposing Party">
          <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <InputField id="edit-opposing-name" label="Opposing Party Name" required error={errors.opposingName?.message} register={register('opposingName')} />
            <SelectField
              id="edit-opposing-rel"
              label="Relationship"
              error={errors.opposingRelationship?.message}
              options={CASE_RELATIONSHIPS.map((r) => ({ value: r, label: r }))}
              register={register('opposingRelationship')}
              placeholder="Select relationship"
            />
          </div>
          <InputField id="edit-location" label="Location (City, State)" required error={errors.location?.message} register={register('location')} />
        </FormSection>

        <FormSection title="Your Contact Information">
          <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <InputField id="edit-contact-name" label="Full Name" required error={errors.contactName?.message} register={register('contactName')} />
            <InputField id="edit-contact-email" label="Email" required error={errors.contactEmail?.message} type="email" register={register('contactEmail')} />
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <InputField id="edit-contact-phone" label="Phone (optional)" error={errors.contactPhone?.message} register={register('contactPhone')} />
            <InputField id="edit-contact-address" label="Address (optional)" error={errors.contactAddress?.message} register={register('contactAddress')} />
          </div>
        </FormSection>

        <label
          className={cn(
            'mb-5 flex cursor-pointer items-start gap-3 rounded-[10px] border border-white/[0.07] bg-white/[0.03] p-4 transition-colors',
            isProBono && 'border-og/30'
          )}
          onClick={() => setValue('isProBono', !isProBono, { shouldValidate: true })}
        >
          <div
            className={cn(
              'flex h-5 w-[34px] shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out',
              isProBono ? 'bg-og' : 'bg-white/10'
            )}
          >
            <div
              className={cn(
                'h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out',
                isProBono ? 'translate-x-[14px]' : 'translate-x-0'
              )}
            />
          </div>
          <span className="text-[12.5px] leading-relaxed text-[var(--tm)]">
            <strong className="block text-white mb-0.5 font-medium">This is a Pro Bono case</strong>
            I am seeking free legal representation. Pro Bono cases are highlighted to attract lawyers willing to work without a fee.
          </span>
        </label>

        <label
          className={cn(
            'mb-5 flex cursor-pointer items-start gap-3 rounded-[10px] border border-white/[0.07] bg-white/[0.03] p-4 transition-colors',
            acceptTerms && 'border-og/30'
          )}
          onClick={() => setValue('acceptTerms', !acceptTerms, { shouldValidate: true })}
        >
          <span
            className={cn(
              'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] border-white/20 transition-all',
              acceptTerms && 'border-og bg-og'
            )}
          >
            {acceptTerms && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            )}
          </span>
          <span className="text-[12.5px] leading-relaxed text-[var(--tm)]">
            I confirm that the updated information is accurate.
          </span>
        </label>
        <FieldError message={errors.acceptTerms?.message} show={!!errors.acceptTerms} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gradient-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none py-4 font-sans text-sm font-medium text-white transition-all duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {isSubmitting ? <span className="btn-spinner" /> : null}
          {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </form>
    </Modal>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h3 className="mb-4 border-b border-white/[0.05] pb-2.5 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.35)]">
        {title}
      </h3>
      {children}
    </div>
  )
}

function InputField({
  id,
  label,
  required,
  error,
  type = 'text',
  register,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  type?: string
  register: UseFormRegisterReturn
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        id={id}
        type={type}
        autoComplete="off"
        className={cn(INPUT, error && 'border-danger/45')}
        {...register}
        readOnly
        onFocus={enableField}
      />
      <FieldError message={error} show={!!error} />
    </div>
  )
}

function SelectField({
  id,
  label,
  required,
  error,
  options,
  register,
  placeholder = 'Select...',
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  options: { value: string; label: string }[]
  register: UseFormRegisterReturn
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <select
        id={id}
        className={cn(INPUT, 'cursor-pointer', error && 'border-danger/45')}
        {...register}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-bg3 text-[var(--t)]">
            {opt.label}
          </option>
        ))}
      </select>
      <FieldError message={error} show={!!error} />
    </div>
  )
}
