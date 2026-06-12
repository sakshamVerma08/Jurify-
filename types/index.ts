export interface TrustBadge {
  id: string
  label: string
  icon: 'shield' | 'lock' | 'users'
}

export interface HeroDashboardStat {
  value: number
  label: string
  change: number
}

export interface HeroRecommendedCase {
  id: string
  tags: { label: string; variant: 'primary' | 'muted' }[]
  title: string
  description: string
  location: string
  deadline: string
}

export interface HeroStatItem {
  id: string
  value: string
  numericValue?: number
  suffix?: string
  label: string
  sublabel: string
  icon: 'lawyers' | 'cases' | 'domains'
}

export interface MarqueeItem {
  id: string
  label: string
}

export interface AudiencePanel {
  id: string
  number: string
  title: string
  description: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  icon: 'lawyer' | 'citizen'
}

export interface HowItWorksStep {
  id: string
  number: string
  title: string
  description: string
  icon: 'upload' | 'index' | 'ask'
}

export interface ProBonoCase {
  id: string
  priority: 'high' | 'medium' | 'open'
  priorityLabel: string
  practiceArea: string
  postedAgo: string
  title: string
  organization: string
  location: string
  contact: string
  tags: string[]
}

export interface ProBonoProgram {
  id: string
  title: string
  description: string
  volunteers: number
  impact: string
  highlighted?: boolean
}

export interface AIFeature {
  id: string
  title: string
  description: string
  icon: 'check' | 'domains' | 'free' | 'followup'
}

export interface AIChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  highlight?: string
}

export interface NavLink {
  id: string
  label: string
  href: string
  icon: 'cases' | 'lawyer' | 'ai' | 'dashboard' | 'insights'
  variant?: 'default' | 'ai'
}

export type LoginPanel = 'login' | 'otp' | 'forgot'

export type ToastType = 'ok' | 'err' | 'info'

export type UserRole = 'lawyer' | 'client'

export type RegisterStep = 1 | 2 | 3 | 4

export interface RoleOption {
  id: UserRole
  title: string
  description: string
  tags: string[]
  icon: 'lawyer' | 'client'
}

export interface PhoneCountryCode {
  id: string
  label: string
  value: string
}

export interface BarCouncilState {
  id: string
  name: string
}

export interface FooterLink {
  id: string
  label: string
  href: string
}

export type CaseStage = 'initial' | 'investigation' | 'hearing' | 'trial' | 'verdict'

export type CaseUrgency = 'high' | 'medium' | 'low'

export type CaseSortOption = 'newest' | 'deadline' | 'relevant'

export type CasesTab = 'browse' | 'applications' | 'active' | 'mycases'

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected'

export interface CasePoster {
  name: string
  initials: string
  role: string
}

export interface LegalCase {
  id: string
  title: string
  category: string
  stage: CaseStage
  stageLabel: string
  urgency: CaseUrgency
  location: string
  incidentDate: string
  deadline: string
  description: string
  opposingParty: string
  poster: CasePoster
  postedAgo: string
}

export interface CaseApplication {
  id: string
  caseId: string
  title: string
  category: string
  location: string
  appliedAgo: string
  status: ApplicationStatus
  statusLabel: string
}

export interface ActiveCaseItem {
  id: string
  title: string
  category: string
  location: string
  clientName: string
  nextEvent: string
  stage: CaseStage
  stageLabel: string
  progressStep: number
}

export interface MyPostedCase {
  id: string
  title: string
  category: string
  location: string
  postedAgo: string
  stage: CaseStage
  stageLabel: string
  progressStep: number
  applicantInitials: string[]
  applicantCount: number
  description?: string
  incidentDate?: string
  deadline?: string
  opposingName?: string
  opposingRelationship?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
  assignedLawyerId?: string | null
  assignedLawyerName?: string | null
  applicantsDetail?: Array<{
    id: string
    name: string
    initials: string
    rating: number
    experience: number
    bio: string
  }>
}

export interface CaseFilters {
  categories: string[]
  urgencies: CaseUrgency[]
  location: string
  postedWithin: 'any' | '24h' | '7d' | '30d'
  stages: CaseStage[]
  search: string
  sort: CaseSortOption
}

