'use client'

import { ADMIN_STATS, ADMIN_GROWTH, ADMIN_DISTRIBUTION, ADMIN_ACTIVITIES } from '@/lib/data/admin'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

export function OverviewPanel() {
  const showToast = useUiStore((s) => s.showToast)

  // Donut SVG circumference math
  // radius = 35, circumference = 2 * Math.PI * 35 = 219.91
  const circumference = 219.91
  let accumulatedPct = 0

  return (
    <div className="flex-1 flex flex-col gap-6 animate-fade-up">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3.5">
        <div>
          <div className="font-serif text-3xl font-light tracking-[-0.4px] mb-1">
            Platform <em className="italic text-o2">Overview</em>
          </div>
          <div className="text-xs text-[var(--td)]">Real-time metrics and activity · Last updated just now</div>
        </div>
        <div className="flex gap-2 items-center">
          <button 
            className="flex items-center gap-2.5 font-sans text-xs font-semibold text-[var(--t)] bg-white/[0.05] border border-white/[0.12] rounded-[9px] px-4 py-2 cursor-pointer transition-all hover:bg-white/[0.09] hover:border-white/20" 
            onClick={() => showToast('Report exported', 'ok')}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v8M3.5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.5 10v2h10v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-4 gap-3.5 mb-[22px]">
        <div className="bg-card border border-white/[0.08] rounded-[14px] px-5 py-[18px] transition-colors duration-200 cursor-default hover:border-white/[0.13] dash-card-in dash-card-in-1">
          <div className="flex items-start justify-between mb-3">
            <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 bg-og/12 border border-og/22">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="5" r="2.5" stroke="#D4853A" strokeWidth="1.1"/>
                <path d="M2 13c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="#D4853A" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-[11px] px-1.75 py-0.5 rounded-[20px] flex items-center gap-0.75 bg-[#4ade80]/10 text-success">↑ {ADMIN_STATS.totalUsersChange}</div>
          </div>
          <div className="text-[26px] font-bold text-[var(--t)] leading-none mb-0.75 font-sans">{ADMIN_STATS.totalUsers.toLocaleString()}</div>
          <div className="text-[11.5px] text-[var(--td)]">Total Users</div>
        </div>

        <div className="bg-card border border-white/[0.08] rounded-[14px] px-5 py-[18px] transition-colors duration-200 cursor-default hover:border-white/[0.13] dash-card-in dash-card-in-2">
          <div className="flex items-start justify-between mb-3">
            <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 bg-info/10 border border-info/20">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1.5L3 4v3.5c0 2.8 2 4.5 4.5 5 2.5-.5 4.5-2.2 4.5-5V4L7.5 1.5z" stroke="rgba(140,180,255,.9)" strokeWidth="1.1" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-[11px] px-1.75 py-0.5 rounded-[20px] flex items-center gap-0.75 bg-[#4ade80]/10 text-success">↑ {ADMIN_STATS.verifiedLawyersChange}</div>
          </div>
          <div className="text-[26px] font-bold text-[var(--t)] leading-none mb-0.75 font-sans">{ADMIN_STATS.verifiedLawyers.toLocaleString()}</div>
          <div className="text-[11.5px] text-[var(--td)]">Verified Lawyers</div>
        </div>

        <div className="bg-card border border-white/[0.08] rounded-[14px] px-5 py-[18px] transition-colors duration-200 cursor-default hover:border-white/[0.13] dash-card-in dash-card-in-3">
          <div className="flex items-start justify-between mb-3">
            <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 bg-[#4ade80]/10 border border-[#4ade80]/20">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="1.5" y="1.5" width="12" height="12" rx="1.5" stroke="#4ade80" strokeWidth="1.1"/>
              </svg>
            </div>
            <div className="text-[11px] px-1.75 py-0.5 rounded-[20px] flex items-center gap-0.75 bg-[#4ade80]/10 text-success">↑ {ADMIN_STATS.totalCasesChange}</div>
          </div>
          <div className="text-[26px] font-bold text-[var(--t)] leading-none mb-0.75 font-sans">{ADMIN_STATS.totalCases.toLocaleString()}</div>
          <div className="text-[11.5px] text-[var(--td)]">Total Cases</div>
        </div>

        <div className="bg-card border border-white/[0.08] rounded-[14px] px-5 py-[18px] transition-colors duration-200 cursor-default hover:border-white/[0.13] dash-card-in dash-card-in-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 bg-[#f06464]/10 border border-[#f06464]/20">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="var(--danger)" strokeWidth="1.1"/>
                <line x1="7.5" y1="5" x2="7.5" y2="7.5" stroke="var(--danger)" strokeWidth="1.1" strokeLinecap="round"/>
                <circle cx="7.5" cy="9.5" r=".6" fill="var(--danger)"/>
              </svg>
            </div>
            <div className="text-[11px] px-1.75 py-0.5 rounded-[20px] flex items-center gap-0.75 bg-[#4ade80]/10 text-success">↑ {ADMIN_STATS.activeSessionsChange}</div>
          </div>
          <div className="text-[26px] font-bold text-[var(--t)] leading-none mb-0.75 font-sans">{ADMIN_STATS.activeSessions.toLocaleString()}</div>
          <div className="text-[11.5px] text-[var(--td)]">Active Sessions</div>
        </div>
      </div>

      {/* Chart Rows */}
      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-5">
        {/* User Growth Column Chart */}
        <div className="bg-card border border-white/7 rounded-[14px] px-5.5 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-[var(--t)]">User Growth</div>
              <div className="text-[11px] text-[var(--td)] mt-0.5">New registrations per month · 2026</div>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-[120px]" id="userGrowthChart">
            {(() => {
              const maxGrowth = Math.max(...ADMIN_GROWTH.map((g) => g.value))
              const colors = [
                'rgba(212,133,58,0.35)',
                'rgba(212,133,58,0.4)',
                'rgba(212,133,58,0.45)',
                'rgba(212,133,58,0.6)',
                'rgba(212,133,58,0.75)',
                'rgba(212,133,58,0.9)'
              ]
              return ADMIN_GROWTH.map((item, i) => {
                const valStr = item.value >= 1000 ? (item.value / 1000).toFixed(1) + 'k' : item.value.toString()
                const heightPx = Math.round((item.value / maxGrowth) * 100)
                return (
                  <div key={item.month} className="flex flex-col items-center gap-1 flex-1">
                    <div className="text-[9px] text-[var(--td)]">{valStr}</div>
                    <div 
                      className="rounded-t-[4px] w-full transition-all duration-1000 ease-[cubic-bezier(0.34,1.2,0.64,1)] hover:opacity-80 cursor-pointer" 
                      style={{ 
                        height: `${heightPx}px`,
                        backgroundColor: colors[i % colors.length]
                      }}
                      title={`${item.month}: ${item.value} users`}
                    />
                  </div>
                )
              })
            })()}
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-[var(--td)] px-2">
            {ADMIN_GROWTH.map((item) => (
              <span key={item.month}>{item.month}</span>
            ))}
          </div>
        </div>

        {/* Case Activity Donut Chart */}
        <div className="bg-card border border-white/7 rounded-[14px] px-5.5 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-[var(--t)]">Case Activity</div>
              <div className="text-[11px] text-[var(--td)] mt-0.5">Distribution by type</div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <svg id="overviewDonut" width="100" height="100" viewBox="0 0 100 100">
              {(() => {
                const r = 38
                const sw = 16
                const circ = 2 * Math.PI * r // 238.761
                let accumulatedOffset = 0
                return ADMIN_DISTRIBUTION.map((seg) => {
                  const dash = (seg.pct / 100) * circ
                  const strokeOffset = -accumulatedOffset
                  accumulatedOffset += dash
                  return (
                    <circle
                      key={seg.label}
                      cx="50"
                      cy="50"
                      r={r}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth={sw}
                      strokeDasharray={`${dash} ${circ - dash}`}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                  )
                })
              })()}
            </svg>
            <div className="flex flex-col gap-1.75 flex-1" id="overviewLegend">
              {ADMIN_DISTRIBUTION.map((seg) => (
                <div key={seg.label} className="flex items-center justify-between text-xs text-[var(--tm)]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
                    <span>{seg.label}</span>
                  </div>
                  <strong className="text-[var(--t)]">{seg.pct}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-card border border-white/7 rounded-[14px] px-5 py-4.5 mb-0">
        <div className="flex items-center justify-between mb-3.5">
          <div className="text-sm font-semibold text-[var(--t)]">Recent Activity</div>
          <div style={{ fontSize: '12px', color: 'var(--td)' }}>Live feed</div>
        </div>
        <div className="flex flex-col" id="activityFeed">
          {ADMIN_ACTIVITIES.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-b-0">
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                activity.icon === 'verify' && "bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.2)]",
                activity.icon === 'case' && "bg-[rgba(212,133,58,0.1)] border border-[rgba(212,133,58,0.2)]",
                activity.icon === 'user' && "bg-[rgba(100,150,255,0.1)] border border-[rgba(100,150,255,0.2)]",
                activity.icon === 'alert' && "bg-[rgba(240,100,100,0.1)] border border-[rgba(240,100,100,0.2)]",
                activity.icon === 'blog' && "bg-[rgba(180,100,255,0.1)] border border-[rgba(180,100,255,0.2)]"
              )}>
                {activity.icon === 'verify' && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1.5L2.5 3v3c0 2 1.5 3.5 3.5 4 2-.5 3.5-2 3.5-4V3L6 1.5z" stroke="#4ade80" strokeWidth="1" strokeLinejoin="round"/>
                    <path d="M4.5 5.5l1 1L8 4.5" stroke="#4ade80" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {activity.icon === 'case' && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="#D4853A" strokeWidth="1"/>
                  </svg>
                )}
                {activity.icon === 'user' && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="4" r="2" stroke="rgba(100,150,255,0.9)" strokeWidth="1"/>
                    <path d="M2.5 10.5c0-1.8 1.5-3 3.5-3s3.5 1.2 3.5 3" stroke="rgba(100,150,255,0.9)" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                )}
                {activity.icon === 'alert' && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2l4.5 8H1.5L6 2z" stroke="var(--danger)" strokeWidth="1" strokeLinejoin="round"/>
                    <line x1="6" y1="5" x2="6" y2="7.5" stroke="var(--danger)" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                )}
                {activity.icon === 'blog' && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 8.5l1-3L9 1.5l2 2-6 6-3 1z" stroke="rgba(200,140,255,.9)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div 
                className="flex-1 min-w-0 text-[12.5px] text-[var(--tm)] leading-[1.4]" 
                dangerouslySetInnerHTML={{ __html: activity.text }}
              />
              <div className="text-[11px] text-[var(--td)] shrink-0 white-space-nowrap">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
