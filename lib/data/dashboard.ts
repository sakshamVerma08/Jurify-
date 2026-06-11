import type {
  AiChatPreview,
  DashboardCaseItem,
  DashboardConsultation,
  DashboardMessage,
  DashboardNavItem,
  DashboardNotification,
  DashboardStat,
  DashboardUserProfile,
  DonutSegment,
  RecommendedLawyer,
} from '@/types'

export const DASHBOARD_PROFILES: Record<'lawyer' | 'client', DashboardUserProfile> = {
  lawyer: {
    initials: 'PM',
    name: 'Adv. Priya Mehta',
    roleLabel: 'Lawyer · Verified',
    greeting: 'Good morning, Priya 👋',
  },
  client: {
    initials: 'SR',
    name: 'Sunita Rawat',
    roleLabel: 'Client',
    greeting: 'Good morning, Sunita 👋',
  },
}

export const DASHBOARD_DATE_LABEL = 'Sunday, 24 May 2026 · Delhi High Court Term'

export const DASHBOARD_NAV_MAIN: DashboardNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { id: 'cases', label: 'Cases', href: '/cases', icon: 'cases', badge: 3 },
  { id: 'lawyers', label: 'Lawyers', href: '/lawyers', icon: 'lawyers' },
  { id: 'ai', label: 'AI Assistant', href: '/ai-assistant', icon: 'ai' },
]

export const DASHBOARD_NAV_WORK: DashboardNavItem[] = [
  {
    id: 'applications',
    label: 'My Cases',
    href: '#',
    icon: 'applications',
    badge: 2,
    badgeVariant: 'danger',
    lawyerOnly: true,
  },
  {
    id: 'mycases',
    label: 'Active Cases',
    href: '#',
    icon: 'mycases',
    dynamicLabel: 'activeCases',
  },
  { id: 'messages', label: 'Messages', href: '/messages', icon: 'messages', badge: 5 },
  { id: 'schedule', label: 'Schedule', href: '#', icon: 'schedule' },
]

export const DASHBOARD_NAV_ACCOUNT: DashboardNavItem[] = [
  { id: 'profile', label: 'My Profile', href: '/profile', icon: 'profile' },
  { id: 'settings', label: 'Settings', href: '/profile?tab=settings', icon: 'settings' },
]

export const LAWYER_STATS: DashboardStat[] = [
  {
    id: 'active',
    value: '12',
    label: 'Active Cases',
    sub: '4 require action today',
    change: '↑ 2',
    changeDirection: 'up',
    iconVariant: 'gold',
  },
  {
    id: 'applications',
    value: '8',
    label: 'My Cases',
    sub: '3 pending review',
    change: '2 rejected',
    changeDirection: 'down',
    iconVariant: 'blue',
  },
  {
    id: 'probono',
    value: '240',
    label: 'Pro Bono Hours',
    sub: 'Top 5% on platform',
    change: '↑ 18h',
    changeDirection: 'up',
    iconVariant: 'green',
  },
  {
    id: 'views',
    value: '1.2k',
    label: 'Profile Views',
    sub: 'This month',
    change: '↑ 42',
    changeDirection: 'up',
    iconVariant: 'gold',
  },
]

export const CLIENT_STATS: DashboardStat[] = [
  {
    id: 'open',
    value: '2',
    label: 'Open Cases',
    sub: 'Awaiting lawyer',
    change: 'New',
    changeDirection: 'up',
    iconVariant: 'gold',
  },
  {
    id: 'progress',
    value: '1',
    label: 'In Progress',
    sub: 'Pre-hearing stage',
    change: 'Active',
    changeDirection: 'up',
    iconVariant: 'blue',
  },
  {
    id: 'resolved',
    value: '3',
    label: 'Resolved',
    sub: 'All time',
    change: '↑ 1',
    changeDirection: 'up',
    iconVariant: 'green',
  },
  {
    id: 'aichats',
    value: '11',
    label: 'AI Chats',
    sub: 'This month',
    change: '↑ 3',
    changeDirection: 'up',
    iconVariant: 'gold',
  },
]

