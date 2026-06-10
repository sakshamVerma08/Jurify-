import React from 'react'
import { ProfileData } from '@/types'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

interface SettingsTabProps {
  currState: ProfileData
  handleInputChange: (field: keyof ProfileData, val: any) => void
}

export function SettingsTab({
  currState,
  handleInputChange,
}: SettingsTabProps) {
  const showToast = useUiStore((s) => s.showToast)

  return (
    <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
      
      {/* Appearance */}
      <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="mb-5">
          <h3 className="text-[15px] font-semibold text-[#F5F0EA]">Appearance</h3>
          <p className="text-[12px] text-white/20 mt-0.5">Choose your interface theme</p>
        </div>

        <div className="flex gap-2.5">
          <div
            onClick={() => handleInputChange('theme', 'dark')}
            className={cn(
              "flex-1 rounded-xl p-3 cursor-pointer border-[1.5px] border-transparent transition-all text-center",
              currState.theme === 'dark' ? "border-[#d4853a] bg-[#d4853a]/8" : "hover:border-white/15"
            )}
          >
            <div className="w-full h-9 rounded-[7px] mb-2 bg-gradient-to-br from-[#0a0a09] to-[#1a1a18]" />
            <div className={cn("text-[12px] text-white/50", currState.theme === 'dark' && "text-[#e8a44a]")}>Dark</div>
          </div>
          <div
            onClick={() => handleInputChange('theme', 'light')}
            className={cn(
              "flex-1 rounded-xl p-3 cursor-pointer border-[1.5px] border-transparent transition-all text-center",
              currState.theme === 'light' ? "border-[#d4853a] bg-[#d4853a]/8" : "hover:border-white/15"
            )}
          >
            <div className="w-full h-9 rounded-[7px] mb-2 bg-gradient-to-br from-[#f5f0ea] to-[#e8e0d8]" />
            <div className={cn("text-[12px] text-white/50", currState.theme === 'light' && "text-[#e8a44a]")}>Light</div>
          </div>
          <div
            onClick={() => handleInputChange('theme', 'auto')}
            className={cn(
              "flex-1 rounded-xl p-3 cursor-pointer border-[1.5px] border-transparent transition-all text-center",
              currState.theme === 'auto' ? "border-[#d4853a] bg-[#d4853a]/8" : "hover:border-white/15"
            )}
          >
            <div className="w-full h-9 rounded-[7px] mb-2 bg-[linear-gradient(135deg,#0a0a09_50%,#f5f0ea_50%)]" />
            <div className={cn("text-[12px] text-white/50", currState.theme === 'auto' && "text-[#e8a44a]")}>Auto</div>
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="mb-5">
          <h3 className="text-[15px] font-semibold text-[#F5F0EA]">Language & Region</h3>
          <p className="text-[12px] text-white/20 mt-0.5">Interface language and timezone</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-white/50">Display Language</label>
            <select
              value={currState.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11px] text-[13.5px] text-[#F5F0EA] outline-none cursor-pointer"
            >
              <option value="🌐 English">🌐 English</option>
              <option value="🇮🇳 Hindi — हिंदी">🇮🇳 Hindi — हिंदी</option>
              <option value="Tamil — தமிழ்">Tamil — தமிழ்</option>
              <option value="Telugu — తెలుగు">Telugu — తెలుగు</option>
              <option value="Marathi — मराठी">Marathi — मराठी</option>
              <option value="Bengali — বাংলা">Bengali — বাংলা</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-white/50">Timezone</label>
            <select
              value={currState.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11px] text-[13.5px] text-[#F5F0EA] outline-none cursor-pointer"
            >
              <option value="Asia/Kolkata (IST, UTC+5:30)">Asia/Kolkata (IST, UTC+5:30)</option>
              <option value="Asia/Dubai (GST, UTC+4)">Asia/Dubai (GST, UTC+4)</option>
              <option value="America/New_York (EST, UTC-5)">America/New_York (EST, UTC-5)</option>
              <option value="Europe/London (GMT, UTC+0)">Europe/London (GMT, UTC+0)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="mb-[14px]">
          <h3 className="text-[15px] font-semibold text-[#F5F0EA]">Privacy</h3>
          <p className="text-[12px] text-white/20 mt-0.5">Control what others see</p>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Public profile</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Allow anyone to view your Jurify profile page</div>
            </div>
            <button
              onClick={() => handleInputChange('publicProfile', !currState.publicProfile)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.publicProfile && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.publicProfile ? '21px' : '3px' }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Show contact info</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Display phone/email after case acceptance</div>
            </div>
            <button
              onClick={() => handleInputChange('showContactInfo', !currState.showContactInfo)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.showContactInfo && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.showContactInfo ? '21px' : '3px' }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Show online status</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Let others see when you&apos;re active</div>
            </div>
            <button
              onClick={() => handleInputChange('showOnlineStatus', !currState.showOnlineStatus)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.showOnlineStatus && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.showOnlineStatus ? '21px' : '3px' }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Searchable profile</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Appear in platform search results</div>
            </div>
            <button
              onClick={() => handleInputChange('searchableProfile', !currState.searchableProfile)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.searchableProfile && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.searchableProfile ? '21px' : '3px' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Interface */}
      <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="mb-[14px]">
          <h3 className="text-[15px] font-semibold text-[#F5F0EA]">Interface</h3>
          <p className="text-[12px] text-white/20 mt-0.5">Personalise your experience</p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Compact mode</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Reduce spacing for more content on screen</div>
            </div>
            <button
              onClick={() => handleInputChange('compactMode', !currState.compactMode)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.compactMode && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.compactMode ? '21px' : '3px' }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Keyboard shortcuts</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Enable shortcut keys for quick navigation</div>
            </div>
            <button
              onClick={() => handleInputChange('keyboardShortcuts', !currState.keyboardShortcuts)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.keyboardShortcuts && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.keyboardShortcuts ? '21px' : '3px' }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Animation effects</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Show transitions and micro-animations</div>
            </div>
            <button
              onClick={() => handleInputChange('animationEffects', !currState.animationEffects)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.animationEffects && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.animationEffects ? '21px' : '3px' }}
              />
            </button>
          </div>

          <div className="flex flex-col gap-1.5 mt-3.5">
            <label className="text-[12px] font-medium text-white/50">AI Response Language</label>
            <select
              value={currState.aiResponseLanguage}
              onChange={(e) => handleInputChange('aiResponseLanguage', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-3.5 py-[11px] text-[13.5px] text-[#F5F0EA] outline-none cursor-pointer"
            >
              <option value="Same as display language">Same as display language</option>
              <option value="English only">English only</option>
              <option value="Hindi — hindi">Hindi — हिंदी</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="col-span-2 max-md:col-span-1 border border-red-500/18 bg-red-500/[0.03] rounded-[18px] p-6 transition-colors">
        <div className="mb-[18px]">
          <h3 className="text-[15px] font-semibold text-danger">Danger Zone</h3>
          <p className="text-[12px] text-white/20 mt-0.5">Irreversible actions — proceed with caution</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4 p-3.5 bg-red-500/[0.05] border border-red-500/[0.12] rounded-xl flex-wrap">
            <div>
              <div className="text-[13.5px] font-medium text-[#F5F0EA]">Deactivate Account</div>
              <div className="text-[12px] text-white/20 mt-0.5">Temporarily hide your profile. You can reactivate anytime.</div>
            </div>
            <button
              onClick={() => showToast('Deactivation confirmation sent to email', 'info')}
              className="font-sans text-[12.5px] font-medium text-warn bg-[#f0b840]/8 border border-[#f0b840]/20 rounded-lg py-2 px-4.5 cursor-pointer transition-all hover:bg-[#f0b840]/14 hover:text-[#f0b840]"
            >
              Deactivate
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 p-3.5 bg-red-500/[0.05] border border-red-500/[0.12] rounded-xl flex-wrap">
            <div>
              <div className="text-[13.5px] font-medium text-danger">Delete Account</div>
              <div className="text-[12px] text-white/20 mt-0.5">Permanently delete your account and all associated data. This cannot be undone.</div>
            </div>
            <button
              onClick={() => showToast('Please contact legal@jurify.in to delete your account', 'info')}
              className="font-sans text-[12.5px] font-medium text-danger bg-danger/10 border border-danger/25 rounded-lg py-2 px-4.5 cursor-pointer transition-all hover:bg-danger/20 hover:text-white"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
