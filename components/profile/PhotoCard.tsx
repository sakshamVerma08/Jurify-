import React, { useRef } from 'react'
import { ProfileData } from '@/types'
import { useUiStore } from '@/stores/uiStore'

interface PhotoCardProps {
  isLawyer: boolean
  firstName: string
  lastName: string
  photoUrl: string | null
  currState: ProfileData
  setCurrState: React.Dispatch<React.SetStateAction<ProfileData>>
}

export function PhotoCard({
  isLawyer,
  firstName,
  lastName,
  photoUrl,
  currState,
  setCurrState,
}: PhotoCardProps) {
  const showToast = useUiStore((s) => s.showToast)
  const photoInputRef = useRef<HTMLInputElement>(null)

  const initials = ((firstName?.[0] || '') + (lastName?.[0] || '')).toUpperCase() || 'U'
  const lawyerCompletionPct = currState.videoName ? 100 : 78

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size cannot exceed 5MB', 'err')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrState((prev) => ({
          ...prev,
          [isLawyer ? 'lawyerPhotoUrl' : 'clientPhotoUrl']: reader.result as string,
        }))
        showToast('Photo uploaded successfully', 'ok')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setCurrState((prev) => ({
      ...prev,
      [isLawyer ? 'lawyerPhotoUrl' : 'clientPhotoUrl']: null,
    }))
    showToast('Photo removed', 'info')
  }

  return (
    <div className="bg-[#0e0d0b] border border-white/[0.08] rounded-[18px] p-7 text-center md:sticky md:top-20">
      <div
        onClick={() => photoInputRef.current?.click()}
        className="relative h-[100px] w-[100px] rounded-full mx-auto mb-3.5 bg-[#d4853a]/15 border-2 border-[#d4853a]/30 flex items-center justify-center font-serif text-[38px] font-semibold text-[#d4853a] cursor-pointer shadow-[0_0_0_3px_rgba(212,133,58,0.12)] overflow-hidden transition-all hover:shadow-[0_0_0_3px_rgba(212,133,58,0.28)] group"
      >
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt="Avatar" className="absolute inset-0 h-full w-full object-cover rounded-full" />
        ) : (
          <div>{initials}</div>
        )}
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-[3px]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3v12M3 9h12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div className="text-[10px] text-white font-medium">Change photo</div>
        </div>
      </div>
      <input
        type="file"
        ref={photoInputRef}
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
      <div className="text-[15px] font-semibold text-[#F5F0EA] mb-[3px] truncate">
        {isLawyer ? `Adv. ${firstName} ${lastName}` : `${firstName} ${lastName}`}
      </div>
      <div className="text-[12px] text-white/20 mb-4">
        {isLawyer ? `${currState.primaryCourt || 'Delhi HC'} · ${currState.experienceYears || '8 years'}` : 'Client Member'}
      </div>
      <div className="inline-flex items-center gap-[5px] bg-[#4ade80]/8 border border-[#4ade80]/22 rounded-[20px] px-3 py-1 text-[11px] text-[#4ade80] mb-4">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2.2 2.2L8 3" stroke="#4ade80" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Verified
      </div>
      
      <div className="flex flex-col gap-2">
        <button
          onClick={() => photoInputRef.current?.click()}
          className="w-full text-center bg-[#d4853a]/10 border border-[#d4853a]/25 text-[#e8a44a] text-[12.5px] font-sans py-2 rounded-[9px] cursor-pointer hover:bg-[#d4853a]/20 hover:border-[#d4853a]/45 transition-all"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline mr-[5px] align-middle">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          Upload Photo
        </button>
        <button
          onClick={handleRemovePhoto}
          className="w-full text-center bg-white/[0.04] border border-white/[0.09] text-white/50 text-[12.5px] font-sans py-2 rounded-[9px] cursor-pointer hover:bg-white/[0.08] hover:text-[#F5F0EA] transition-all"
        >
          Remove Photo
        </button>
      </div>

      {isLawyer && (
        <>
          <div className="h-px bg-white/[0.06] my-4" />
          <div className="flex items-center justify-between text-[11.5px] mb-1.5">
            <span className="text-white/50">Profile completion</span>
            <span className="text-[#d4853a] font-semibold">{lawyerCompletionPct}%</span>
          </div>
          <div className="h-1 bg-white/[0.07] rounded-[2px] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4853a] to-[#e8a44a] rounded-[2px] transition-all duration-500"
              style={{ width: `${lawyerCompletionPct}%` }}
            />
          </div>
          <div className="text-[11px] text-white/20 mt-2">
            {currState.videoName ? 'Excellent! Video profile uploaded.' : 'Add video profile to reach 100%'}
          </div>
        </>
      )}
    </div>
  )
}
