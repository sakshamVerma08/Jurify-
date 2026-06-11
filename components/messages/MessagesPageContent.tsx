// FILE: components/messages/MessagesPageContent.tsx
// TYPE: Client Component

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useUiStore } from '@/stores/uiStore'
import { Toast } from '@/components/ui/Toast'
import { JurifyLogoIcon } from '@/components/icons/JurifyLogoIcon'

import { ChatConversation, ChatMessage, SharedFile } from '@/types'
import { INITIAL_CONVERSATIONS, TYPING_REPLIES } from '@/lib/data/messages'

import { ChatSidebar } from './ChatSidebar'
import { ChatWindow } from './ChatWindow'
import { ChatDetailsPanel } from './ChatDetailsPanel'

import './messages.css'

export function MessagesPageContent() {
  const showToast = useUiStore((s) => s.showToast)
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS)
  const [activeConversationId, setActiveConversationId] = useState<string>('c_sunita')
  const [activeTab, setActiveTab] = useState<'all' | 'cases' | 'archived'>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)

  // Find the active conversation
  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0]

  // Clear unread count when clicking conversation
  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id)
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    )
  }

  // Send textual messages
  const handleSendMessage = (text: string) => {
    const now = new Date()
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    const newMsg: ChatMessage = {
      id: `m_own_${Date.now()}`,
      senderInitials: 'PM',
      senderName: 'Priya Mehta',
      text,
      time: timeString,
      own: true,
      isRead: false,
    }

    // Append message to active conversation
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? { ...c, messages: [...c.messages, newMsg] }
          : c
      )
    )

    // Trigger typing simulation
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const replyText = TYPING_REPLIES[Math.floor(Math.random() * TYPING_REPLIES.length)]
      const replyMsg: ChatMessage = {
        id: `m_reply_${Date.now()}`,
        senderInitials: activeConv.initials,
        senderName: activeConv.name,
        text: replyText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        own: false,
      }

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? { ...c, messages: [...c.messages, replyMsg] }
            : c
        )
      )
    }, 2200)
  }

  // Send uploaded file details
  const handleSendFile = (fileName: string, sizeLabel: string, type: string) => {
    const fileId = `f_${Date.now()}`
    const newFile: SharedFile = {
      id: fileId,
      name: fileName,
      sizeLabel,
      type,
      date: 'Today',
      secure: true,
    }

    const timeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    const fileMsg: ChatMessage = {
      id: `m_own_file_${Date.now()}`,
      senderInitials: 'PM',
      senderName: 'Priya Mehta',
      time: timeString,
      own: true,
      isRead: false,
      file: newFile,
    }

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              sharedFiles: [newFile, ...c.sharedFiles],
              messages: [...c.messages, fileMsg],
            }
          : c
      )
    )
  }

  return (
    <div className="h-full overflow-hidden bg-bg">
      {/* NAVBAR */}
      <nav>
        <Link href="/dashboard" className="logo">
          <div className="logo-icon">
            <JurifyLogoIcon size={16} />
          </div>
          <span className="logo-name">Jurify</span>
        </Link>
        <div className="nav-center">
          <strong>Messages</strong>
          <span style={{ color: 'rgba(255, 255, 255, 0.12)' }}>·</span>
          <div className="nav-enc">
            <div className="nav-enc-dot" />
            End-to-end encrypted
          </div>
        </div>
        <div className="nav-r">
          <Link href="/dashboard" className="nav-back">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="mr-1">
              <path d="M9 6.5H4M6 4l-2.5 2.5L6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Dashboard
          </Link>
        </div>
      </nav>

      {/* CHATROOM LAYOUT */}
      <div className="chat-wrap">
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {activeConv && (
          <ChatWindow
            conversation={activeConv}
            onSendMessage={handleSendMessage}
            onSendFile={handleSendFile}
            isTyping={isTyping}
            onTriggerToast={showToast}
          />
        )}

        {activeConv && (
          <ChatDetailsPanel
            conversation={activeConv}
            onTriggerToast={showToast}
          />
        )}
      </div>

      <Toast />
    </div>
  )
}
