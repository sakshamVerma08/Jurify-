import React, { useRef } from 'react'
import { ProfileData } from '@/types'
import { useUiStore } from '@/stores/uiStore'

interface VideoProfileCardProps {
  currState: ProfileData
  setCurrState: React.Dispatch<React.SetStateAction<ProfileData>>
}

export function VideoProfileCard({
  currState,
  setCurrState,
}: VideoProfileCardProps) {
  const showToast = useUiStore((s) => s.showToast)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        showToast('Video size exceeds 100MB', 'err')
        return
      }
      setCurrState((prev) => ({
        ...prev,
        videoName: file.name,
        videoDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      }))
      showToast('Video uploaded successfully!', 'ok')
    }
  }

  const handleRemoveVideo = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrState((prev) => ({
      ...prev,
      videoName: null,
      videoDate: null,
    }))
    showToast('Video profile removed', 'info')
  }

  return (
    <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-7 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[9.5px] uppercase tracking-[1.3px] text-[#d4853a] font-medium mb-1">03</div>
          <h2 className="font-serif text-xl font-normal tracking-[-0.2px]">
            Video <em className="italic text-[#e8a44a] not-italic">Profile</em>
            <span className="text-[9px] font-semibold tracking-[0.7px] uppercase bg-white/[0.07] border border-white/[0.1] text-white/20 px-2 py-0.5 rounded-[3px] ml-2.5 align-middle">Optional</span>
          </h2>
        </div>
      </div>

      <div
        onClick={() => videoInputRef.current?.click()}
        className="border-[1.5px] border-dashed border-white/10 rounded-xl p-5 flex items-center gap-4 cursor-pointer bg-white/[0.02] transition-all hover:border-[#d4853a]/30 hover:bg-[#d4853a]/3"
      >
        <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.09] flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="4" width="13" height="12" rx="2" stroke="rgba(245,240,234,0.3)" strokeWidth="1.3"/>
            <path d="M15 8l4-2v8l-4-2V8z" stroke="rgba(245,240,234,0.3)" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div className="text-[13.5px] font-medium text-[#F5F0EA] mb-0.5">Upload or replace your introduction video</div>
          <div className="text-[11.5px] text-white/20 leading-[1.5]">
            MP4 or MOV · Max 100MB · Up to 60 seconds<br/>
            <span className="text-white/10 text-[11px]">Drag and drop here or click to browse</span>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={videoInputRef}
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
      />

      {currState.videoName && (
        <div className="mt-3.5 flex items-center justify-between p-3.5 bg-[#4ade80]/5 border border-[#4ade80]/15 rounded-xl text-[12.5px] text-[#4ade80]/80">
          <div className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5l2.5 2.5L11 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>
              Current: <strong className="text-[#4ade80] font-semibold">{currState.videoName}</strong>
              {currState.videoDate && ` — Uploaded ${currState.videoDate}`}
            </span>
          </div>
          <button
            onClick={handleRemoveVideo}
            className="text-[11.5px] text-red-300/70 bg-transparent border-none cursor-pointer font-sans hover:text-red-400"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}
