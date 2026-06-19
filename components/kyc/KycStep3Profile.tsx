// FILE: components/kyc/KycStep3Profile.tsx
// TYPE: Client Component

'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError } from '@/components/auth/FieldError'
import { KycStepHeader } from '@/components/kyc/KycStepHeader'
import { KycStepNav } from '@/components/kyc/KycStepNav'
import { KycTagSelect } from '@/components/kyc/KycTagSelect'
import { KYC_COUNTRIES, KYC_LANGUAGES, KYC_OFFICE_STATES } from '@/lib/data/kyc'
import { kycStep3Schema, type KycStep3FormData } from '@/lib/validations/kyc'
import { cn } from '@/lib/utils'
import { useKycStore } from '@/stores/kycStore'
import { useUiStore } from '@/stores/uiStore'
import { uploadToCloudinary } from '@/lib/cloudinary-upload'

const INPUT =
  'login-input w-full rounded-[10px] border py-3 px-3.5 font-sans text-[13.5px] text-[var(--t)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(245,240,234,0.22)]'

function enableField(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  event.currentTarget.removeAttribute('readonly')
}

export function KycStep3Profile() {
  const step3 = useKycStore((s) => s.step3)
  const setStep3 = useKycStore((s) => s.setStep3)
  const photo = useKycStore((s) => s.photo)
  const photoPreviewUrl = useKycStore((s) => s.photoPreviewUrl)
  const setPhoto = useKycStore((s) => s.setPhoto)
  const removePhoto = useKycStore((s) => s.removePhoto)
  const nextStep = useKycStore((s) => s.nextStep)
  const prevStep = useKycStore((s) => s.prevStep)
  const showToast = useUiStore((s) => s.showToast)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Omit<KycStep3FormData, 'photo'>>({
    resolver: zodResolver(kycStep3Schema.omit({ photo: true })),
    defaultValues: {
      city: step3.city ?? '',
      state: step3.state ?? '',
      country: step3.country ?? 'India',
      languages: step3.languages ?? ['English', 'Hindi'],
      bio: step3.bio ?? '',
      courts: step3.courts ?? '',
    },
  })

  const languages = watch('languages')
  const bio = watch('bio') ?? ''

  useEffect(() => {
    const sub = watch((data) => setStep3(data))
    return () => sub.unsubscribe()
  }, [watch, setStep3])

  async function handlePhotoSelect(f: File) {
    if (f.size > 5 * 1024 * 1024) {
      showToast('Photo size must be under 5MB', 'err')
      return
    }

    try {
      setIsUploadingPhoto(true)
      const fileInfo = await uploadToCloudinary(f)
      setPhoto(fileInfo, fileInfo.secure_url)
      showToast('Profile photo uploaded successfully', 'ok')
    } catch (err) {
      console.error(err)
      showToast('Failed to upload profile photo', 'err')
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  function onValid() {
    if (!photo?.secure_url) {
      showToast('Profile photo is required', 'err')
      return
    }
    nextStep()
  }

  function onInvalid() {
    showToast('Please complete all required profile fields', 'err')
  }

  const charClass =
    bio.length > 500 ? 'text-danger' : bio.length > 450 ? 'text-o2' : 'text-[rgba(245,240,234,0.25)]'

  return (
    <div className="kyc-step-panel-in">
      <KycStepHeader
        step={3}
        title={
          <>
            Profile <em className="italic text-o2">Setup</em>
          </>
        }
        subtitle="Build your public Jurify profile. This is what clients and fellow lawyers will see when they find you on the platform."
      />

      <section className="mb-8">
        <h3 className="mb-[18px] border-b border-white/[0.05] pb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
          Profile Photo
        </h3>
        <div className="mb-2 flex items-start gap-7">
          <button
            type="button"
            onClick={() => photoInputRef.current?.click()}
            className={cn(
              'relative flex h-[120px] w-[120px] shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-og/35 bg-og/[0.06] transition-all duration-200 hover:border-og/60 hover:bg-og/10',
              photoPreviewUrl && 'border-solid border-og/40'
            )}
          >
            {photoPreviewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreviewUrl} alt="Profile preview" className="absolute inset-0 h-full w-full rounded-full object-cover" />
            ) : (
              <>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <circle cx="11" cy="8" r="4" stroke="rgba(212,133,58,0.6)" strokeWidth="1.3" />
                  <path d="M3 19c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(212,133,58,0.6)" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <span className="mt-1.5 text-center text-[10.5px] leading-snug text-[var(--td)]">
                  Upload
                  <br />
                  Photo
                </span>
              </>
            )}
          </button>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handlePhotoSelect(f)
            }}
          />
          <div className="flex-1">
            <p className="mb-1.5 text-sm font-medium text-[var(--t)]">Professional Profile Photo</p>
            <p className="mb-3 text-[12.5px] leading-relaxed text-[var(--td)]">
              Use a clear, professional headshot with a neutral background. Square format works best. JPG or PNG, minimum 400×400px, max 5MB.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={isUploadingPhoto}
                onClick={() => photoInputRef.current?.click()}
                className={cn(
                  "cursor-pointer rounded-lg border border-og/30 bg-og/[0.14] px-4 py-2 font-sans text-xs font-medium text-o2 transition-all duration-150 hover:border-og/50 hover:bg-og/[0.22]",
                  isUploadingPhoto && "opacity-60 cursor-not-allowed"
                )}
              >
                {isUploadingPhoto ? 'Uploading...' : 'Upload Photo'}
              </button>
              {photoPreviewUrl && !isUploadingPhoto && (
                <button
                  type="button"
                  onClick={() => {
                    removePhoto()
                    if (photoInputRef.current) photoInputRef.current.value = ''
                  }}
                  className="cursor-pointer rounded-lg border border-white/[0.09] bg-white/[0.04] px-4 py-2 font-sans text-xs font-medium text-[var(--tm)] transition-all duration-150 hover:bg-white/[0.08] hover:text-[var(--t)]"
                >
                  Remove
                </button>
              )}
            </div>
            {!photo && (
              <p className="mt-2 text-[11px] text-danger">Profile photo is required</p>
            )}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="mb-[18px] border-b border-white/[0.05] pb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
          Office / Practice Location
        </h3>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-[7px]">
            <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
              City <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. New Delhi"
              className={cn(INPUT, errors.city ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('city')}
              readOnly
              onFocus={enableField}
            />
            <FieldError message={errors.city?.message} show={!!errors.city} />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
              State <span className="text-danger">*</span>
            </label>
            <select
              className={cn(INPUT, errors.state ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]')}
              {...register('state')}
            >
              <option value="" disabled>
                Select state
              </option>
              {KYC_OFFICE_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <FieldError message={errors.state?.message} show={!!errors.state} />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">Country</label>
            <select className={cn(INPUT, 'border-white/[0.09]')} {...register('country')}>
              {KYC_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="mb-[18px] border-b border-white/[0.05] pb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
          Languages Spoken
        </h3>
        <div className="flex flex-col gap-[7px]">
          <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
            Select all you can conduct legal proceedings in <span className="text-danger">*</span>
          </label>
          <KycTagSelect
            options={KYC_LANGUAGES}
            selected={languages}
            onChange={(next) => setValue('languages', next, { shouldValidate: true })}
          />
          <FieldError message={errors.languages?.message} show={!!errors.languages} />
        </div>
      </section>

      <section className="mb-8">
        <h3 className="mb-[18px] border-b border-white/[0.05] pb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
          Professional Bio
        </h3>
        <div className="mb-4 flex flex-col gap-[7px]">
          <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">
            About You <span className="text-danger">*</span>
          </label>
          <textarea
            maxLength={500}
            rows={5}
            placeholder="Describe your practice, expertise, notable cases, and what drives your commitment to legal service…"
            className={cn(
              INPUT,
              'min-h-[110px] resize-y leading-relaxed',
              errors.bio ? 'border-[rgba(240,100,100,0.45)]' : 'border-white/[0.09]'
            )}
            {...register('bio')}
            readOnly
            onFocus={enableField}
          />
          <p className={cn('-mt-1 text-right text-[11px]', charClass)}>{bio.length} / 500</p>
          <FieldError message={errors.bio?.message} show={!!errors.bio} />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label className="text-xs font-medium text-[rgba(245,240,234,0.55)]">Court(s) You Practice In</label>
          <input
            type="text"
            placeholder="e.g. Delhi High Court, Supreme Court of India, District Courts…"
            className={cn(INPUT, 'border-white/[0.09]')}
            {...register('courts')}
            readOnly
            onFocus={enableField}
          />
        </div>
      </section>

      <section className="mb-8">
        <h3 className="mb-[18px] border-b border-white/[0.05] pb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-[rgba(245,240,234,0.3)]">
          Video Profile{' '}
          <span className="ml-2 align-middle text-[9px] font-semibold uppercase tracking-[0.8px] text-[var(--td)] rounded border border-white/10 bg-white/[0.07] px-[7px] py-0.5">
            Optional
          </span>
        </h3>
        <button
          type="button"
          onClick={() => videoInputRef.current?.click()}
          className="kyc-video-zone flex w-full cursor-pointer items-center gap-5 rounded-[14px] border-[1.5px] border-dashed border-white/10 bg-white/[0.02] px-6 py-6 text-left transition-all duration-200 hover:border-og/30 hover:bg-og/[0.03]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.05]">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <rect x="2" y="5" width="14" height="12" rx="2" stroke="rgba(245,240,234,0.35)" strokeWidth="1.3" />
              <path d="M16 9l4-2v6l-4-2V9z" stroke="rgba(245,240,234,0.35)" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="mb-0.5 text-[13.5px] font-medium text-[var(--t)]">Upload a 60-second Introduction Video</p>
            <p className="text-xs leading-relaxed text-[var(--td)]">
              Let clients see your communication style before reaching out. MP4, MOV, max 100MB.
              <br />
              <span className="text-[11px] text-[rgba(245,240,234,0.25)]">Click here or drag and drop your video</span>
            </p>
          </div>
          <svg className="shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 3v12M3 9h12" stroke="rgba(245,240,234,0.2)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={() => showToast('Video uploaded successfully', 'ok')}
        />
      </section>

      <KycStepNav step={3} onBack={prevStep} onNext={handleSubmit(onValid, onInvalid)} nextLabel="Review Application" />
    </div>
  )
}