export const CASE_CATEGORIES = [
  'Family Law',
  'Property Law',
  'Criminal Law',
  'Labour Rights',
  'Civil Rights',
  'Consumer Protection',
  'Cyber Law',
  'Immigration Law',
] as const

export const CASE_STAGES_FILTER = [
  { id: 'initial' as const, label: 'Initial Consultation' },
  { id: 'investigation' as const, label: 'Investigation' },
  { id: 'hearing' as const, label: 'Pre-Hearing' },
  { id: 'trial' as const, label: 'Trial' },
] as const

export const PROGRESS_STEPS = [
  'Intake',
  'Investigation',
  'Pre-Hearing',
  'Trial',
  'Verdict',
] as const

export type AiScreen = 'welcome' | 'chat'

export type AiHistoryGroup = 'today' | 'yesterday' | 'week'

export type AiQuickAction = 'summarize' | 'compare' | 'keyterms' | 'risks' | 'obligations'

export interface AiLanguage {
  id: string
  label: string
}

export interface AiChatHistoryItem {
  id: string
  title: string
  subtitle: string
  group: AiHistoryGroup
  hasDocument: boolean
}

export interface AiUploadedDocument {
  name: string
  size: number
  ext: string
  sizeLabel: string
  pages?: number
}

export interface AiMessage {
  id: string
  role: 'user' | 'ai'
  content: string
  followups?: string[]
  timestamp?: string
  showTime?: boolean
}

export type DashboardNavIcon =
  | 'dashboard'
  | 'cases'
  | 'lawyers'
  | 'ai'
  | 'applications'
  | 'mycases'
  | 'messages'
  | 'schedule'
  | 'profile'
  | 'settings'

export interface DashboardNavItem {
  id: string
  label: string
  href: string
  icon: DashboardNavIcon
  badge?: number | string
  badgeVariant?: 'default' | 'danger'
  lawyerOnly?: boolean
  dynamicLabel?: 'activeCases' | 'myCases'
}

export interface DashboardUserProfile {
  initials: string
  name: string
  roleLabel: string
  greeting: string
}

export interface DashboardStat {
  id: string
  value: string
  label: string
  sub: string
  change?: string
  changeDirection?: 'up' | 'down' | 'neutral'
  iconVariant: 'gold' | 'blue' | 'green' | 'red'
}

export interface DashboardProgressStep {
  label: string
  status: 'done' | 'active' | 'pending'
}

export interface DashboardCaseItem {
  id: string
  title: string
  category: string
  stage: string
  stageVariant?: 'hearing' | 'investigation' | 'trial' | 'open' | 'default'
  deadline: string
  deadlineUrgent?: boolean
  lawyerNote?: string
  applicantNote?: string
  steps: DashboardProgressStep[]
}

export interface DashboardMessage {
  id: string
  initials: string
  name: string
  preview: string
  time: string
  unread?: boolean
  avatarStyle?: 'default' | 'support'
}

export interface DashboardConsultation {
  id: string
  time: string
  ampm: string
  name: string
  type: string
  status: 'confirmed' | 'pending'
}

export interface DashboardNotification {
  id: string
  icon: 'case' | 'msg' | 'system' | 'alert'
  html: string
  time: string
  unread?: boolean
}

export interface RecommendedLawyer {
  id: string
  initials: string
  name: string
  meta: string
  match: string
}

export interface AiChatPreview {
  id: string
  title: string
  subtitle: string
  time: string
}

export interface DonutSegment {
  label: string
  pct: number
  color: string
}

export interface LawyerProfileStat {
  id: string
  label: string
  sub: string
  type: 'circle' | 'counter'
  value: number
  suffix?: string
  circlePct?: number
}

export interface LawyerCredential {
  label: string
  value: string
  sub: string
  spanFull?: boolean
}

export interface LawyerTestimonial {
  id: string
  authorInitial: string
  authorName: string
  caseLabel: string
  rating: number
  text: string
}

export interface LawyerRatingBar {
  stars: number
  pct: number
  count: number
}