export const LINE_CHART_DATA = {
  values: [4, 7, 5, 9, 6, 12],
  labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
}

export const LAWYER_DONUT_DATA: DonutSegment[] = [
  { label: 'Family Law', pct: 38, color: '#D4853A' },
  { label: 'Civil Rights', pct: 28, color: '#E8A44A' },
  { label: 'Criminal', pct: 19, color: '#C8622A' },
  { label: 'Labour', pct: 10, color: 'rgba(212,133,58,0.5)' },
  { label: 'Other', pct: 5, color: 'rgba(255,255,255,0.15)' },
]

export const LAWYER_DONUT_TOTAL = 92

export const LAWYER_ACTIVE_CASES: DashboardCaseItem[] = [
  {
    id: 'lc-1',
    title: 'Child Custody — Sunita Rawat',
    category: 'Family Law',
    stage: 'Pre-Hearing',
    stageVariant: 'hearing',
    deadline: '2 days',
    deadlineUrgent: true,
    steps: [
      { label: 'Intake', status: 'done' },
      { label: 'Filed', status: 'done' },
      { label: 'Pre-Hearing', status: 'active' },
      { label: 'Trial', status: 'pending' },
      { label: 'Verdict', status: 'pending' },
    ],
  },
  {
    id: 'lc-2',
    title: 'Tenant Eviction — Rajesh Kumar',
    category: 'Civil Rights',
    stage: 'Investigation',
    stageVariant: 'investigation',
    deadline: '12 days',
    steps: [
      { label: 'Intake', status: 'done' },
      { label: 'Investigation', status: 'active' },
      { label: 'Filing', status: 'pending' },
      { label: 'Hearing', status: 'pending' },
      { label: 'Verdict', status: 'pending' },
    ],
  },
  {
    id: 'lc-3',
    title: 'Wage Dispute — 14 Workers',
    category: 'Labour Rights',
    stage: 'Trial',
    stageVariant: 'trial',
    deadline: 'Tomorrow',
    deadlineUrgent: true,
    steps: [
      { label: 'Intake', status: 'done' },
      { label: 'Filed', status: 'done' },
      { label: 'Hearing', status: 'done' },
      { label: 'Trial', status: 'active' },
      { label: 'Verdict', status: 'pending' },
    ],
  },
]

export const CLIENT_MY_CASES: DashboardCaseItem[] = [
  {
    id: 'cc-1',
    title: 'Child Custody Dispute',
    category: 'Family Law',
    stage: 'Pre-Hearing',
    stageVariant: 'hearing',
    deadline: '2 days left',
    deadlineUrgent: true,
    lawyerNote: 'Lawyer: Adv. Priya Mehta ✓',
    steps: [
      { label: 'Posted', status: 'done' },
      { label: 'Assigned', status: 'done' },
      { label: 'Pre-Hearing', status: 'active' },
      { label: 'Trial', status: 'pending' },
      { label: 'Resolved', status: 'pending' },
    ],
  },
  {
    id: 'cc-2',
    title: 'Land Dispute — Rajasthan',
    category: 'Property Law',
    stage: 'Open',
    stageVariant: 'open',
    deadline: '20 days left',
    applicantNote: '3 lawyers applied — Review applications',
    steps: [
      { label: 'Posted', status: 'done' },
      { label: 'Applications', status: 'active' },
      { label: 'Assigned', status: 'pending' },
      { label: 'Active', status: 'pending' },
      { label: 'Resolved', status: 'pending' },
    ],
  },
]

export const LAWYER_MESSAGES: DashboardMessage[] = [
  {
    id: 'm1',
    initials: 'S',
    name: 'Sunita Rawat',
    preview: 'Priya ji, I have sent the documents you asked for. Please review before tomorrow\'s hearing.',
    time: '9:14 AM',
    unread: true,
  },
  {
    id: 'm2',
    initials: 'R',
    name: 'Rajesh Kumar',
    preview: 'Hello, when can we schedule a call? I have new evidence for the eviction case.',
    time: '8:42 AM',
    unread: true,
  },
  {
    id: 'm3',
    initials: 'JR',
    name: 'Jurify Support',
    preview: 'Your KYC has been re-verified. Your Verified badge is active.',
    time: 'Yesterday',
    avatarStyle: 'support',
  },
  {
    id: 'm4',
    initials: 'A',
    name: 'Anita Sharma',
    preview: 'Thank you so much for handling everything. The family court order came through.',
    time: 'Yesterday',
  },
]

