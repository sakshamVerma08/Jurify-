import { ChatConversation } from '@/types'
import { cn } from '@/lib/utils'

interface ChatSidebarProps {
  conversations: ChatConversation[]
  activeConversationId: string
  onSelectConversation: (id: string) => void
  activeTab: 'all' | 'cases' | 'archived'
  setActiveTab: (tab: 'all' | 'cases' | 'archived') => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const getAvatarStyle = (initials: string) => {
  switch (initials) {
    case 'RC':
      return { backgroundColor: 'rgba(100, 150, 255, 0.12)', borderColor: 'rgba(100, 150, 255, 0.28)', color: 'rgba(140, 180, 255, 0.9)' }
    case 'AK':
      return { backgroundColor: 'rgba(180, 100, 255, 0.12)', borderColor: 'rgba(180, 100, 255, 0.25)', color: 'rgba(200, 140, 255, 0.9)' }
    case 'VP':
      return { backgroundColor: 'rgba(74, 222, 128, 0.1)', borderColor: 'rgba(74, 222, 128, 0.25)', color: 'rgba(100, 220, 140, 0.9)' }
    case 'NM':
      return { backgroundColor: 'rgba(240, 180, 60, 0.12)', borderColor: 'rgba(240, 180, 60, 0.25)', color: 'rgba(240, 200, 80, 0.9)' }
    case 'DK':
      return { backgroundColor: 'rgba(240, 100, 100, 0.1)', borderColor: 'rgba(240, 100, 100, 0.2)', color: 'rgba(240, 140, 140, 0.9)' }
    default:
      return { backgroundColor: 'rgba(212, 133, 58, 0.15)', borderColor: 'rgba(212, 133, 58, 0.28)', color: 'var(--og)' }
  }
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}: ChatSidebarProps) {

  // Filter the list of chats based on tab and search query
  const filteredConversations = conversations.filter((conv) => {
    // Tab filtering
    if (activeTab === 'archived') {
      if (!conv.archived) return false
    } else if (activeTab === 'cases') {
      if (conv.archived || !conv.activeCase) return false
    } else { // 'all'
      if (conv.archived) return false
    }

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchesName = conv.name.toLowerCase().includes(q)
      const matchesRole = conv.role.toLowerCase().includes(q)
      const lastMsg = conv.messages[conv.messages.length - 1]
      const matchesMessage = lastMsg?.text?.toLowerCase().includes(q) || false
      return matchesName || matchesRole || matchesMessage
    }

    return true
  })

  return (
    <aside className="chat-sidebar">
      <div className="cs-head">
        <div className="cs-title">
          My <em className="italic text-[#e8a44a] not-italic">Chats</em>
        </div>
        <div className="cs-search">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2" />
            <line x1="8.5" y1="8.5" x2="11.5" y2="11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search conversations…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="cs-tabs">
        <button
          className={cn('cst', activeTab === 'all' && 'active')}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={cn('cst', activeTab === 'cases' && 'active')}
          onClick={() => setActiveTab('cases')}
        >
          Active Cases
        </button>
        <button
          className={cn('cst', activeTab === 'archived' && 'active')}
          onClick={() => setActiveTab('archived')}
        >
          Archived
        </button>
      </div>

      <div className="cs-list">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => {
            const lastMsg = conv.messages[conv.messages.length - 1]
            const isSelected = conv.id === activeConversationId

            let previewText = 'No messages'
            if (lastMsg) {
              if (lastMsg.file) {
                previewText = `📎 ${lastMsg.file.name}`
              } else {
                previewText = lastMsg.text || ''
              }
            }

            return (
              <div
                key={conv.id}
                className={cn('cs-item', isSelected && 'active')}
                onClick={() => onSelectConversation(conv.id)}
              >
                <div className="cs-av" style={getAvatarStyle(conv.initials)}>
                  {conv.initials}
                  {conv.online && <div className="cs-online" />}
                </div>
                <div className="cs-body">
                  <div className="cs-top">
                    <span className="cs-name">{conv.name}</span>
                    <span className="cs-time">{lastMsg ? lastMsg.time : ''}</span>
                  </div>
                  <div className="cs-preview">{previewText}</div>
                </div>
                {conv.unreadCount && conv.unreadCount > 0 && !isSelected ? (
                  <div className="cs-badge">{conv.unreadCount}</div>
                ) : null}
              </div>
            )
          })
        ) : (
          <div className="p-6 text-center text-[12.5px] text-white/20">No conversations found</div>
        )}
      </div>
    </aside>
  )
}
