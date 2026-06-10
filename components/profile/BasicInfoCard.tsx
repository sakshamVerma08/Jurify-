import React from 'react'
import { ProfileData } from '@/types'
import { cn } from '@/lib/utils'

interface BasicInfoCardProps {
  isLawyer: boolean
  currState: ProfileData
  cleanState: ProfileData
  setCurrState: React.Dispatch<React.SetStateAction<ProfileData>>
  handleInputChange: (field: keyof ProfileData, val: any) => void
  handleDiscardChanges: () => void
  handleSaveProfile: () => void
  isEditingBasicInfo: boolean
  setIsEditingBasicInfo: (val: boolean) => void
}

export function BasicInfoCard({
  isLawyer,
  currState,
  cleanState,
  setCurrState,
  handleInputChange,
  handleDiscardChanges,
  handleSaveProfile,
  isEditingBasicInfo,
  setIsEditingBasicInfo,
}: BasicInfoCardProps) {
  const firstName = isLawyer ? currState.lawyerFirstName : currState.clientFirstName
  const lastName = isLawyer ? currState.lawyerLastName : currState.clientLastName
  const dob = isLawyer ? currState.lawyerDob : currState.clientDob
  const city = isLawyer ? currState.lawyerCity : currState.clientCity
  const state = isLawyer ? currState.lawyerState : currState.clientState

  return (
    <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-7 transition-colors">
      <div className="flex items-center justify-between mb-[22px] flex-wrap gap-2">
        <div>
          <div className="text-[9.5px] uppercase tracking-[1.3px] text-[#d4853a] font-medium mb-1">01</div>
          <h2 className="font-serif text-xl font-normal tracking-[-0.2px]">Basic <em className="italic text-[#e8a44a] not-italic">Information</em></h2>
        </div>
        <button
          type="button"
          onClick={() => {
            if (isEditingBasicInfo) {
              // Reset current state to saved clean values on cancel
              setCurrState((prev) => ({
                ...prev,
                lawyerFirstName: cleanState.lawyerFirstName,
                lawyerLastName: cleanState.lawyerLastName,
                lawyerPhone: cleanState.lawyerPhone,
                lawyerDob: cleanState.lawyerDob,
                lawyerCity: cleanState.lawyerCity,
                lawyerState: cleanState.lawyerState,
                clientFirstName: cleanState.clientFirstName,
                clientLastName: cleanState.clientLastName,
                clientPhone: cleanState.clientPhone,
                clientDob: cleanState.clientDob,
                clientCity: cleanState.clientCity,
                clientState: cleanState.clientState,
              }))
            }
            setIsEditingBasicInfo(!isEditingBasicInfo)
          }}
          className="font-sans text-[12px] font-medium text-[#e8a44a] bg-[#d4853a]/10 border border-[#d4853a]/25 rounded-lg py-1.5 px-4 cursor-pointer hover:bg-[#d4853a]/20 transition-all"
        >
          {isEditingBasicInfo ? 'Cancel' : 'Edit Info'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-sm:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">First Name <span className="text-danger">*</span></label>
          {isEditingBasicInfo ? (
            <input
              type="text"
              value={firstName}
              onChange={(e) => handleInputChange(isLawyer ? 'lawyerFirstName' : 'clientFirstName', e.target.value)}
              className={cn(
                "w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11px] text-[13.5px] text-[#F5F0EA] outline-none transition-all placeholder:text-white/20 focus:border-[#d4853a]/45 focus:bg-white/[0.06] focus:ring-3 focus:ring-[#d4853a]/9",
                firstName && "border-success/32"
              )}
            />
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {firstName}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Last Name <span className="text-danger">*</span></label>
          {isEditingBasicInfo ? (
            <input
              type="text"
              value={lastName}
              onChange={(e) => handleInputChange(isLawyer ? 'lawyerLastName' : 'clientLastName', e.target.value)}
              className={cn(
                "w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11px] text-[13.5px] text-[#F5F0EA] outline-none transition-all placeholder:text-white/20 focus:border-[#d4853a]/45 focus:bg-white/[0.06] focus:ring-3 focus:ring-[#d4853a]/9",
                lastName && "border-success/32"
              )}
            />
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {lastName}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 mb-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Email Address <span className="text-danger">*</span></label>
          <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA]/60 border-b border-white/[0.04] min-h-[38px] flex items-center cursor-not-allowed select-all">
            {isLawyer ? currState.lawyerEmail : currState.clientEmail}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-sm:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Phone Number</label>
          <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA]/60 border-b border-white/[0.04] min-h-[38px] flex items-center cursor-not-allowed select-all">
            {isLawyer ? currState.lawyerPhone : currState.clientPhone}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Date of Birth</label>
          {isEditingBasicInfo ? (
            <input
              type="date"
              value={dob}
              onChange={(e) => handleInputChange(isLawyer ? 'lawyerDob' : 'clientDob', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11px] text-[13.5px] text-[#F5F0EA] outline-none transition-all placeholder:text-white/20 focus:border-[#d4853a]/45 focus:bg-white/[0.06] focus:ring-3 focus:ring-[#d4853a]/9 [color-scheme:dark]"
            />
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {dob ? new Date(dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">City <span className="text-danger">*</span></label>
          {isEditingBasicInfo ? (
            <input
              type="text"
              value={city}
              onChange={(e) => handleInputChange(isLawyer ? 'lawyerCity' : 'clientCity', e.target.value)}
              className={cn(
                "w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11px] text-[13.5px] text-[#F5F0EA] outline-none transition-all placeholder:text-white/20 focus:border-[#d4853a]/45 focus:bg-white/[0.06] focus:ring-3 focus:ring-[#d4853a]/9",
                city && "border-success/32"
              )}
            />
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {city}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">State <span className="text-danger">*</span></label>
          {isEditingBasicInfo ? (
            <select
              value={state}
              onChange={(e) => handleInputChange(isLawyer ? 'lawyerState' : 'clientState', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11.5px] text-[13.5px] text-[#F5F0EA] outline-none transition-all cursor-pointer focus:border-[#d4853a]/45 focus:bg-white/[0.06]"
            >
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Haryana">Haryana</option>
            </select>
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {state}
            </div>
          )}
        </div>
      </div>

      {isEditingBasicInfo && (
        <div className="flex justify-end gap-2.5 border-t border-white/[0.06] pt-5 mt-5">
          <button onClick={handleDiscardChanges} className="text-[13px] text-white/50 bg-white/[0.04] border border-white/[0.09] rounded-xl px-5 py-[11px] cursor-pointer transition-all hover:bg-white/[0.08] hover:text-[#F5F0EA]">Discard</button>
          <button onClick={handleSaveProfile} className="flex items-center gap-[7px] text-[13.5px] font-medium bg-gradient-to-br from-[#d4853a] to-[#b8521e] text-white rounded-xl px-7 py-[11px] cursor-pointer shadow-[0_4px_16px_rgba(200,98,42,0.26)] transition-all hover:opacity-92 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(200,98,42,0.36)]">Save Changes</button>
        </div>
      )}
    </div>
  )
}
