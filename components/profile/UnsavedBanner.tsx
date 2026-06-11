interface UnsavedBannerProps {
  isDirty: boolean
  isSaving: boolean
  handleDiscardChanges: () => void
  handleSaveProfile: () => void
}

export function UnsavedBanner({
  isDirty,
  isSaving,
  handleDiscardChanges,
  handleSaveProfile,
}: UnsavedBannerProps) {
  if (!isDirty) return null

  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-[800] bg-[#141310]/98 border border-[#d4853a]/30 rounded-xl px-5 py-3.5 shadow-[0_16px_48px_rgba(0,0,0,0.5)] flex items-center gap-4 backdrop-blur-md animate-fade-in duration-300 max-sm:w-[92%] max-sm:flex-col max-sm:gap-2.5">
      <div className="text-[13px] text-white/50">
        <strong className="text-[#F5F0EA] font-medium">Unsaved Changes</strong> — You have unsaved changes in this tab.
      </div>
      <div className="flex gap-2.5 shrink-0 max-sm:w-full">
        <button
          onClick={handleDiscardChanges}
          className="text-[12px] text-white/50 bg-white/[0.04] border border-white/[0.09] rounded-lg px-4 py-2 cursor-pointer transition-all hover:bg-white/[0.08] hover:text-[#F5F0EA] max-sm:flex-1 text-center"
        >
          Discard
        </button>
        <button
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="flex items-center justify-center gap-1.5 text-[12px] font-medium bg-gradient-to-br from-[#d4853a] to-[#b8521e] text-white rounded-lg px-4.5 py-2 cursor-pointer transition-all hover:opacity-92 hover:-translate-y-[0.5px] disabled:opacity-40 disabled:cursor-not-allowed max-sm:flex-1 text-center"
        >
          {isSaving && <div className="btn-spinner" />}
          Save Changes
        </button>
      </div>
    </div>
  )
}
