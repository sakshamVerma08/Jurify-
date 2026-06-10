import type { AiChatHistoryItem, AiLanguage, AiQuickAction } from '@/types'

export const AI_LANGUAGES: AiLanguage[] = [
  { id: 'en', label: '🌐 English' },
  { id: 'hi', label: '🇮🇳 Hindi — हिंदी' },
  { id: 'ta', label: 'Tamil — தமிழ்' },
  { id: 'te', label: 'Telugu — తెలుగు' },
  { id: 'mr', label: 'Marathi — मराठी' },
  { id: 'bn', label: 'Bengali — বাংলা' },
  { id: 'gu', label: 'Gujarati — ગુજરાતી' },
  { id: 'kn', label: 'Kannada — ಕನ್ನಡ' },
  { id: 'ml', label: 'Malayalam — മലയാളം' },
]

export const AI_SUGGESTIONS = [
  'What is an FIR and how do I file one?',
  'What are my rights as a tenant?',
  'Explain the Right to Information Act',
  'What is a consumer dispute redressal?',
  'How does anticipatory bail work?',
  'Difference between IPC and BNSS',
] as const

export const AI_QUICK_ACTION_PROMPTS: Record<Exclude<AiQuickAction, 'compare'>, string> = {
  summarize: 'Please summarize this document in plain language.',
  keyterms: 'What are the key legal terms in this document and what do they mean?',
  risks: 'What are the risky clauses in this document I should be aware of?',
  obligations: 'What are my obligations and duties under this document?',
}

export const AI_INPUT_QUICK_ACTIONS: { id: AiQuickAction; label: string }[] = [
  { id: 'summarize', label: 'Summarize' },
  { id: 'keyterms', label: 'Key Terms' },
  { id: 'risks', label: 'Risks' },
  { id: 'obligations', label: 'Obligations' },
  { id: 'compare', label: 'Compare Docs' },
]

export const AI_CHAT_HISTORY: AiChatHistoryItem[] = [
  {
    id: 'hist-1',
    title: 'land_agreement_rajasthan.pdf',
    subtitle: 'What does easement mean?',
    group: 'today',
    hasDocument: true,
  },
  {
    id: 'hist-2',
    title: 'rent_agreement_delhi.pdf',
    subtitle: 'Is this agreement valid?',
    group: 'today',
    hasDocument: true,
  },
  {
    id: 'hist-3',
    title: 'employment_contract.docx',
    subtitle: 'Non-compete clause analysis',
    group: 'yesterday',
    hasDocument: true,
  },
  {
    id: 'hist-4',
    title: 'No document',
    subtitle: 'FIR filing process explained',
    group: 'yesterday',
    hasDocument: false,
  },
  {
    id: 'hist-5',
    title: 'consumer_complaint_ncdrc.pdf',
    subtitle: 'How to file in NCDRC?',
    group: 'week',
    hasDocument: true,
  },
]

export const AI_DEMO_DOCUMENT = {
  name: 'land_agreement_rajasthan.pdf',
  size: 2.3 * 1024 * 1024,
  ext: 'PDF',
  sizeLabel: '2.3 MB · 8 pages',
  pages: 8,
}

export const AI_HISTORY_GROUP_LABELS: Record<AiChatHistoryItem['group'], string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  week: 'This Week',
}

export const AI_ACCEPTED_FILE_TYPES = '.pdf,.doc,.docx,.txt'

export const AI_MAX_FILE_SIZE_MB = 20
