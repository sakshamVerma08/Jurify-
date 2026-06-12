import React from 'react'
import { ProfileData } from '@/types'
import { PRACTICE_AREAS, LANGUAGES } from '@/lib/data/profile'
import { KYC_BAR_COUNCIL_STATES, KYC_DEGREES, KYC_ENROLLMENT_YEARS, KYC_EXPERIENCE_RANGES } from '@/lib/data/kyc'
import { cn } from '@/lib/utils'

interface ProfessionalDetailsCardProps {
  currState: ProfileData
  cleanState: ProfileData
  setCurrState: React.Dispatch<React.SetStateAction<ProfileData>>
  handleInputChange: (field: keyof ProfileData, val: any) => void
  handleDiscardChanges: () => void
  handleSaveProfile: () => void
  isEditingProfessional: boolean
  setIsEditingProfessional: (val: boolean) => void
}

export function ProfessionalDetailsCard({
  currState,
  cleanState,
  setCurrState,
  handleInputChange,
  handleDiscardChanges,
  handleSaveProfile,
  isEditingProfessional,
  setIsEditingProfessional,
}: ProfessionalDetailsCardProps) {
  const togglePracticeArea = (area: string) => {
    setCurrState((prev) => {
      const isSelected = prev.practiceAreas.includes(area)
      const practiceAreas = isSelected
        ? prev.practiceAreas.filter((a) => a !== area)
        : [...prev.practiceAreas, area]
      return { ...prev, practiceAreas }
    })
  }

  const toggleLanguage = (lang: string) => {
    setCurrState((prev) => {
      const isSelected = prev.languages.includes(lang)
      const languages = isSelected
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang]
      return { ...prev, languages }
    })
  }

  return (
    <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-7 transition-colors">
      <div className="flex items-center justify-between mb-[22px] flex-wrap gap-2">
        <div>
          <div className="text-[9.5px] uppercase tracking-[1.3px] text-[#d4853a] font-medium mb-1">02</div>
          <h2 className="font-serif text-xl font-normal tracking-[-0.2px]">Professional <em className="italic text-[#e8a44a] not-italic">Details</em></h2>
        </div>
        <button
          type="button"
          onClick={() => {
            if (isEditingProfessional) {
              // Reset current state to saved clean values on cancel
              setCurrState((prev) => ({
                ...prev,
                barState: cleanState.barState,
                enrollmentYear: cleanState.enrollmentYear,
                degree: cleanState.degree,
                university: cleanState.university,
                experienceYears: cleanState.experienceYears,
                primaryCourt: cleanState.primaryCourt,
                practiceAreas: cleanState.practiceAreas,
                languages: cleanState.languages,
                bio: cleanState.bio,
              }))
            }
            setIsEditingProfessional(!isEditingProfessional)
          }}
          className="font-sans text-[12px] font-medium text-[#e8a44a] bg-[#d4853a]/10 border border-[#d4853a]/25 rounded-lg py-1.5 px-4 cursor-pointer hover:bg-[#d4853a]/20 transition-all"
        >
          {isEditingProfessional ? 'Cancel' : 'Edit Details'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-sm:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Enrollment No. <span className="text-danger">*</span></label>
          <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA]/60 border-b border-white/[0.04] min-h-[38px] flex items-center cursor-not-allowed select-all">
            {currState.enrollmentNo}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Bar Council State</label>
          {isEditingProfessional ? (
            <select
              value={currState.barState}
              onChange={(e) => handleInputChange('barState', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11.5px] text-[13.5px] text-[#F5F0EA] outline-none cursor-pointer focus:border-[#d4853a]/45 focus:bg-white/[0.06]"
            >
              <option value="" disabled>Select state</option>
              {KYC_BAR_COUNCIL_STATES.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {currState.barState}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Year of Enrollment</label>
          {isEditingProfessional ? (
            <select
              value={currState.enrollmentYear}
              onChange={(e) => handleInputChange('enrollmentYear', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11.5px] text-[13.5px] text-[#F5F0EA] outline-none cursor-pointer focus:border-[#d4853a]/45 focus:bg-white/[0.06]"
            >
              <option value="" disabled>Select year</option>
              {KYC_ENROLLMENT_YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {currState.enrollmentYear}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-sm:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Degree</label>
          {isEditingProfessional ? (
            <select
              value={currState.degree}
              onChange={(e) => handleInputChange('degree', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11.5px] text-[13.5px] text-[#F5F0EA] outline-none cursor-pointer focus:border-[#d4853a]/45 focus:bg-white/[0.06]"
            >
              <option value="" disabled>Select degree</option>
              {KYC_DEGREES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {currState.degree}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">University / College</label>
          {isEditingProfessional ? (
            <input
              type="text"
              value={currState.university}
              onChange={(e) => handleInputChange('university', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11px] text-[13.5px] text-[#F5F0EA] outline-none focus:border-[#d4853a]/45 focus:bg-white/[0.06]"
            />
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {currState.university || '—'}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-sm:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Years of Experience</label>
          {isEditingProfessional ? (
            <select
              value={currState.experienceYears}
              onChange={(e) => handleInputChange('experienceYears', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11.5px] text-[13.5px] text-[#F5F0EA] outline-none cursor-pointer focus:border-[#d4853a]/45 focus:bg-white/[0.06]"
            >
              <option value="" disabled>Select range</option>
              {KYC_EXPERIENCE_RANGES.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {currState.experienceYears}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Primary Court</label>
          {isEditingProfessional ? (
            <input
              type="text"
              value={currState.primaryCourt}
              onChange={(e) => handleInputChange('primaryCourt', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11px] text-[13.5px] text-[#F5F0EA] outline-none focus:border-[#d4853a]/45 focus:bg-white/[0.06]"
            />
          ) : (
            <div className="w-full py-2.5 text-[13.5px] text-[#F5F0EA] font-medium border-b border-white/[0.04] min-h-[38px] flex items-center">
              {currState.primaryCourt || '—'}
            </div>
          )}
        </div>
      </div>

      {/* Practice Areas Tag Pool */}
      <div className="grid grid-cols-1 mb-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Practice Areas <span className="text-danger">*</span></label>
          {isEditingProfessional ? (
            <div className="flex flex-wrap gap-2 p-2.5 bg-white/[0.04] border border-white/[0.09] rounded-xl">
              {PRACTICE_AREAS.map((area) => {
                const isSelected = currState.practiceAreas.includes(area)
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => togglePracticeArea(area)}
                    className={cn(
                      "text-[11px] px-3 py-1 rounded-[20px] border border-white/[0.09] bg-transparent text-white/50 cursor-pointer transition-all select-none hover:border-[#d4853a]/30 hover:text-[#F5F0EA]",
                      isSelected && "bg-[#d4853a]/15 border-[#d4853a]/38 text-[#e8a44a]"
                    )}
                  >
                    {isSelected ? '✓ ' : ''}{area}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 py-2">
              {currState.practiceAreas.length > 0 ? (
                currState.practiceAreas.map((area) => (
                  <span
                    key={area}
                    className="text-[11px] px-3 py-1 rounded-[20px] border border-[#d4853a]/25 bg-[#d4853a]/8 text-[#e8a44a]"
                  >
                    {area}
                  </span>
                ))
              ) : (
                <span className="text-[12.5px] text-white/20">None specified</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Languages Tag Pool */}
      <div className="grid grid-cols-1 mb-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Languages Spoken</label>
          {isEditingProfessional ? (
            <div className="flex flex-wrap gap-2 p-2.5 bg-white/[0.04] border border-white/[0.09] rounded-xl">
              {LANGUAGES.map((lang) => {
                const isSelected = currState.languages.includes(lang)
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={cn(
                      "text-[11px] px-3 py-1 rounded-[20px] border border-white/[0.09] bg-transparent text-white/50 cursor-pointer transition-all select-none hover:border-[#d4853a]/30 hover:text-[#F5F0EA]",
                      isSelected && "bg-[#d4853a]/15 border-[#d4853a]/38 text-[#e8a44a]"
                    )}
                  >
                    {isSelected ? '✓ ' : ''}{lang}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 py-2">
              {currState.languages.length > 0 ? (
                currState.languages.map((lang) => (
                  <span
                    key={lang}
                    className="text-[11px] px-3 py-1 rounded-[20px] border border-[#d4853a]/25 bg-[#d4853a]/8 text-[#e8a44a]"
                  >
                    {lang}
                  </span>
                ))
              ) : (
                <span className="text-[12.5px] text-white/20">None specified</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Bio / About</label>
          {isEditingProfessional ? (
            <>
              <textarea
                value={currState.bio}
                maxLength={500}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11px] text-[13.5px] text-[#F5F0EA] outline-none transition-all resize-y min-h-[100px] leading-[1.65] focus:border-[#d4853a]/45 focus:bg-white/[0.06]"
                placeholder="Add some details about your practice..."
              />
              <div className="text-[11px] text-white/20 text-right mt-1">
                {currState.bio.length} / 500
              </div>
            </>
          ) : (
            <p className="text-[13.5px] text-[#F5F0EA]/95 leading-[1.65] py-2 whitespace-pre-wrap">
              {currState.bio || '—'}
            </p>
          )}
        </div>
      </div>

      {isEditingProfessional && (
        <div className="flex justify-end gap-2.5 border-t border-white/[0.06] pt-5 mt-5">
          <button onClick={handleDiscardChanges} className="text-[13px] text-white/50 bg-white/[0.04] border border-white/[0.09] rounded-xl px-5 py-[11px] cursor-pointer transition-all hover:bg-white/[0.08] hover:text-[#F5F0EA]">Discard</button>
          <button onClick={handleSaveProfile} className="flex items-center gap-[7px] text-[13.5px] font-medium bg-gradient-to-br from-[#d4853a] to-[#b8521e] text-white rounded-xl px-7 py-[11px] cursor-pointer shadow-[0_4px_16px_rgba(200,98,42,0.26)] transition-all hover:opacity-92 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(200,98,42,0.36)]">Save Changes</button>
        </div>
      )}
    </div>
  )
}
