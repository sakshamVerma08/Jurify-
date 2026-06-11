import React, { useState } from 'react'
import { ProfileData } from '@/types'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

interface SecurityTabProps {
  currState: ProfileData
  setCurrState: React.Dispatch<React.SetStateAction<ProfileData>>
  setCleanState: React.Dispatch<React.SetStateAction<ProfileData>>
}

export function SecurityTab({
  currState,
  setCurrState,
  setCleanState,
}: SecurityTabProps) {
  const showToast = useUiStore((s) => s.showToast)

  // Password fields state (treated separately from the global profile save to run standalone updates)
  const [passwordState, setPasswordState] = useState({
    curPw: '',
    newPw: '',
    confPw: '',
  })
  const [showCurPw, setShowCurPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfPw, setShowConfPw] = useState(false)

  // Password strength meter
  const getPasswordStrength = (password: string) => {
    if (!password) return { pct: 0, label: '', color: 'bg-transparent' }
    let score = 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    if (score <= 1) return { pct: 25, label: 'Weak', color: 'bg-danger shadow-[0_0_8px_rgba(240,100,100,0.5)]' }
    if (score === 2) return { pct: 50, label: 'Fair', color: 'bg-warn shadow-[0_0_8px_rgba(240,184,64,0.5)]' }
    if (score === 3) return { pct: 75, label: 'Good', color: 'bg-og shadow-[0_0_8px_rgba(212,133,58,0.5)]' }
    return { pct: 100, label: 'Strong', color: 'bg-success shadow-[0_0_8px_rgba(74,222,128,0.5)]' }
  }

  const pwStrength = getPasswordStrength(passwordState.newPw)

  // Password save
  const handleUpdatePassword = () => {
    if (!passwordState.curPw) {
      showToast('Please enter your current password', 'err')
      return
    }
    if (passwordState.newPw.length < 8) {
      showToast('New password must be at least 8 characters long', 'err')
      return
    }
    if (passwordState.newPw !== passwordState.confPw) {
      showToast('Passwords do not match', 'err')
      return
    }
    // Success simulation
    showToast('Password updated successfully', 'ok')
    setPasswordState({ curPw: '', newPw: '', confPw: '' })
  }

  // 2FA state switch
  const handleTfaToggle = () => {
    const newVal = !currState.tfaEnabled
    setCurrState((prev) => ({ ...prev, tfaEnabled: newVal }))
    showToast(newVal ? '2FA Enabled setup' : '2FA Disabled', newVal ? 'ok' : 'info')
  }

  // Revoke session immediately
  const handleRevokeSession = (id: string) => {
    const updatedSessions = currState.sessions.filter((s) => s.id !== id)
    setCurrState((prev) => ({ ...prev, sessions: updatedSessions }))
    // Sync clean state so it doesn't trigger unsaved banner
    setCleanState((prev) => ({
      ...prev,
      sessions: prev.sessions.filter((s) => s.id !== id),
    }))
    showToast('Session revoked successfully', 'ok')
  }

  return (
    <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 items-start">
      
      {/* Change Password */}
      <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="mb-4.5">
          <h3 className="text-[15px] font-semibold text-[#F5F0EA] flex items-center gap-2">
            <svg className="opacity-60" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2.5" y="7.5" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5 7.5V5a3 3 0 016 0v2.5" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            Change Password
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <input
              type={showCurPw ? "text" : "password"}
              placeholder="Current password"
              value={passwordState.curPw}
              onChange={(e) => setPasswordState((prev) => ({ ...prev, curPw: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-4 pr-11 py-2.75 text-[13.5px] text-[#F5F0EA] outline-none focus:border-[#d4853a]/45 focus:ring-3 focus:ring-[#d4853a]/9"
            />
            <button
              type="button"
              onClick={() => setShowCurPw(!showCurPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#F5F0EA]/20 hover:text-[#F5F0EA]/50 transition-colors cursor-pointer p-1"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <ellipse cx="7.5" cy="7.5" rx="5.5" ry="3.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
            </button>
          </div>

          <div className="relative">
            <input
              type={showNewPw ? "text" : "password"}
              placeholder="New password (min. 8 characters)"
              value={passwordState.newPw}
              onChange={(e) => setPasswordState((prev) => ({ ...prev, newPw: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-4 pr-11 py-2.75 text-[13.5px] text-[#F5F0EA] outline-none focus:border-[#d4853a]/45 focus:ring-3 focus:ring-[#d4853a]/9"
            />
            <button
              type="button"
              onClick={() => setShowNewPw(!showNewPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#F5F0EA]/20 hover:text-[#F5F0EA]/50 transition-colors cursor-pointer p-1"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <ellipse cx="7.5" cy="7.5" rx="5.5" ry="3.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
            </button>
          </div>

          {/* Strength Meter */}
          {passwordState.newPw && (
            <div>
              <div className="h-[3px] bg-white/[0.07] rounded-[2px] overflow-hidden">
                <div
                  className={cn("h-full transition-all duration-300 rounded-[2px]", pwStrength.color)}
                  style={{ width: `${pwStrength.pct}%` }}
                />
              </div>
              <div className="text-[10.5px] text-white/50 mt-1">
                Password strength: <strong className="text-[#F5F0EA]">{pwStrength.label}</strong>
              </div>
            </div>
          )}

          <div className="relative">
            <input
              type={showConfPw ? "text" : "password"}
              placeholder="Confirm new password"
              value={passwordState.confPw}
              onChange={(e) => setPasswordState((prev) => ({ ...prev, confPw: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-4 pr-11 py-2.75 text-[13.5px] text-[#F5F0EA] outline-none focus:border-[#d4853a]/45 focus:ring-3 focus:ring-[#d4853a]/9"
            />
            <button
              type="button"
              onClick={() => setShowConfPw(!showConfPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#F5F0EA]/20 hover:text-[#F5F0EA]/50 transition-colors cursor-pointer p-1"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <ellipse cx="7.5" cy="7.5" rx="5.5" ry="3.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
            </button>
          </div>

          <button
            onClick={handleUpdatePassword}
            className="font-sans text-[13.5px] font-medium bg-gradient-to-br from-[#d4853a] to-[#b8521e] text-white border-none rounded-xl py-3 px-7 cursor-pointer shadow-[0_4px_16px_rgba(200,98,42,0.26)] transition-all hover:opacity-92 hover:-translate-y-[1px] mt-2 text-center"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="flex items-center justify-between mb-[18px] flex-wrap gap-2">
          <h3 className="text-[15px] font-semibold text-[#F5F0EA] flex items-center gap-2">
            <svg className="opacity-60" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L3 4v4.5c0 3 2.2 5.2 5 6 2.8-.8 5-3 5-6V4L8 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
            Two-Factor Authentication
          </h3>
          <span className={cn(
            "text-[10.5px] px-2.5 py-[3px] rounded-[20px] font-medium",
            currState.tfaEnabled
              ? "bg-[#4ade80]/10 border border-[#4ade80]/22 text-[#4ade80]"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          )}>
            {currState.tfaEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        {/* Toggle TFA */}
        <div className="flex items-center justify-between py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4.5 mb-4.5">
          <div>
            <div className="text-[13.5px] font-medium">Use Authenticator App</div>
            <div className="text-[11.5px] text-white/20 mt-0.5">Secure your account using TOTP codes</div>
          </div>
          <button
            onClick={handleTfaToggle}
            className={cn(
              "w-10 h-[22px] rounded-[11px] bg-white/10 relative cursor-pointer transition-colors shrink-0",
              currState.tfaEnabled && "bg-[#d4853a]"
            )}
          >
            <div
              className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
              style={{ left: currState.tfaEnabled ? '21px' : '3px' }}
            />
          </button>
        </div>

        {/* Setup QR & Steps if enabled */}
        {currState.tfaEnabled && (
          <div className="grid grid-cols-[auto_1fr] gap-7 max-sm:grid-cols-1 items-start bg-white/[0.01] border border-white/[0.04] p-4.5 rounded-xl animate-fade-in duration-300">
            <div className="w-[140px] h-[140px] rounded-xl bg-white flex items-center justify-center border border-white/10 shrink-0 p-2 mx-auto">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="#fff"/>
                <rect x="5" y="5" width="25" height="25" fill="#000"/>
                <rect x="10" y="10" width="15" height="15" fill="#fff"/>
                <rect x="13" y="13" width="9" height="9" fill="#000"/>
                
                <rect x="70" y="5" width="25" height="25" fill="#000"/>
                <rect x="75" y="10" width="15" height="15" fill="#fff"/>
                <rect x="78" y="13" width="9" height="9" fill="#000"/>

                <rect x="5" y="70" width="25" height="25" fill="#000"/>
                <rect x="10" y="75" width="15" height="15" fill="#fff"/>
                <rect x="13" y="78" width="9" height="9" fill="#000"/>

                {/* Small QR dots */}
                <rect x="35" y="10" width="5" height="5" fill="#000"/>
                <rect x="45" y="5" width="10" height="5" fill="#000"/>
                <rect x="40" y="20" width="5" height="10" fill="#000"/>
                <rect x="55" y="15" width="5" height="5" fill="#000"/>
                <rect x="60" y="25" width="5" height="5" fill="#000"/>

                <rect x="5" y="35" width="5" height="10" fill="#000"/>
                <rect x="15" y="45" width="10" height="5" fill="#000"/>
                <rect x="25" y="35" width="5" height="5" fill="#000"/>
                
                <rect x="35" y="35" width="15" height="15" fill="#000"/>
                <rect x="40" y="40" width="5" height="5" fill="#fff"/>
                <rect x="55" y="40" width="10" height="10" fill="#000"/>
                <rect x="45" y="55" width="5" height="5" fill="#000"/>
                <rect x="35" y="60" width="10" height="5" fill="#000"/>

                <rect x="70" y="35" width="5" height="15" fill="#000"/>
                <rect x="85" y="40" width="10" height="5" fill="#000"/>
                <rect x="80" y="50" width="5" height="10" fill="#000"/>

                <rect x="35" y="75" width="5" height="15" fill="#000"/>
                <rect x="45" y="85" width="15" height="5" fill="#000"/>
                <rect x="55" y="70" width="5" height="10" fill="#000"/>
                <rect x="65" y="80" width="15" height="15" fill="#000"/>
                <rect x="70" y="85" width="5" height="5" fill="#fff"/>

                <rect x="80" y="70" width="15" height="5" fill="#000"/>
                <rect x="90" y="80" width="5" height="15" fill="#000"/>
              </svg>
            </div>
            <div>
              <div className="flex flex-col gap-2 mb-3.5">
                <div className="flex items-start gap-[9px] text-[12.5px] text-white/50 leading-[1.5]">
                  <div className="w-5 h-5 rounded-full bg-[#d4853a]/15 border border-[#d4853a]/30 flex items-center justify-center text-[10px] font-semibold text-[#d4853a] shrink-0 mt-[1px]">1</div>
                  <div>Scan the QR code with Google Authenticator or Microsoft Authenticator.</div>
                </div>
                <div className="flex items-start gap-[9px] text-[12.5px] text-white/50 leading-[1.5]">
                  <div className="w-5 h-5 rounded-full bg-[#d4853a]/15 border border-[#d4853a]/30 flex items-center justify-center text-[10px] font-semibold text-[#d4853a] shrink-0 mt-[1px]">2</div>
                  <div>Enter the generated 6-digit verification code to pair device.</div>
                </div>
              </div>
              <div className="text-[11px] text-[#e8a44a]/80 mb-2 font-medium">Backup Codes (Click to copy)</div>
              <div className="grid grid-cols-4 gap-1.75 mb-3.5 max-sm:grid-cols-2">
                {['4921-8201', '3912-7491', '1092-4820', '9028-1123'].map((code) => (
                  <div
                    key={code}
                    onClick={() => {
                      navigator.clipboard.writeText(code)
                      showToast(`Copied ${code}`, 'ok')
                    }}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-lg p-2 text-center text-[11.5px] text-white/50 font-mono tracking-[0.5px] transition-colors cursor-pointer select-all hover:bg-white/[0.07] hover:text-[#F5F0EA]"
                  >
                    {code}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="col-span-2 max-md:col-span-1 bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="mb-4">
          <h3 className="text-[15px] font-semibold text-[#F5F0EA]">Active Sessions</h3>
          <p className="text-[12px] text-white/20 mt-0.5">Devices currently logged into your account</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState.sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "flex items-center justify-between gap-3 p-3 bg-white/[0.03] border border-white/[0.07] rounded-xl transition-all",
                session.current && "border-success/22 bg-success/4"
              )}
            >
              <div className="w-[34px] h-[34px] rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="opacity-70">
                  {session.device.includes('iPhone') ? (
                    <rect x="3.5" y="1" width="8" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  ) : (
                    <>
                      <rect x="1.5" y="2" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                      <line x1="1" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.2"/>
                    </>
                  )}
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[#F5F0EA] flex items-center gap-2">
                  {session.device}
                  {session.current && (
                    <span className="text-[9.5px] bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-[20px] px-2 py-[1px] text-[#4ade80] font-normal">
                      Current Session
                    </span>
                  )}
                </div>
                <div className="text-[11.5px] text-white/20 mt-0.5 truncate">
                  IP: {session.ip} · Location: {session.location}
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => handleRevokeSession(session.id)}
                  className="text-[11.5px] text-red-300 bg-red-950/20 border border-red-500/20 rounded-[7px] px-3 py-1 cursor-pointer transition-all hover:bg-red-500/15 hover:text-red-400"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Login History */}
      <div className="col-span-2 max-md:col-span-1 bg-[#0e0d0b] border border-white/[0.07] rounded-[18px] p-6 transition-colors">
        <div className="mb-4">
          <h3 className="text-[15px] font-semibold text-[#F5F0EA]">Login History</h3>
          <p className="text-[12px] text-white/20 mt-0.5">Recent authentication logs</p>
        </div>

        <div className="flex flex-col gap-1.5 max-h-[240px] overflow-y-auto pr-1">
          {[
            { status: 'success', device: 'Chrome on Windows 11', ip: '103.88.22.14', date: '09 Jun 2026, 06:14 AM' },
            { status: 'success', device: 'Safari on iPhone 15 Pro', ip: '103.88.22.89', date: '08 Jun 2026, 11:45 PM' },
            { status: 'fail', device: 'Firefox on Windows', ip: '120.91.45.67', date: '07 Jun 2026, 02:10 PM', reason: 'Invalid OTP' },
            { status: 'success', device: 'MacBook Pro 16', ip: '103.88.22.14', date: '05 Jun 2026, 09:30 AM' },
          ].map((log, index) => (
            <div key={index} className="flex items-center gap-3 p-2.5 rounded-lg transition-colors hover:bg-white/[0.03]">
              <div className={cn(
                "w-2 h-2 rounded-full shrink-0",
                log.status === 'success' ? "bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.5)]" : "bg-danger shadow-[0_0_6px_rgba(240,100,100,0.5)]"
              )} />
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] text-[#F5F0EA]/80 font-medium">
                  {log.device}
                </div>
                <div className="text-[11px] text-white/20 mt-0.5">
                  IP: {log.ip} {log.reason && `· Failed due to: ${log.reason}`}
                </div>
              </div>
              <div className="text-[11px] text-white/20 shrink-0 self-start mt-0.5">{log.date}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