export interface LawyerBlogPost {
  id: string
  tag: string
  title: string
  date: string
  readTime: string
  views: string
}

export interface LawyerSimilarLawyer {
  id: string
  initials: string
  name: string
  area: string
}

export interface LawyerConsultationFee {
  label: string
  amount: string
  highlight?: 'success'
}

export interface LawyerSidebarOverview {
  value: string
  sub: string
}

export interface LawyerProfile {
  id: string
  initials: string
  name: string
  degree: string
  practiceAreas: string[]
  location: string
  languages: string
  rating: number
  experienceYears: number
  connections: number
  proBonoAvailable: boolean
  bio: string[]
  videoLabel: string
  credentials: LawyerCredential[]
  practiceTags: string[]
  stats: LawyerProfileStat[]
  ratingBars: LawyerRatingBar[]
  reviewCount: number
  testimonials: LawyerTestimonial[]
  caseDistribution: DonutSegment[]
  totalCases: number
  blogPosts: LawyerBlogPost[]
  sidebarOverview: LawyerSidebarOverview[]
  consultationFees: LawyerConsultationFee[]
  similarLawyers: LawyerSimilarLawyer[]
  calendarBaseDate: string
  weeklySlots: Record<number, string[]>
  bookedSlots: string[]
}

export type LawyerAvailability = 'Both' | 'ProBono' | 'Paid'
export type LawyerConnectStatus = 'none' | 'pending' | 'connected'
export type LawyerSearchViewMode = 'grid' | 'list'
export type LawyerSearchSortOption = 'relevant' | 'rating' | 'experience' | 'probono'
export type LawyerSearchRole = 'client' | 'lawyer'

export interface LawyerListing {
  id: string
  profileHref?: string
  name: string
  initials: string
  location: string
  experience: number
  areas: string[]
  languages: string[]
  verified: boolean
  successRate: number
  cases: number
  proBonoHours: number
  connections: number
  rating: number
  availability: LawyerAvailability
  bio: string
  connectStatus: LawyerConnectStatus
}

export type KycStep = 1 | 2 | 3 | 4

export type InsightView = 'listing' | 'post' | 'write' | 'my-posts'
export type InsightCategory =
  | 'All Topics'
  | 'Family Law'
  | 'Criminal Law'
  | 'Property Law'
  | 'Civil Rights'
  | 'Labour Rights'
  | 'Consumer'
  | 'Cyber Law'
export type InsightSortOption = 'latest' | 'reads' | 'likes'
export type InsightThumbVariant = '' | 'blue' | 'green' | 'purple'
export type InsightPostStatus = 'published' | 'draft' | 'under-review'

export interface InsightAuthor {
  name: string
  initials: string
  role: string
  verified: boolean
  profileHref?: string
  articleCount?: number
  bio?: string
}

export interface InsightArticle {
  id: string
  title: string
  excerpt: string
  subtitle?: string
  category: string
  categoryTab: InsightCategory
  thumbVariant: InsightThumbVariant
  author: InsightAuthor
  date: string
  readTime: string
  views: string
  viewsNum: number
  likes: number
  comments: number
  featured?: boolean
  tags?: string[]
  contentHtml?: string
}

export interface InsightComment {
  id: string
  authorInitial: string
  authorName: string
  authorHighlight?: boolean
  time: string
  text: string
  likes: number
  replies?: InsightComment[]
}

export interface InsightMyPost {
  id: string
  title: string
  category: string
  status: InsightPostStatus
  date: string
  views: string
  likes: number
  comments: number
}

export interface InsightRelatedPost {
  id: string
  title: string
  author: string
  readTime: string
}

export type KycDocumentId = 'aadhaar' | 'pan' | 'bar'

export interface KycUploadedFile {
  secure_url: string
  public_id: string
  name: string
  sizeLabel: string
}

export interface KycStepMeta {
  id: KycStep
  label: string
  description: string
}

export interface TocItem {
  id: string
  num: string
  label: string
}

export interface ProfileData {
  lawyerFirstName: string
  lawyerLastName: string
  lawyerEmail: string
  lawyerPhone: string
  lawyerDob: string
  lawyerCity: string
  lawyerState: string

