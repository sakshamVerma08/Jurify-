import { ChatConversation } from '@/types'
import { getAvatarStyle } from './ChatSidebar'

interface ChatDetailsPanelProps {
  conversation: ChatConversation
  onTriggerToast: (msg: string, type?: 'ok' | 'err' | 'info') => void
}

export function ChatDetailsPanel({
  conversation,
  onTriggerToast,
}: ChatDetailsPanelProps) {
  return (
    <aside className="chat-panel">
      {/* PROFILE SUMMARY */}
      <div className="cp-sec" style={{ paddingBottom: '16px' }}>
        <div className="cp-av" style={getAvatarStyle(conversation.initials)}>
          {conversation.initials}
        </div>
        <div className="cp-nm">{conversation.name}</div>
        <div className="cp-rl">
          {conversation.role.split('·')[0]?.trim() || 'Client'} · {conversation.phone.startsWith('+91') ? 'India' : 'Abroad'}
        </div>
        <div className="cp-onl">
          <div className="cp-dot" />
          {conversation.online ? 'Online now' : 'Offline'}
        </div>
      </div>

      {/* CONTACT INFO */}
      <div className="cp-sec">
        <div className="cps-ttl">Contact Info</div>
        <div className="cp-row">
          <div className="cp-lbl">Email</div>
          <div className="cp-val">{conversation.email}</div>
        </div>
        <div className="cp-row">
          <div className="cp-lbl">Phone</div>
          <div className="cp-val">{conversation.phone}</div>
        </div>
        <div className="cp-row">
          <div className="cp-lbl">Case</div>
          <div className="cp-val">{conversation.activeCase ? conversation.activeCase.split('—')[0]?.trim() : 'General Inquiry'}</div>
        </div>
        <div className="cp-row">
          <div className="cp-lbl">Since</div>
          <div className="cp-val">{conversation.since}</div>
        </div>
      </div>

      {/* SHARED FILES */}
      <div className="cp-sec">
        <div className="cps-ttl">Shared Files ({conversation.sharedFiles.length})</div>
        {conversation.sharedFiles.length > 0 ? (
          <div className="max-h-[220px] overflow-y-auto pr-1 flex flex-col gap-1">
            {conversation.sharedFiles.map((file) => (
              <div
                key={file.id}
                className="cpf"
                onClick={() => onTriggerToast(`Opening ${file.name}`, 'info')}
              >
                <div className="cpf-ic">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <rect x="0.5" y="0.5" width="9" height="9" rx="1.5" stroke="#D4853A" strokeWidth="0.8" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="cpf-nm">{file.name}</div>
                  <div className="cpf-sz">
                    {file.sizeLabel} · {file.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[11.5px] text-white/20 py-2">No files shared yet</div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="cp-sec">
        <div className="cps-ttl">Actions</div>
        <button className="cp-act gold" onClick={() => onTriggerToast('Opening case details', 'info')}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-1">
            <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" />
            <line x1="3.5" y1="4.5" x2="8.5" y2="4.5" stroke="currentColor" strokeWidth="0.9" />
            <line x1="3.5" y1="7" x2="8.5" y2="7" stroke="currentColor" strokeWidth="0.9" />
          </svg>
          View Case Details
        </button>
        <button className="cp-act gold" onClick={() => onTriggerToast('Opening meeting scheduler', 'info')}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-1">
            <rect x="1.5" y="2.5" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1" />
            <line x1="4" y1="1.5" x2="4" y2="3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <line x1="8" y1="1.5" x2="8" y2="3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          Schedule Meeting
        </button>
        <button className="cp-act ghost" onClick={() => onTriggerToast('Exporting conversation transcript', 'info')}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-1">
            <path d="M6 1.5v6M3.5 5.5l2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 9.5v1.5h10V9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          Export Transcript
        </button>
        <button className="cp-act red" onClick={() => onTriggerToast('Report options opened', 'info')}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-1">
            <path d="M6 1.5L10 9.5H2L6 1.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            <line x1="6" y1="4.5" x2="6" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <circle cx="6" cy="8.2" r="0.45" fill="currentColor" />
          </svg>
          Report Conversation
        </button>
      </div>

      {/* ATTORNEY-CLIENT PRIVILEGE */}
      <div className="cp-sec">
        <div className="priv">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="mr-1 shrink-0">
            <rect x="2" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1" />
            <path d="M4 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p>
            <strong>Attorney-Client Privilege.</strong> All messages are protected under legal professional privilege and strictly confidential under the Advocates Act, 1961.
          </p>
        </div>
      </div>
    </aside>
  )
}
