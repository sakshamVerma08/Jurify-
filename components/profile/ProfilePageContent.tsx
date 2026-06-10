// FILE: components/profile/ProfilePageContent.tsx
// TYPE: Client Component

'use client'

import React, { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useUiStore } from '@/stores/uiStore'
import { Toast } from '@/components/ui/Toast'
import { cn } from '@/lib/utils'

import { ProfileData } from '@/types'
import { initialProfileState } from '@/lib/data/profile'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'

// Import modular subcomponents
import { PhotoCard } from './PhotoCard'
import { BasicInfoCard } from './BasicInfoCard'
import { ProfessionalDetailsCard } from './ProfessionalDetailsCard'
import { VideoProfileCard } from './VideoProfileCard'
import { SettingsTab } from './SettingsTab'
import { SecurityTab } from './SecurityTab'
import { NotificationsTab } from './NotificationsTab'
import { UnsavedBanner } from './UnsavedBanner'

export function ProfilePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const showToast = useUiStore((s) => s.showToast)
  const viewRole = useDashboardStore((s) => s.viewRole)
  const setViewRole = useDashboardStore((s) => s.setViewRole)

  // Tab State
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'security' | 'notifications'>('profile')

  // Edit mode toggles
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false)
  const [isEditingProfessional, setIsEditingProfessional] = useState(false)

  // Profile data state
  const [currState, setCurrState] = useState<ProfileData>(initialProfileState)
  const [cleanState, setCleanState] = useState<ProfileData>(initialProfileState)
  const [isSaving, startSavingTransition] = useTransition()

  // Parse tab search query parameter on load
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'settings' || tabParam === 'security' || tabParam === 'notifications' || tabParam === 'profile') {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  // Check if current state is dirty
  const isDirty = JSON.stringify(currState) !== JSON.stringify(cleanState)

  // Save profile changes (simulated async delay)
  const handleSaveProfile = () => {
    startSavingTransition(async () => {
      // Simulate API call lag
      await new Promise((resolve) => setTimeout(resolve, 800))
      setCleanState(currState)
      setIsEditingBasicInfo(false)
      setIsEditingProfessional(false)
      showToast('Changes saved successfully', 'ok')
    })
  }

  // Discard all changes
  const handleDiscardChanges = () => {
    setCurrState(cleanState)
    setIsEditingBasicInfo(false)
    setIsEditingProfessional(false)
    showToast('Changes discarded', 'info')
  }

  // State text updating field helper
  const handleInputChange = (field: keyof ProfileData, val: any) => {
    setCurrState((prev) => ({ ...prev, [field]: val }))
  }

  // Dynamic values based on active viewing role
  const isLawyer = viewRole === 'lawyer'
  const firstName = isLawyer ? currState.lawyerFirstName : currState.clientFirstName
  const lastName = isLawyer ? currState.lawyerLastName : currState.clientLastName
  const photoUrl = isLawyer ? currState.lawyerPhotoUrl : currState.clientPhotoUrl

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F0EA] font-sans pb-[100px]">
      
      {/* NAV */}
      <nav className="sticky top-0 z-[200] flex h-16 items-center justify-between bg-[#080808]/95 px-8 backdrop-blur-2xl border-b border-white/[0.07] max-sm:px-4">
        <Link href="/" className="flex items-center gap-[9px] no-underline">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border-[1.5px] border-[#d4853a]/50 bg-gradient-to-br from-[#d4853a]/25 to-[#c8622a]/10">
            <JurifyLogoIcon size={17} />
          </div>
          <span className="font-serif text-[21px] font-semibold text-[#F5F0EA] tracking-[0.4px]">Jurify</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-[7px] text-[13px] text-white/50 bg-white/[0.04] border border-white/[0.09] rounded-lg px-4 py-[7px] transition-all hover:bg-white/[0.08] hover:text-[#F5F0EA] no-underline">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M9 6.5H4M6 4l-2.5 2.5L6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Dashboard
          </Link>
          <button
            onClick={handleSaveProfile}
            disabled={!isDirty || isSaving}
            className="flex items-center gap-[7px] text-[13px] font-medium bg-gradient-to-br from-[#d4853a] to-[#b8521e] text-white rounded-[9px] px-5 py-[9px] shadow-[0_4px_18px_rgba(200,98,42,0.28)] transition-all hover:opacity-92 hover:-translate-y-[1px] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSaving && <div className="btn-spinner" />}
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 10V4l2-2h5l2 2v6H2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
              <rect x="3.5" y="6" width="6" height="4" rx=".8" stroke="currentColor" strokeWidth="1"/>
              <line x1="4.5" y1="3" x2="8.5" y2="3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            Save Changes
          </button>
        </div>
      </nav>

      {/* PAGE CONTAINER */}
      <div className="max-w-[1100px] mx-auto px-10 py-9 max-md:px-4">

        {/* HEADER SECTION */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-[7px] text-[10.5px] tracking-[0.4px] text-white/40 bg-white/[0.04] border border-white/[0.08] rounded-[20px] px-3 py-1 mb-3">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <circle cx="5.5" cy="4" r="2.5" stroke="rgba(245,240,234,0.4)" strokeWidth="1"/>
                <path d="M1 10c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke="rgba(245,240,234,0.4)" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              Account Settings
            </div>
            <h1 className="font-serif text-[32px] md:text-[46px] font-light leading-[1.08] tracking-[-0.8px]">
              My <em className="italic text-[#e8a44a] not-italic">Profile</em>
            </h1>
          </div>
          <div className="flex gap-1 bg-white/[0.04] border border-white/[0.08] rounded-[9px] p-1">
            <button
              onClick={() => setViewRole('lawyer')}
              className={cn(
                "font-sans text-[12px] font-medium bg-transparent border-none py-1.5 px-4 rounded-md cursor-pointer text-white/40 transition-all",
                isLawyer && "bg-[#d4853a]/18 text-[#e8a44a] border border-[#d4853a]/28 font-semibold"
              )}
            >
              ⚖ Lawyer View
            </button>
            <button
              onClick={() => setViewRole('client')}
              className={cn(
                "font-sans text-[12px] font-medium bg-transparent border-none py-1.5 px-4 rounded-md cursor-pointer text-white/40 transition-all",
                !isLawyer && "bg-[#d4853a]/18 text-[#e8a44a] border border-[#d4853a]/28 font-semibold"
              )}
            >
              👤 Client View
            </button>
          </div>
        </div>

        {/* TABS HEADER BAR */}
        <div className="flex items-center justify-between border-b border-white/[0.07] mb-8 w-full">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('profile')}
              className={cn(
                "font-sans text-[13.5px] font-normal text-white/50 bg-transparent border-b-2 border-transparent py-3 px-5 cursor-pointer transition-all hover:text-[#F5F0EA] flex items-center gap-[7px] shrink-0",
                activeTab === 'profile' && "text-[#F5F0EA] border-b-[#d4853a]"
              )}
            >
              <svg className={cn("opacity-55", activeTab === 'profile' && "opacity-90")} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={cn(
                "font-sans text-[13.5px] font-normal text-white/50 bg-transparent border-b-2 border-transparent py-3 px-5 cursor-pointer transition-all hover:text-[#F5F0EA] flex items-center gap-[7px] shrink-0",
                activeTab === 'settings' && "text-[#F5F0EA] border-b-[#d4853a]"
              )}
            >
              <svg className={cn("opacity-55", activeTab === 'settings' && "opacity-90")} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.9 2.9l1 1M10.1 10.1l1 1M2.9 11.1l1-1M10.1 3.9l1-1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              Settings
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={cn(
                "font-sans text-[13.5px] font-normal text-white/50 bg-transparent border-b-2 border-transparent py-3 px-5 cursor-pointer transition-all hover:text-[#F5F0EA] flex items-center gap-[7px] shrink-0",
                activeTab === 'security' && "text-[#F5F0EA] border-b-[#d4853a]"
              )}
            >
              <svg className={cn("opacity-55", activeTab === 'security' && "opacity-90")} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5L2.5 3.5v4c0 3 2 5 4.5 5.5 2.5-.5 4.5-2.5 4.5-5.5v-4L7 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                <path d="M5 7l1.5 1.5L9 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={cn(
                "font-sans text-[13.5px] font-normal text-white/50 bg-transparent border-b-2 border-transparent py-3 px-5 cursor-pointer transition-all hover:text-[#F5F0EA] flex items-center gap-[7px] shrink-0",
                activeTab === 'notifications' && "text-[#F5F0EA] border-b-[#d4853a]"
              )}
            >
              <svg className={cn("opacity-55", activeTab === 'notifications' && "opacity-90")} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5a4.5 4.5 0 014.5 4.5v3l1 2H1.5l1-2V6A4.5 4.5 0 017 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                <path d="M5.5 11.5c0 .8.67 1.5 1.5 1.5s1.5-.7 1.5-1.5" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
              Notifications
            </button>
          </div>
          
          {/* KYC Status Link (Lawyers only) */}
          {isLawyer && (
            <Link 
              href="/kyc/status" 
              className="hidden md:flex items-center gap-2 text-[12.5px] font-medium text-[#d4853a] bg-[#d4853a]/10 border border-[#d4853a]/20 px-3 py-1.5 rounded-full hover:bg-[#d4853a]/20 transition-all no-underline mb-1"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1"/>
              </svg>
              Check KYC Status
            </Link>
          )}
        </div>

        {/* ══ PROFILE PANEL ══ */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-[240px_1fr] gap-6 max-md:grid-cols-1 items-start">
            
            {/* PHOTO CARD */}
            <PhotoCard
              isLawyer={isLawyer}
              firstName={firstName}
              lastName={lastName}
              photoUrl={photoUrl}
              currState={currState}
              setCurrState={setCurrState}
            />

            {/* FORM AREA */}
            <div className="flex flex-col gap-5">
              
              {/* Basic Info */}
              <BasicInfoCard
                isLawyer={isLawyer}
                currState={currState}
                cleanState={cleanState}
                setCurrState={setCurrState}
                handleInputChange={handleInputChange}
                handleDiscardChanges={handleDiscardChanges}
                handleSaveProfile={handleSaveProfile}
                isEditingBasicInfo={isEditingBasicInfo}
                setIsEditingBasicInfo={setIsEditingBasicInfo}
              />

              {/* Professional details (Lawyer view only) */}
              {isLawyer && (
                <ProfessionalDetailsCard
                  currState={currState}
                  cleanState={cleanState}
                  setCurrState={setCurrState}
                  handleInputChange={handleInputChange}
                  handleDiscardChanges={handleDiscardChanges}
                  handleSaveProfile={handleSaveProfile}
                  isEditingProfessional={isEditingProfessional}
                  setIsEditingProfessional={setIsEditingProfessional}
                />
              )}

              {/* Video Profile (Lawyer view only) */}
              {isLawyer && (
                <VideoProfileCard
                  currState={currState}
                  setCurrState={setCurrState}
                />
              )}

            </div>
          </div>
        )}

        {/* ══ SETTINGS PANEL ══ */}
        {activeTab === 'settings' && (
          <SettingsTab
            currState={currState}
            handleInputChange={handleInputChange}
          />
        )}

        {/* ══ SECURITY PANEL ══ */}
        {activeTab === 'security' && (
          <SecurityTab
            currState={currState}
            setCurrState={setCurrState}
            setCleanState={setCleanState}
          />
        )}

        {/* ══ NOTIFICATIONS PANEL ══ */}
        {activeTab === 'notifications' && (
          <NotificationsTab
            currState={currState}
            handleInputChange={handleInputChange}
          />
        )}

      </div>

      {/* UNSAVED CHANGES BANNER */}
      <UnsavedBanner
        isDirty={isDirty}
        isSaving={isSaving}
        handleDiscardChanges={handleDiscardChanges}
        handleSaveProfile={handleSaveProfile}
      />

      {/* RENDER TOAST PORTAL */}
      <Toast />
    </div>
  )
}
