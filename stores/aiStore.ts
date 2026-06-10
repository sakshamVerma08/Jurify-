import { create } from 'zustand'
import { AI_DEMO_DOCUMENT } from '@/lib/data/ai'
import { formatMessageTime, generateAiResponse, guessDocType } from '@/lib/ai/responses'
import type { AiMessage, AiScreen, AiUploadedDocument } from '@/types'

function createId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

function buildDocumentFromFile(file: File): AiUploadedDocument {
  const ext = file.name.split('.').pop()?.toUpperCase() ?? 'FILE'
  const sizeMB = (file.size / 1024 / 1024).toFixed(1)
  return {
    name: file.name,
    size: file.size,
    ext,
    sizeLabel: `${sizeMB} MB · ${ext}`,
  }
}

interface AiState {
  screen: AiScreen
  hasDocument: boolean
  document: AiUploadedDocument | null
  docPanelExpanded: boolean
  messages: AiMessage[]
  isTyping: boolean
  language: string
  activeHistoryId: string
  demoInitialized: boolean
  setLanguage: (language: string) => void
  setActiveHistory: (id: string) => void
  toggleDocPanel: () => void
  newChat: () => void
  startNoDoc: () => void
  processFile: (file: File) => void
  removeDocument: () => void
  sendMessage: (text: string) => Promise<void>
  initDemo: () => void
}

export const useAiStore = create<AiState>((set, get) => ({
  screen: 'welcome',
  hasDocument: false,
  document: null,
  docPanelExpanded: false,
  messages: [],
  isTyping: false,
  language: 'en',
  activeHistoryId: 'hist-1',
  demoInitialized: false,

  setLanguage: (language) => set({ language }),

  setActiveHistory: (id) => set({ activeHistoryId: id }),

  toggleDocPanel: () => set((s) => ({ docPanelExpanded: !s.docPanelExpanded })),

  newChat: () =>
    set({
      screen: 'welcome',
      hasDocument: false,
      document: null,
      docPanelExpanded: false,
      messages: [],
      isTyping: false,
      activeHistoryId: '',
    }),

  startNoDoc: () => {
    set({
      screen: 'chat',
      hasDocument: false,
      document: null,
      docPanelExpanded: false,
      messages: [
        {
          id: createId(),
          role: 'ai',
          content: `Hello! I'm Jurify AI. I can answer general legal questions about Indian law.\n\nYou haven't uploaded a document, so my answers will be based on general legal knowledge. For advice specific to your situation, please upload your document or consult a verified advocate.\n\nWhat would you like to know?`,
          followups: [
            'Explain the Right to Information Act',
            'How does anticipatory bail work?',
            'What are tenant rights under Indian law?',
          ],
          showTime: false,
        },
      ],
    })
  },

  processFile: (file) => {
    const doc = buildDocumentFromFile(file)
    const docType = guessDocType(file.name)
    set({
      screen: 'chat',
      hasDocument: true,
      document: doc,
      docPanelExpanded: false,
      messages: [],
    })

    setTimeout(() => {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: createId(),
            role: 'ai',
            content: `I've analysed <strong>${file.name}</strong>. The document appears to be a <strong>${docType}</strong>.\n\nI'm ready to answer your questions about it. Here are some things you can ask me:`,
            followups: [
              'What are the key terms in this document?',
              'Are there any risky clauses I should know about?',
              'What are my obligations under this agreement?',
              'Summarize this document in simple language',
            ],
            showTime: false,
          },
        ],
      }))
    }, 800)
  },

  removeDocument: () =>
    set({
      screen: 'welcome',
      hasDocument: false,
      document: null,
      docPanelExpanded: false,
      messages: [],
    }),

  sendMessage: async (text) => {
    const trimmed = text.trim()
    const { isTyping, hasDocument } = get()
    if (!trimmed || isTyping) return

    const userMessage: AiMessage = {
      id: createId(),
      role: 'user',
      content: trimmed,
    }

    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
      screen: 'chat',
    }))

    const delay = 1200 + Math.random() * 800
    await new Promise((r) => setTimeout(r, delay))

    const response = generateAiResponse(trimmed, hasDocument)
    const aiMessage: AiMessage = {
      id: createId(),
      role: 'ai',
      content: response.text,
      followups: response.followups,
      timestamp: formatMessageTime(),
      showTime: true,
    }

    set((state) => ({
      messages: [...state.messages, aiMessage],
      isTyping: false,
    }))
  },

  initDemo: () => {
    const { demoInitialized } = get()
    if (demoInitialized) return

    set({
      demoInitialized: true,
      screen: 'chat',
      hasDocument: true,
      document: AI_DEMO_DOCUMENT,
      messages: [
        {
          id: createId(),
          role: 'ai',
          content: `I've analysed <strong>land_agreement_rajasthan.pdf</strong>. This appears to be a <strong>Land Purchase Agreement</strong> for a 2.4-acre agricultural plot in Jaipur district.\n\nI'm ready to answer your questions. What would you like to know?`,
          followups: [
            'Summarize this document',
            'What are the risky clauses?',
            'What does easement mean here?',
          ],
          showTime: false,
        },
        {
          id: createId(),
          role: 'user',
          content: 'What does "easement rights" mean in my land agreement?',
        },
        {
          id: createId(),
          role: 'ai',
          content: `In your document, <strong>easement rights</strong> refer to a non-possessory right to use a portion of the land for a specific, limited purpose.\n\nAccording to <span class="msg-cite">§ 4.2</span> of your agreement, the neighbouring party retains the right to access the main road via a 3-metre pathway along the western boundary.\n\nKey things to remember:\n• You still <strong>own</strong> the land — easement does not transfer title\n• You <strong>cannot build or obstruct</strong> that specific pathway\n• The easement <strong>transfers automatically</strong> to any future buyer of your property`,
          followups: [
            'Can I still sell the land?',
            'What if I build on the pathway?',
            'How do I extinguish an easement?',
          ],
          timestamp: formatMessageTime(),
          showTime: true,
        },
      ],
    })
  },
}))
