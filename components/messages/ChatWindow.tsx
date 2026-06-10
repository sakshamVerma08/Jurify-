import React, { useRef, useEffect, useState } from 'react'
import { ChatConversation, ChatMessage } from '@/types'
import { getAvatarStyle } from './ChatSidebar'
import { cn } from '@/lib/utils'

interface ChatWindowProps {
  conversation: ChatConversation
  onSendMessage: (text: string) => void
  onSendFile: (fileName: string, sizeLabel: string, type: string) => void
  isTyping: boolean
  onTriggerToast: (msg: string, type?: 'ok' | 'err' | 'info') => void
}

export function ChatWindow({
  conversation,
  onSendMessage,
  onSendFile,
  isTyping,
  onTriggerToast,
}: ChatWindowProps) {
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom when messages or typing status changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation.messages, isTyping])

  // Reset textarea height on conversation change
  useEffect(() => {
    setInputText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [conversation.id])

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    // Auto-grow height logic
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    if (!inputText.trim()) return
    onSendMessage(inputText.trim())
    setInputText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE'
        const sizeKB = Math.round(file.size / 1024)
        const sizeLabel = sizeKB > 1024 
          ? `${(sizeKB / 1024).toFixed(1)} MB` 
          : `${sizeKB} KB`
        
        onSendFile(file.name, sizeLabel, ext)
        onTriggerToast(`${file.name} uploaded securely`, 'ok')
      })
      e.target.value = '' // Reset input
    }
  }

  return (
    <main className="chat-main">
      {/* CHAT HEADER */}
      <div className="chat-header">
        <div className="ch-l">
          <div className="ch-av" style={getAvatarStyle(conversation.initials)}>
            {conversation.initials}
            {conversation.online && <div className="ch-av-dot" />}
          </div>
          <div>
            <div className="ch-name">
              {conversation.name}
              <span className="ch-badge">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="mr-1">
                  <path d="M1.5 4l1.8 1.8L6.5 2" stroke="#D4853A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Client
              </span>
            </div>
            <div className="ch-sub">
              {conversation.role.split('·')[1]?.trim() || conversation.role} · {conversation.lastSeen || 'Last seen recently'}
            </div>
          </div>
        </div>
        <div className="ch-acts">
          <button className="ch-btn" title="Search conversation" onClick={() => onTriggerToast('Search opened', 'info')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
              <line x1="9" y1="9" x2="12" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
          <button className="ch-btn" title="Attach files" onClick={triggerFileSelect}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7l-5.5 5.5a3 3 0 01-4.25-4.25L8 2.5a2 2 0 012.83 2.83L5.1 11a1 1 0 01-1.42-1.42L9.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <button className="ch-btn" title="Case details" onClick={() => onTriggerToast('Opening case details', 'info')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
              <line x1="4" y1="5.5" x2="10" y2="5.5" stroke="currentColor" strokeWidth="1" />
              <line x1="4" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          <button className="ch-btn red" title="Report conversation" onClick={() => onTriggerToast('Report options opened', 'info')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <line x1="3.5" y1="3.5" x2="10.5" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* CASE BANNER */}
      {conversation.activeCase && (
        <div className="case-banner">
          <div className="cb-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="#D4853A" strokeWidth="1.1" />
              <line x1="4" y1="5.5" x2="10" y2="5.5" stroke="#D4853A" strokeWidth="1" />
              <line x1="4" y1="8" x2="10" y2="8" stroke="#D4853A" strokeWidth="1" />
            </svg>
          </div>
          <div className="cb-info">
            <div className="cb-lbl">Active Case</div>
            <div className="cb-ttl">{conversation.activeCase}</div>
          </div>
          <button className="cb-btn" onClick={() => onTriggerToast('Opening case page', 'info')}>
            View Case
          </button>
        </div>
      )}

      {/* MESSAGES VIEW */}
      <div className="msgs">
        <div className="enc-note">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <rect x="2" y="5" width="7" height="5.5" rx="1" stroke="currentColor" strokeWidth="0.9" />
            <path d="M3.5 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
          </svg>
          End-to-end encrypted — only you and your lawyer can read this conversation
        </div>
        
        <div className="date-sep">
          <span>Today</span>
        </div>

        {conversation.messages.map((msg) => (
          <div key={msg.id} className={cn('mrow', msg.own && 'own')}>
            <div className={cn('mav', msg.own && 'o')}>
              {msg.own ? 'PM' : conversation.initials}
            </div>
            <div className="mcont">
              {msg.file ? (
                <div 
                  className={cn('fbbl', msg.own && 's')} 
                  onClick={() => onTriggerToast(`Downloading ${msg.file?.name}`, 'info')}
                >
                  <div className="fb-ic">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="1" width="10" height="12" rx="2" stroke="#D4853A" strokeWidth="1.1" />
                      <line x1="4.5" y1="5" x2="9.5" y2="5" stroke="#D4853A" strokeWidth="0.9" />
                      <line x1="4.5" y1="7.5" x2="9.5" y2="7.5" stroke="#D4853A" strokeWidth="0.9" />
                      <line x1="4.5" y1="10" x2="7" y2="10" stroke="#D4853A" strokeWidth="0.9" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="fb-nm">{msg.file.name}</div>
                    <div className="fb-mt">
                      {msg.file.type} · {msg.file.sizeLabel} · {msg.file.secure ? 'Secure upload' : 'Draft'}
                    </div>
                  </div>
                  <div className="fb-dl">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M5.5 1v7M3 6l2.5 2.5L8 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 9.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className={cn('bbl', msg.own ? 's' : 'r')}>{msg.text}</div>
              )}
              <div className="mmeta">
                {msg.time}
                {msg.own && (
                  <span className={cn('tick', !msg.isRead && 'g')}>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                      <path d="M1 4.5l3 3 9-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 4.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="typing-row">
            <div className="mav">{conversation.initials}</div>
            <div className="typing-bbl">
              <div className="td" />
              <div className="td" />
              <div className="td" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BAR */}
      <div className="input-bar">
        <div className="ib-tools">
          <button className="ib-tool" title="Attach file" onClick={triggerFileSelect}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M11 6.5l-5 5a2.5 2.5 0 01-3.54-3.54L7 3.5a1.5 1.5 0 012.12 2.12L4.6 10.1a.5.5 0 01-.71-.71L8.5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </button>
          <button className="ib-tool" title="Upload document" onClick={triggerFileSelect}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M6.5 4.5v4M4.5 6.5l2-2 2 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="ib-sep" />
          <button className="ib-tool" title="Mark important" onClick={() => onTriggerToast('Message flagged as important', 'info')}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1.5l1.2 3.2h3.3l-2.7 2 1 3.2-2.8-2-2.8 2 1-3.2-2.7-2h3.3z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="ib-tool" title="Schedule message" onClick={() => onTriggerToast('Scheduling feature coming soon', 'info')}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M6.5 5v2l1.5 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="4.5" y1="1.5" x2="4.5" y2="3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="8.5" y1="1.5" x2="8.5" y2="3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </button>
          <div className="ib-sep" />
          <span className="ib-lbl">Confidential · Attorney-Client Privilege</span>
        </div>
        <div className="ib-row">
          <div className="ib-box">
            <textarea
              ref={textareaRef}
              className="ib-ta"
              placeholder="Type your message…"
              rows={1}
              value={inputText}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
            />
            <button className="ib-emoji" onClick={() => onTriggerToast('Emoji picker coming soon', 'info')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="5.5" cy="6.5" r="0.75" fill="currentColor" />
                <circle cx="10.5" cy="6.5" r="0.75" fill="currentColor" />
                <path d="M5 10.5c0.8 1.5 5.2 1.5 6 0" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <button className="ib-send" onClick={handleSend}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M9 4l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="ib-hint">Enter to send · Shift+Enter for new line · All messages are legally privileged and encrypted</div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept=".pdf,.doc,.docx,.jpg,.png"
        onChange={handleFileChange}
        className="hidden"
      />
    </main>
  )
}
