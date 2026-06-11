import type {
  AIFeature,
  AIChatMessage,
  AudiencePanel,
  FooterLink,
  HeroDashboardStat,
  HeroRecommendedCase,
  HeroStatItem,
  HowItWorksStep,
  MarqueeItem,
  NavLink,
  ProBonoCase,
  ProBonoProgram,
  TrustBadge,
} from '@/types'

export const NAV_LINKS: NavLink[] = [
  { id: 'cases', label: 'Cases', href: '/cases', icon: 'cases' },
  { id: 'lawyer', label: 'Find a Lawyer', href: '/lawyers', icon: 'lawyer' },
  {
    id: 'ai',
    label: 'AI Assistant',
    href: '/ai-assistant',
    icon: 'ai',
    variant: 'ai',
  },
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { id: 'insights', label: 'Insights', href: '/insights', icon: 'insights' },
]

export const TRUST_BADGES: TrustBadge[] = [
  { id: 'verified', label: 'Bar Council Verified', icon: 'shield' },
  { id: 'secure', label: 'Secure & Private', icon: 'lock' },
  { id: 'trusted', label: 'Trusted by 10K+ Lawyers', icon: 'users' },
]

export const HERO_DASHBOARD_STATS: HeroDashboardStat[] = [
  { value: 12, label: 'Active Cases', change: 2 },
  { value: 8, label: 'Applications', change: 1 },
  { value: 24, label: 'Connections', change: 5 },
  { value: 320, label: 'Rep. Points', change: 18 },
]

export const HERO_RECOMMENDED_CASES: HeroRecommendedCase[] = [
  {
    id: 'case-001',
    tags: [
      { label: 'Family Law', variant: 'primary' },
      { label: 'Remote', variant: 'muted' },
    ],
    title: 'Child Custody Dispute',
    description: 'Help a single mother seeking custody of her child.',
    location: 'Mumbai, Maharashtra',
    deadline: '2 days left',
  },
  {
    id: 'case-002',
    tags: [
      { label: 'Civil Rights', variant: 'primary' },
      { label: 'On-site', variant: 'muted' },
    ],
    title: 'Tenant Eviction Defense',
    description: 'Provide legal support for unlawful eviction case.',
    location: 'Bengaluru, Karnataka',
    deadline: '5 days left',
  },
]

export const HERO_STATS: HeroStatItem[] = [
  {
    id: 'lawyers',
    value: '10K+',
    numericValue: 10000,
    suffix: '+',
    label: 'Verified Lawyers',
    sublabel: 'Across 28 Indian States',
    icon: 'lawyers',
  },
  {
    id: 'cases',
    value: '2,400+',
    numericValue: 2400,
    suffix: '+',
    label: 'Cases Resolved',
    sublabel: 'Making real impact',
    icon: 'cases',
  },
  {
    id: 'domains',
    value: '18+',
    numericValue: 18,
    suffix: '+',
    label: 'Legal Domains',
    sublabel: 'Every area of law covered',
    icon: 'domains',
  },
]

export const MARQUEE_ITEMS: MarqueeItem[] = [
  { id: 'm1', label: 'Property Law' },
  { id: 'm2', label: 'Criminal Law' },
  { id: 'm3', label: 'Labour Rights' },
  { id: 'm4', label: 'Consumer Protection' },
  { id: 'm5', label: 'Cyber Law' },
  { id: 'm6', label: 'Family Law' },
  { id: 'm7', label: 'Pro Bono Network' },
  { id: 'm8', label: 'RAG-Powered AI' },
]

export const AUDIENCE_PANELS: AudiencePanel[] = [
  {
    id: 'lawyers',
    number: '01',
    title: 'For Lawyers &\nLegal Professionals',
    description:
      'A LinkedIn-style professional network built exclusively for the legal community. Build your profile, find pro bono work, and grow your practice.',
    features: [
      'Professional networking & mentorship',
      'Post and discover pro bono cases',
      'Rich profiles with bar registration & case history',
      'Internship & early career opportunities',
    ],
    ctaLabel: 'Create lawyer profile',
    ctaHref: '/register',
    icon: 'lawyer',
  },
  {
    id: 'citizens',
    number: '02',
    title: 'For Everyday\nCitizens',
    description:
      'Upload any legal document — FIR, land record, rental agreement, court notice — and get a plain-language explanation instantly. No lawyer, no fee.',
    features: [
      'Upload any legal PDF or DOCX',
      'AI explains in simple, plain language',
      'Covers all major Indian legal domains',
      'Completely free, no account required',
    ],
    ctaLabel: 'Try AI assistant free',
    ctaHref: '/ai-assistant',
    icon: 'citizen',
  },
]

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Upload your document',
    description:
      'Drop any PDF or DOCX — FIRs, land records, contracts, court notices. We handle any Indian legal format.',
    icon: 'upload',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'AI reads & indexes it',
    description:
      "Our RAG pipeline chunks and embeds your specific document. No generic answers — only what's in yours.",
    icon: 'index',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Ask anything, get clarity',
    description:
      'Plain-language answers in Hindi or English. Ask follow-ups. Understand exactly what you signed or received.',
    icon: 'ask',
  },
]