  clientFirstName: string
  clientLastName: string
  clientEmail: string
  clientPhone: string
  clientDob: string
  clientCity: string
  clientState: string

  enrollmentNo: string
  barState: string
  enrollmentYear: string
  degree: string
  university: string
  experienceYears: string
  primaryCourt: string
  practiceAreas: string[]
  languages: string[]
  bio: string

  videoName: string | null
  videoDate: string | null

  lawyerPhotoUrl: string | null
  clientPhotoUrl: string | null

  theme: 'dark' | 'light' | 'auto'
  language: string
  timezone: string
  publicProfile: boolean
  showContactInfo: boolean
  showOnlineStatus: boolean
  searchableProfile: boolean
  compactMode: boolean
  keyboardShortcuts: boolean
  animationEffects: boolean
  aiResponseLanguage: string

  tfaEnabled: boolean
  sessions: Array<{ id: string; device: string; ip: string; location: string; current: boolean }>

  emailCases: boolean
  emailMessages: boolean
  emailRecs: boolean
  emailOffers: boolean
  pushNotifs: boolean
  smsNotifs: boolean
}

export interface SharedFile {
  id: string
  name: string
  sizeLabel: string
  type: string
  date: string
  secure?: boolean
}

export interface ChatMessage {
  id: string
  senderInitials: string
  senderName: string
  text?: string
  time: string
  own: boolean
  isRead?: boolean
  file?: SharedFile
}

export interface ChatConversation {
  id: string
  name: string
  initials: string
  role: string
  email: string
  phone: string
  since: string
  online: boolean
  unreadCount?: number
  activeCase?: string
  lastSeen?: string
  avatarColor?: string
  sharedFiles: SharedFile[]
  messages: ChatMessage[]
  archived?: boolean
}

// ── ADMIN PANEL MODELS ──
export type AdminUserRole = 'lawyer' | 'client' | 'admin'
export type AdminUserStatus = 'active' | 'suspended' | 'pending'
export type AdminVerificationStatus = 'pending' | 'approved' | 'rejected'
export type AdminCaseStatus = 'open' | 'active' | 'resolved' | 'flagged'
export type AdminBlogStatus = 'published' | 'draft' | 'under-review' | 'featured'
export type AdminReportStatus = 'open' | 'resolved' | 'dismissed'
export type AdminLogType = 'user' | 'verify' | 'case' | 'blog' | 'security' | 'system'

export interface AdminUser {
  id: string
  name: string
  initials: string
  email: string
  role: AdminUserRole
  joinedDate: string
  status: AdminUserStatus
  casesCount: number
}

export interface AdminVerificationDoc {
  name: string
  status: 'pending' | 'verified' | 'rejected'
  key: string
}

export interface AdminVerification {
  id: string
  applicantName: string
  applicantInitials: string
  applicantEmail: string
  enrollmentNo: string
  barCouncil: string
  submittedDate: string
  status: AdminVerificationStatus
  documents: AdminVerificationDoc[]
}

export interface AdminCase {
  id: string
  title: string
  category: string
  clientName: string
  lawyerName: string
  postedDate: string
  status: AdminCaseStatus
}

export interface AdminBlogPost {
  id: string
  title: string
  authorName: string
  authorRole: string
  category: string
  publishedDate: string
  views: number
  likes: number
  status: AdminBlogStatus
}

export interface AdminUserReport {
  id: string
  reportedContent: string
  type: string
  reportedBy: string
  date: string
  priority: 'high' | 'medium' | 'low'
  status: AdminReportStatus
}

export interface AdminAuditLog {
  id: string
  timestamp: string
  actionType: AdminLogType
  description: string
  doneBy: string
}

export interface AdminStats {
  totalUsers: number
  totalUsersChange: number
  verifiedLawyers: number
  verifiedLawyersChange: number
  totalCases: number
  totalCasesChange: number
  activeSessions: number
  activeSessionsChange: number
}

export interface AdminGrowthData {
  month: string
  value: number
}

export interface AdminDistributionData {
  label: string
  pct: number
  color: string
}