export const LAWYER_CONSULTATIONS: DashboardConsultation[] = [
  {
    id: 'c1',
    time: '10:00',
    ampm: 'AM',
    name: 'Sunita Rawat',
    type: 'Family Law · Video Call · Today',
    status: 'confirmed',
  },
  {
    id: 'c2',
    time: '2:30',
    ampm: 'PM',
    name: 'New Client — Pro Bono',
    type: 'Civil Rights · In-person · Today',
    status: 'pending',
  },
  {
    id: 'c3',
    time: '11:00',
    ampm: 'AM',
    name: 'Ramesh Chauhan',
    type: 'Labour Rights · Phone · Mon 25 May',
    status: 'confirmed',
  },
  {
    id: 'c4',
    time: '3:00',
    ampm: 'PM',
    name: 'Ananya Desai',
    type: 'Property Law · Video Call · Tue 26 May',
    status: 'confirmed',
  },
]

export const CLIENT_NOTIFICATIONS: DashboardNotification[] = [
  {
    id: 'n1',
    icon: 'case',
    html: '<strong>Adv. Priya Mehta</strong> accepted your Child Custody case and sent a message.',
    time: '15 minutes ago',
    unread: true,
  },
  {
    id: 'n2',
    icon: 'case',
    html: '<strong>2 new lawyers</strong> applied to your Land Dispute case. Review their profiles.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'n3',
    icon: 'msg',
    html: 'Your <strong>AI conversation</strong> about easement rights has been saved to your history.',
    time: 'Yesterday at 4:32 PM',
    unread: true,
  },
  {
    id: 'n4',
    icon: 'system',
    html: 'Your account was successfully <strong>verified</strong>. All features are now unlocked.',
    time: '2 days ago',
  },
  {
    id: 'n5',
    icon: 'alert',
    html: 'Case deadline reminder: <strong>Child Custody</strong> hearing on 26 May 2026.',
    time: '3 days ago',
  },
]

export const RECOMMENDED_LAWYERS: RecommendedLawyer[] = [
  {
    id: 'rl1',
    initials: 'LI',
    name: 'Adv. Lakshmi Iyer',
    meta: 'Family Law · Chennai · 91% success',
    match: '98% match',
  },
  {
    id: 'rl2',
    initials: 'VC',
    name: 'Adv. Vikram Choudhary',
    meta: 'Property Law · Jaipur · 88% success',
    match: '94% match',
  },
  {
    id: 'rl3',
    initials: 'MP',
    name: 'Adv. Meera Pillai',
    meta: 'Family Law · Kochi · 96% success',
    match: '91% match',
  },
]

export const AI_CHAT_PREVIEWS: AiChatPreview[] = [
  {
    id: 'ac1',
    title: 'land_agreement_rajasthan.pdf',
    subtitle: 'Easement rights explained · 8 messages',
    time: 'Today',
  },
  {
    id: 'ac2',
    title: 'rent_agreement_delhi.pdf',
    subtitle: 'Security deposit & notice period · 5 msgs',
    time: 'Yesterday',
  },
  {
    id: 'ac3',
    title: 'No document — General Query',
    subtitle: 'What are my rights as a tenant?',
    time: 'May 22',
  },
  {
    id: 'ac4',
    title: 'FIR_copy_district_court.pdf',
    subtitle: 'Understanding charges & rights',
    time: 'May 20',
  },
]

export const CALENDAR_EVENTS = [
  '10:00 — Sunita Rawat consultation',
  '14:30 — Delhi HC hearing',
]

export const MINI_CALENDAR = {
  monthLabel: 'May 2026',
  today: 24,
  eventDays: [24, 26, 28],
  year: 2026,
  month: 4, // 0-indexed May
}
