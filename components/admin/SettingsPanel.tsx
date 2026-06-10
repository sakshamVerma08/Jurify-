'use client'

import { useState } from 'react'
import { useAdminStore } from '@/stores/adminStore'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

export function SettingsPanel() {
  const addAuditLog = useAdminStore((s) => s.addAuditLog)
  const showToast = useUiStore((s) => s.showToast)

  // Local state for Platform Identity forms
  const [platformName, setPlatformName] = useState('Jurify')
  const [supportEmail, setSupportEmail] = useState('support@jurify.in')
  const [legalEntity, setLegalEntity] = useState('Jurify Technologies Pvt. Ltd.')

  // Local state for toggles
  const [aiAssistant, setAiAssistant] = useState(true)
  const [proBono, setProBono] = useState(true)
  const [blogActive, setBlogActive] = useState(true)
  const [newReg, setNewReg] = useState(true)
  const [mMode, setMMode] = useState(false)

  // KYC details state
  const [slaDays, setSlaDays] = useState(3)
  const [autoNotify, setAutoNotify] = useState(true)
  const [manualReview, setManualReview] = useState(true)

  // Moderation state
  const [blogApproval, setBlogApproval] = useState(true)
  const [autoFlag, setAutoFlag] = useState(true)
  const [emailAdmin, setEmailAdmin] = useState(true)
  const [maxCases, setMaxCases] = useState(5)

  const handleSavePlatform = (e: React.FormEvent) => {
    e.preventDefault()
    addAuditLog('system', `Platform Identity updated: name="${platformName}", email="${supportEmail}"`)
    showToast('Platform identity settings saved', 'ok')
  }

  const handleSaveKyc = () => {
    addAuditLog('system', `KYC workflow configurations updated: SLA=${slaDays} days, manualReview=${manualReview}`)
    showToast('KYC settings saved successfully', 'ok')
  }

  const handleToggle = (flagName: string, value: boolean, setter: (v: boolean) => void) => {
    const nextVal = !value
    setter(nextVal)
    addAuditLog('system', `Feature flag updated: <strong>${flagName}</strong> set to ${nextVal ? 'ON' : 'OFF'}`)
    showToast(`${flagName} set to ${nextVal ? 'enabled' : 'disabled'}`, 'info')
  }

  return (
    <div className="flex-1 flex flex-col gap-6 animate-fade-up">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3.5">
        <div>
          <div className="font-serif text-3xl font-light tracking-[-0.4px] mb-1">Platform <em>Settings</em></div>
          <div className="text-xs text-[var(--td)]">Configure Jurify's platform-wide behaviour</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Platform Identity Card */}
        <form className="bg-card border border-white/[0.07] rounded-[14px] p-5" onSubmit={handleSavePlatform}>
          <div className="text-sm font-semibold text-[var(--t)] mb-1">Platform Identity</div>
          <div className="text-[11.5px] text-[var(--td)] mb-4">Brand and display settings</div>
          
          <div className="flex flex-col gap-1.5 mb-3.5">
            <label className="text-xs font-medium text-[var(--tm)]">Platform Name</label>
            <input 
              className="bg-white/[0.04] border border-white/[0.09] rounded-[9px] px-[13px] py-[10px] text-[13px] text-[var(--t)] font-sans outline-none w-full transition-colors duration-180 focus:border-og/40" 
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-3.5">
            <label className="text-xs font-medium text-[var(--tm)]">Support Email</label>
            <input 
              className="bg-white/[0.04] border border-white/[0.09] rounded-[9px] px-[13px] py-[10px] text-[13px] text-[var(--t)] font-sans outline-none w-full transition-colors duration-180 focus:border-og/40" 
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-3.5">
            <label className="text-xs font-medium text-[var(--tm)]">Legal Entity</label>
            <input 
              className="bg-white/[0.04] border border-white/[0.09] rounded-[9px] px-[13px] py-[10px] text-[13px] text-[var(--t)] font-sans outline-none w-full transition-colors duration-180 focus:border-og/40" 
              value={legalEntity}
              onChange={(e) => setLegalEntity(e.target.value)}
            />
          </div>
          
          <button type="submit" className="bg-gradient-to-br from-og to-[#b8521e] text-white rounded-[10px] px-7 py-3 shadow-[0_4px_16px_rgba(200,98,42,0.25)] transition-all hover:opacity-92 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.75 mt-2 font-medium font-sans text-[13.5px] cursor-pointer border-none">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 10V4l2-2h5l2 2v6H2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
            </svg>
            Save Changes
          </button>
        </form>

        {/* Feature Flags Card */}
        <div className="bg-card border border-white/[0.07] rounded-[14px] p-5">
          <div className="text-sm font-semibold text-[var(--t)] mb-1">Feature Flags</div>
          <div className="text-[11.5px] text-[var(--td)] mb-4">Enable or disable platform features</div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-b-0">
            <div>
              <div className="text-[13px] text-[var(--t)]">AI Assistant</div>
              <div className="text-[11px] text-[var(--td)] mt-0.5">Enable AI legal assistant for all users</div>
            </div>
            <div 
              className={cn("w-9 h-5 rounded-[10px] bg-white/10 relative cursor-pointer transition-colors duration-220 shrink-0", aiAssistant && "bg-og")}
              onClick={() => handleToggle('AI Assistant', aiAssistant, setAiAssistant)}
            >
              <div className={cn("absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all duration-220 shadow-[0_1px_3px_rgba(0,0,0,0.4)]", aiAssistant && "left-[19px]")} />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-b-0">
            <div>
              <div className="text-[13px] text-[var(--t)]">Pro Bono Board</div>
              <div className="text-[11px] text-[var(--td)] mt-0.5">Show public pro bono case listings</div>
            </div>
            <div 
              className={cn("w-9 h-5 rounded-[10px] bg-white/10 relative cursor-pointer transition-colors duration-220 shrink-0", proBono && "bg-og")}
              onClick={() => handleToggle('Pro Bono Board', proBono, setProBono)}
            >
              <div className={cn("absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all duration-220 shadow-[0_1px_3px_rgba(0,0,0,0.4)]", proBono && "left-[19px]")} />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-b-0">
            <div>
              <div className="text-[13px] text-[var(--t)]">Insights / Blog</div>
              <div className="text-[11px] text-[var(--td)] mt-0.5">Allow lawyers to publish articles</div>
            </div>
            <div 
              className={cn("w-9 h-5 rounded-[10px] bg-white/10 relative cursor-pointer transition-colors duration-220 shrink-0", blogActive && "bg-og")}
              onClick={() => handleToggle('Insights / Blog', blogActive, setBlogActive)}
            >
              <div className={cn("absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all duration-220 shadow-[0_1px_3px_rgba(0,0,0,0.4)]", blogActive && "left-[19px]")} />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-b-0">
            <div>
              <div className="text-[13px] text-[var(--t)]">New Registrations</div>
              <div className="text-[11px] text-[var(--td)] mt-0.5">Allow new users to register</div>
            </div>
            <div 
              className={cn("w-9 h-5 rounded-[10px] bg-white/10 relative cursor-pointer transition-colors duration-220 shrink-0", newReg && "bg-og")}
              onClick={() => handleToggle('New Registrations', newReg, setNewReg)}
            >
              <div className={cn("absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all duration-220 shadow-[0_1px_3px_rgba(0,0,0,0.4)]", newReg && "left-[19px]")} />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-b-0">
            <div>
              <div className="text-[13px] text-[var(--t)]">Maintenance Mode</div>
              <div className="text-[11px] text-[var(--td)] mt-0.5">Show maintenance banner to all users</div>
            </div>
            <div 
              className={cn("w-9 h-5 rounded-[10px] bg-white/10 relative cursor-pointer transition-colors duration-220 shrink-0", mMode && "bg-og")}
              onClick={() => handleToggle('Maintenance Mode', mMode, setMMode)}
            >
              <div className={cn("absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all duration-220 shadow-[0_1px_3px_rgba(0,0,0,0.4)]", mMode && "left-[19px]")} />
            </div>
          </div>
        </div>

        {/* KYC & Verification Card */}
        <div className="bg-card border border-white/[0.07] rounded-[14px] p-5">
          <div className="text-sm font-semibold text-[var(--t)] mb-1">KYC &amp; Verification</div>
          <div className="text-[11.5px] text-[var(--td)] mb-4">Verification workflow settings</div>
          
          <div className="flex flex-col gap-1.5 mb-3.5">
            <label className="text-xs font-medium text-[var(--tm)]">KYC Processing SLA (days)</label>
            <input 
              className="bg-white/[0.04] border border-white/[0.09] rounded-[9px] px-[13px] py-[10px] text-[13px] text-[var(--t)] font-sans outline-none w-full transition-colors duration-180 focus:border-og/40" 
              type="number" 
              value={slaDays}
              onChange={(e) => setSlaDays(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-3.5">
            <label className="text-xs font-medium text-[var(--tm)]">Required Documents</label>
            <select className="bg-white/[0.04] border border-white/[0.09] rounded-[9px] px-[13px] py-[10px] text-[13px] text-[var(--t)] font-sans outline-none w-full transition-colors duration-180 focus:border-og/40 opacity-70 cursor-not-allowed" disabled>
              <option className="bg-[#151515]">Aadhaar + PAN + Bar Certificate (required)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-b-0">
            <div>
              <div className="text-[13px] text-[var(--t)]">Auto-notify on KYC decision</div>
            </div>
            <div 
              className={cn("w-9 h-5 rounded-[10px] bg-white/10 relative cursor-pointer transition-colors duration-220 shrink-0", autoNotify && "bg-og")}
              onClick={() => handleToggle('Auto-notify on KYC', autoNotify, setAutoNotify)}
            >
              <div className={cn("absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all duration-220 shadow-[0_1px_3px_rgba(0,0,0,0.4)]", autoNotify && "left-[19px]")} />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-b-0">
            <div>
              <div className="text-[13px] text-[var(--t)]">Manual review required</div>
              <div className="text-[11px] text-[var(--td)] mt-0.5">Disable to allow auto-approval (not recommended)</div>
            </div>
            <div 
              className={cn("w-9 h-5 rounded-[10px] bg-white/10 relative cursor-pointer transition-colors duration-220 shrink-0", manualReview && "bg-og")}
              onClick={() => handleToggle('Manual review required', manualReview, setManualReview)}
            >
              <div className={cn("absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all duration-220 shadow-[0_1px_3px_rgba(0,0,0,0.4)]", manualReview && "left-[19px]")} />
            </div>
          </div>
          
          <button className="bg-gradient-to-br from-og to-[#b8521e] text-white rounded-[10px] px-7 py-3 shadow-[0_4px_16px_rgba(200,98,42,0.25)] transition-all hover:opacity-92 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.75 mt-2 font-medium font-sans text-[13.5px] cursor-pointer border-none" onClick={handleSaveKyc}>Save Settings</button>
        </div>

        {/* Moderation Card */}
        <div className="bg-card border border-white/[0.07] rounded-[14px] p-5">
          <div className="text-sm font-semibold text-[var(--t)] mb-1">Content Moderation</div>
          <div className="text-[11.5px] text-[var(--td)] mb-4">Blog and case moderation rules</div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-b-0">
            <div>
              <div className="text-[13px] text-[var(--t)]">Require blog approval</div>
              <div className="text-[11px] text-[var(--td)] mt-0.5">New posts go to review queue before publishing</div>
            </div>
            <div 
              className={cn("w-9 h-5 rounded-[10px] bg-white/10 relative cursor-pointer transition-colors duration-220 shrink-0", blogApproval && "bg-og")}
              onClick={() => handleToggle('Require blog approval', blogApproval, setBlogApproval)}
            >
              <div className={cn("absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all duration-220 shadow-[0_1px_3px_rgba(0,0,0,0.4)]", blogApproval && "left-[19px]")} />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-b-0">
            <div>
              <div className="text-[13px] text-[var(--t)]">Auto-flag spam cases</div>
            </div>
            <div 
              className={cn("w-9 h-5 rounded-[10px] bg-white/10 relative cursor-pointer transition-colors duration-220 shrink-0", autoFlag && "bg-og")}
              onClick={() => handleToggle('Auto-flag spam cases', autoFlag, setAutoFlag)}
            >
              <div className={cn("absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all duration-220 shadow-[0_1px_3px_rgba(0,0,0,0.4)]", autoFlag && "left-[19px]")} />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-b-0">
            <div>
              <div className="text-[13px] text-[var(--t)]">Email admin on report</div>
            </div>
            <div 
              className={cn("w-9 h-5 rounded-[10px] bg-white/10 relative cursor-pointer transition-colors duration-220 shrink-0", emailAdmin && "bg-og")}
              onClick={() => handleToggle('Email admin on report', emailAdmin, setEmailAdmin)}
            >
              <div className={cn("absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all duration-220 shadow-[0_1px_3px_rgba(0,0,0,0.4)]", emailAdmin && "left-[19px]")} />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5 mb-3.5 mt-3.5">
            <label className="text-xs font-medium text-[var(--tm)]">Max Cases per Client (per month)</label>
            <input 
              className="bg-white/[0.04] border border-white/[0.09] rounded-[9px] px-[13px] py-[10px] text-[13px] text-[var(--t)] font-sans outline-none w-full transition-colors duration-180 focus:border-og/40" 
              type="number" 
              value={maxCases}
              onChange={(e) => setMaxCases(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card border border-white/[0.07] rounded-[14px] p-5 col-span-1 md:col-span-2 border-[#f06464]/18 bg-[#f06464]/[0.02]">
          <div className="text-sm font-semibold text-[#f06464] mb-1">Danger Zone</div>
          <div className="text-[11.5px] text-[var(--td)] mb-4">Irreversible platform-wide actions</div>
          <div className="flex gap-3 flex-wrap">
            <button 
              className="font-sans text-[13px] cursor-pointer rounded-[9px] px-5 py-2.5 transition-all duration-150 border text-[#f0b840] bg-[#f0b840]/8 border-[#f0b840]/18 hover:bg-[#f0b840]/15" 
              onClick={() => {
                addAuditLog('system', 'Database backup initiated by admin command')
                showToast('Database backup initiated successfully', 'ok')
              }}
            >
              Backup Database
            </button>
            
            <button 
              className="font-sans text-[13px] cursor-pointer rounded-[9px] px-5 py-2.5 transition-all duration-150 border text-[var(--td)] bg-white/[0.04] border-white/[0.09] hover:bg-white/[0.08] hover:text-[var(--tm)]" 
              onClick={() => {
                addAuditLog('system', 'System cache cleared manually by admin')
                showToast('Platform cache has been cleared', 'ok')
              }}
            >
              Clear Cache
            </button>
            
            <button 
              className="font-sans text-[13px] cursor-pointer rounded-[9px] px-5 py-2.5 transition-all duration-150 border text-[#f06464] bg-[#f06464]/8 border-[#f06464]/18 hover:bg-[#f06464]/15" 
              onClick={() => {
                addAuditLog('security', 'Forced flush of all user sessions executed')
                showToast('Forced user session flush executed', 'err')
              }}
            >
              Flush Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