export const PRO_BONO_CASES: ProBonoCase[] = [
  {
    id: 'pb-001',
    priority: 'high',
    priorityLabel: 'High Priority',
    practiceArea: 'Immigration Law',
    postedAgo: '2 days ago',
    title: 'Immigration Legal Aid for Refugee Family',
    organization: 'Delhi Legal Aid Society',
    location: 'New Delhi',
    contact: 'Priya Nair',
    tags: ['Immigration Law', 'Document Preparation', 'Court Representation'],
  },
  {
    id: 'pb-002',
    priority: 'medium',
    priorityLabel: 'Medium Priority',
    practiceArea: 'Labour Law',
    postedAgo: '5 days ago',
    title: 'Wage Dispute Assistance for Daily Wage Workers',
    organization: 'Delhi Legal Aid Centre',
    location: 'Delhi, India',
    contact: 'Arun Sharma',
    tags: ['Labour Law', 'Negotiation', 'Documentation'],
  },
  {
    id: 'pb-003',
    priority: 'open',
    priorityLabel: 'Open',
    practiceArea: 'Property Law',
    postedAgo: '1 week ago',
    title: 'Tenant Rights Consultation — Rural Land Dispute',
    organization: 'Rajasthan Legal Services Authority',
    location: 'Jaipur',
    contact: 'Vikram Singh',
    tags: ['Property Law', 'Tenant Rights', 'Rural'],
  },
  {
    id: 'pb-004',
    priority: 'medium',
    priorityLabel: 'Medium Priority',
    practiceArea: 'Family Law',
    postedAgo: '3 days ago',
    title: 'Domestic Violence Protection Order Assistance',
    organization: 'Karnataka State Legal Services',
    location: 'Bengaluru',
    contact: 'Meera Krishnan',
    tags: ['Family Law', 'Protection Order', 'Counselling'],
  },
  {
    id: 'pb-005',
    priority: 'high',
    priorityLabel: 'High Priority',
    practiceArea: 'Criminal Law',
    postedAgo: '1 day ago',
    title: 'Bail Application Support for Undertrial Prisoner',
    organization: 'Allahabad High Court Legal Aid',
    location: 'Prayagraj, UP',
    contact: 'Rahul Tiwari',
    tags: ['Criminal Law', 'Bail', 'Undertrial Rights'],
  },
  {
    id: 'pb-006',
    priority: 'open',
    priorityLabel: 'Open',
    practiceArea: 'Consumer Protection',
    postedAgo: '4 days ago',
    title: 'Insurance Claim Rejection — Senior Citizen',
    organization: 'Mumbai District Legal Forum',
    location: 'Mumbai',
    contact: 'Sunita Desai',
    tags: ['Consumer Protection', 'Insurance', 'Senior Citizen'],
  },
]

export const PRO_BONO_PROGRAMS: ProBonoProgram[] = [
  {
    id: 'prog-001',
    title: 'Legal Clinic Volunteer Program',
    description:
      'Join our weekly legal clinic serving underserved communities across Delhi NCR.',
    volunteers: 25,
    impact: '500+ people helped',
  },
  {
    id: 'prog-002',
    title: 'Veterans Legal Aid Initiative',
    description:
      'Support veterans with disability claims, pension disputes and benefits navigation.',
    volunteers: 18,
    impact: '200+ veterans served',
  },
  {
    id: 'prog-003',
    title: 'Post an opportunity',
    description:
      'Senior advocates — list a pro bono case and connect with junior lawyers eager to help.',
    volunteers: 0,
    impact: '',
    highlighted: true,
  },
]

export const AI_CHAT_MESSAGES: AIChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'What does "easement rights" mean in my land agreement?',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content:
      'In your document, easement rights means your neighbour can legally use the path through your land to reach the main road. You still own the land — but you cannot build on that specific pathway.',
    highlight: 'easement rights',
  },
  {
    id: 'msg-3',
    role: 'user',
    content: 'Can I still sell the land?',
  },
  {
    id: 'msg-4',
    role: 'assistant',
    content:
      'Yes. But per Clause 4.2 of your agreement, the easement right transfers to any new buyer automatically. They must be informed before sale.',
    highlight: 'Clause 4.2',
  },
]

export const AI_FEATURES: AIFeature[] = [
  {
    id: 'feat-1',
    title: 'Zero hallucinations',
    description:
      'Answers are strictly grounded in your uploaded document via RAG — not generic legal training data.',
    icon: 'check',
  },
  {
    id: 'feat-2',
    title: 'All major Indian legal domains',
    description:
      'Property, labour, criminal, consumer protection, family law — across all jurisdictions.',
    icon: 'domains',
  },
  {
    id: 'feat-3',
    title: 'Free forever for citizens',
    description:
      'No account, no fee, no lawyer needed. The law should be understandable by everyone.',
    icon: 'free',
  },
  {
    id: 'feat-4',
    title: 'Ask follow-up questions',
    description:
      'Not just a summary — a real conversation about your specific document and situation.',
    icon: 'followup',
  },
]

export const FOOTER_LINKS: FooterLink[] = [
  { id: 'about', label: 'About', href: '#' },
  { id: 'privacy', label: 'Privacy', href: '#' },
  { id: 'terms', label: 'Terms', href: '/terms' },
  { id: 'github', label: 'GitHub', href: '#' },
]

export const LADY_JUSTICE_IMAGE =
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=88&fit=crop&crop=entropy'

export const CTA_BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1400&q=80&fit=crop'
