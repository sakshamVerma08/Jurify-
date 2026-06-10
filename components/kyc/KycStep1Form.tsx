// FILE: components/kyc/KycStep1Form.tsx
// TYPE: Client Component

'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError } from '@/components/auth/FieldError'
import { KycStepHeader } from '@/components/kyc/KycStepHeader'
import { KycStepNav } from '@/components/kyc/KycStepNav'
import { KycTagSelect } from '@/components/kyc/KycTagSelect'
import {
  KYC_BAR_COUNCIL_STATES,
  KYC_DEGREES,
  KYC_ENROLLMENT_YEARS,
  KYC_EXPERIENCE_RANGES,
  KYC_PRACTICE_AREAS,
} from '@/lib/data/kyc'
import { kycStep1Schema, type KycStep1FormData } from '@/lib/validations/kyc'
import { cn } from '@/lib/utils'
import { useKycStore } from '@/stores/kycStore'
import { useUiStore } from '@/stores/uiStore'

const INPUT =
  'login-input w-full rounded-[10px] border py-3 px-3.5 font-sans text-[13.5px] text-[var(--t)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(245,240,234,0.22)]'

function enableField(event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  event.currentTarget.removeAttribute('readonly')
}

export function KycStep1Form() {
  const step1 = useKycStore((s) => s.step1)
  const setStep1 = useKycStore((s) => s.setStep1)
  const nextStep = useKycStore((s) => s.nextStep)
  const showToast = useUiStore((s) => s.showToast)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<KycStep1FormData>({
    resolver: zodResolver(kycStep1Schema),
    defaultValues: {
      enrollmentNumber: step1.enrollmentNumber ?? '',
      barCouncilState: step1.barCouncilState ?? '',
      enrollmentYear: step1.enrollmentYear ?? '',
      degree: step1.degree ?? '',
      university: step1.university ?? '',
      experience: step1.experience ?? '',
      practiceAreas: step1.practiceAreas ?? [],
    },
  })

  const practiceAreas = watch('practiceAreas')

  useEffect(() => {
    const sub = watch((data) => setStep1(data))
    return () => sub.unsubscribe()
  }, [watch, setStep1])

  function onValid() {
    nextStep()
  }

  function onInvalid() {
    showToast('Please complete all required fields', 'err')
  }

  return (
    <div className="kyc-step-panel-in">
      <KycStepHeader
        step={1}
        title={
          <>
            Professional <em className="italic text-o2">Details</em>
          </>
        }
        subtitle="Tell us about your legal education and bar council registration. This information will be verified with official records."
      />

      <section className="mb-8">
        <h3 className="mb-[18px] border-b border-white/[0.05] pb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
          Bar Council Registration
        </h3>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-[7px]">
            <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
              Enrollment Number <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. D/1234/2018"
              className={cn(INPUT, errors.enrollmentNumber ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('enrollmentNumber')}
              readOnly
              onFocus={enableField}
            />
            <span className="-mt-1 text-[11px] text-[rgba(245,240,234,0.25)]">As on Bar Council certificate</span>
            <FieldError message={errors.enrollmentNumber?.message} show={!!errors.enrollmentNumber} />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
              Bar Council State <span className="text-danger">*</span>
            </label>
            <select
              className={cn(INPUT, errors.barCouncilState ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('barCouncilState')}
            >
              <option value="" disabled>
                Select state
              </option>
              {KYC_BAR_COUNCIL_STATES.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <FieldError message={errors.barCouncilState?.message} show={!!errors.barCouncilState} />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
              Year of Enrollment <span className="text-danger">*</span>
            </label>
            <select
              className={cn(INPUT, errors.enrollmentYear ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('enrollmentYear')}
            >
              <option value="" disabled>
                Select year
              </option>
              {KYC_ENROLLMENT_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <FieldError message={errors.enrollmentYear?.message} show={!!errors.enrollmentYear} />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="mb-[18px] border-b border-white/[0.05] pb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
          Academic Qualifications
        </h3>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-[7px]">
            <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
              Degree <span className="text-danger">*</span>
            </label>
            <select
              className={cn(INPUT, errors.degree ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('degree')}
            >
              <option value="" disabled>
                Select degree
              </option>
              {KYC_DEGREES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <FieldError message={errors.degree?.message} show={!!errors.degree} />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
              University / College <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Delhi University Faculty of Law"
              className={cn(INPUT, errors.university ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('university')}
              readOnly
              onFocus={enableField}
            />
            <FieldError message={errors.university?.message} show={!!errors.university} />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
              Years of Experience <span className="text-danger">*</span>
            </label>
            <select
              className={cn(INPUT, errors.experience ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('experience')}
            >
              <option value="" disabled>
                Select range
              </option>
              {KYC_EXPERIENCE_RANGES.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <FieldError message={errors.experience?.message} show={!!errors.experience} />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="mb-[18px] border-b border-white/[0.05] pb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
          Primary Practice Areas
        </h3>
        <div className="flex flex-col gap-[7px]">
          <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
            Select all that apply <span className="text-danger">*</span>
          </label>
          <KycTagSelect
            options={KYC_PRACTICE_AREAS}
            selected={practiceAreas}
            onChange={(next) => setValue('practiceAreas', next, { shouldValidate: true })}
            minHint="Select at least 1 practice area"
          />
          <FieldError message={errors.practiceAreas?.message} show={!!errors.practiceAreas} />
        </div>
      </section>

      <KycStepNav step={1} onNext={handleSubmit(onValid, onInvalid)} backDisabled />
    </div>
  )
}
