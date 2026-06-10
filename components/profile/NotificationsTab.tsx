import React from 'react'
import { ProfileData } from '@/types'
import { cn } from '@/lib/utils'

interface NotificationsTabProps {
  currState: ProfileData
  handleInputChange: (field: keyof ProfileData, val: any) => void
}

export function NotificationsTab({
  currState,
  handleInputChange,
}: NotificationsTabProps) {
  return (
    <div className="flex flex-col gap-4">
      
      {/* Email Preferences */}
      <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#d4853a]/10 border border-[#d4853a]/20 flex items-center justify-center shrink-0">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-[#e8a44a]">
              <path d="M1.5 3.5l6 4 6-4" stroke="currentColor" strokeWidth="1.1"/>
              <rect x="1.5" y="3.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.1"/>
            </svg>
          </div>
          <h3 className="text-[14.5px] font-semibold text-[#F5F0EA]">Email Notifications</h3>
        </div>
        <p className="text-[12px] text-white/20 mb-4 pl-[42px]">Select which notifications you want to receive via email</p>

        <div className="flex flex-col pl-[42px]">
          <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Cases & Applications</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Receive updates when applications are sent or case milestones are reached</div>
            </div>
            <button
              onClick={() => handleInputChange('emailCases', !currState.emailCases)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.emailCases && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.emailCases ? '21px' : '3px' }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Messages & Chat</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Get emails for unread direct chat messages and discussions</div>
            </div>
            <button
              onClick={() => handleInputChange('emailMessages', !currState.emailMessages)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.emailMessages && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.emailMessages ? '21px' : '3px' }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Weekly Recommendations</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Receive weekly digest on matching legal opportunities and insights</div>
            </div>
            <button
              onClick={() => handleInputChange('emailRecs', !currState.emailRecs)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.emailRecs && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.emailRecs ? '21px' : '3px' }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Marketing & Offers</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Stay updated with Jurify announcements, events, and legal insights</div>
            </div>
            <button
              onClick={() => handleInputChange('emailOffers', !currState.emailOffers)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.emailOffers && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.emailOffers ? '21px' : '3px' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Push preferences */}
      <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-blue-400">
              <path d="M7.5 1.5a5 5 0 015 5v3l1 2H1.5l1-2V6.5a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
              <path d="M6 12.5c0 .8.67 1.5 1.5 1.5s1.5-.67 1.5-1.5" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </div>
          <h3 className="text-[14.5px] font-semibold text-[#F5F0EA]">Web Push Notifications</h3>
        </div>
        <p className="text-[12px] text-white/20 mb-4 pl-[42px]">Receive real-time alerts in your web browser</p>

        <div className="flex flex-col pl-[42px]">
          <div className="flex items-center justify-between py-3">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">Browser push notices</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Show real-time notifications for messages and application alerts on desktop/mobile</div>
            </div>
            <button
              onClick={() => handleInputChange('pushNotifs', !currState.pushNotifs)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.pushNotifs && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.pushNotifs ? '21px' : '3px' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* SMS Preferences */}
      <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center shrink-0">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-[#4ade80]">
              <rect x="3.5" y="1" width="8" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="7.5" cy="11.5" r="0.8" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="text-[14.5px] font-semibold text-[#F5F0EA]">SMS Notifications</h3>
        </div>
        <p className="text-[12px] text-white/20 mb-4 pl-[42px]">Direct text message reminders for urgent cases</p>

        <div className="flex flex-col pl-[42px]">
          <div className="flex items-center justify-between py-3">
            <div className="flex-1 pr-4 min-w-0">
              <div className="text-[13.5px] text-[#F5F0EA] font-normal">SMS reminders</div>
              <div className="text-[11.5px] text-white/20 mt-0.5 leading-[1.5]">Send SMS notices for critical deadlines and consultation appointments</div>
            </div>
            <button
              onClick={() => handleInputChange('smsNotifs', !currState.smsNotifs)}
              className={cn(
                "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
                currState.smsNotifs && "bg-[#d4853a]"
              )}
            >
              <div
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                style={{ left: currState.smsNotifs ? '21px' : '3px' }}
              />
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
