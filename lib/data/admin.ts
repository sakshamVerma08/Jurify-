import type {
  AdminUser,
  AdminVerification,
  AdminCase,
  AdminBlogPost,
  AdminUserReport,
  AdminAuditLog,
  AdminStats,
  AdminGrowthData,
  AdminDistributionData
} from '@/types'

export const ADMIN_STATS: AdminStats = {
  totalUsers: 12847,
  totalUsersChange: 124,
  verifiedLawyers: 2341,
  verifiedLawyersChange: 38,
  totalCases: 8426,
  totalCasesChange: 82,
  activeSessions: 1034,
  activeSessionsChange: 92
}

export const ADMIN_GROWTH: AdminGrowthData[] = [
  { month: 'Jan', value: 820 },
  { month: 'Feb', value: 1250 },
  { month: 'Mar', value: 1840 },
  { month: 'Apr', value: 2300 },
  { month: 'May', value: 2847 },
  { month: 'Jun', value: 3400 }
]

export const ADMIN_DISTRIBUTION: AdminDistributionData[] = [
  { label: 'Family Law', pct: 35, color: '#D4853A' },
  { label: 'Criminal Law', pct: 25, color: '#f06464' },
  { label: 'Property Law', pct: 20, color: '#E8A44A' },
  { label: 'Labour Rights', pct: 12, color: 'rgba(100,150,255,0.9)' },
  { label: 'Others', pct: 8, color: '#4ade80' }
]

export const ADMIN_USERS: AdminUser[] = [
  {
    id: 'u1',
    name: 'Adv. Ramesh Chauhan',
    initials: 'RC',
    email: 'ramesh.c@jurify.in',
    role: 'lawyer',
    joinedDate: '12 Jan 2024',
    status: 'active',
    casesCount: 24
  },
  {
    id: 'u2',
    name: 'Adv. Anita Kapoor',
    initials: 'AK',
    email: 'anita.k@jurify.in',
    role: 'lawyer',
    joinedDate: '05 Mar 2024',
    status: 'active',
    casesCount: 18
  },
  {
    id: 'u3',
    name: 'Rajesh Sharma',
    initials: 'RS',
    email: 'rajesh.sharma@gmail.com',
    role: 'client',
    joinedDate: '20 Apr 2025',
    status: 'active',
    casesCount: 3
  },
  {
    id: 'u4',
    name: 'Adv. Priya Mehta',
    initials: 'PM',
    email: 'priya.mehta@jurify.in',
    role: 'lawyer',
    joinedDate: '15 May 2025',
    status: 'active',
    casesCount: 12
  },
  {
    id: 'u5',
    name: 'Sunita Rawat',
    initials: 'SR',
    email: 'sunita.rawat@gmail.com',
    role: 'client',
    joinedDate: '18 May 2026',
    status: 'active',
    casesCount: 1
  },
  {
    id: 'u6',
    name: 'Vikram Singh',
    initials: 'VS',
    email: 'vikram.singh@yahoo.com',
    role: 'client',
    joinedDate: '10 Feb 2026',
    status: 'suspended',
    casesCount: 0
  },
  {
    id: 'u7',
    name: 'Neha Gupta',
    initials: 'NG',
    email: 'neha.gupta@outlook.com',
    role: 'client',
    joinedDate: '01 Jun 2026',
    status: 'pending',
    casesCount: 0
  },
  {
    id: 'u8',
    name: 'Adv. Sunil Verma',
    initials: 'SV',
    email: 'sunil.verma@jurify.in',
    role: 'lawyer',
    joinedDate: '04 Jun 2026',
    status: 'pending',
    casesCount: 0
  }
]

export const ADMIN_VERIFICATIONS: AdminVerification[] = [
  {
    id: 'v1',
    applicantName: 'Adv. Priya Mehta',
    applicantInitials: 'PM',
    applicantEmail: 'priya.mehta@jurify.in',
    enrollmentNo: 'MAH/1234/2018',
    barCouncil: 'Maharashtra & Goa',
    submittedDate: '2 hours ago',
    status: 'pending',
    documents: [
      { name: 'Aadhaar Card', status: 'verified', key: 'aadhaar' },
      { name: 'PAN Card', status: 'verified', key: 'pan' },
      { name: 'Bar Certificate', status: 'pending', key: 'bar' }
    ]
  },
  {
    id: 'v2',
    applicantName: 'Adv. Sunil Verma',
    applicantInitials: 'SV',
    applicantEmail: 'sunil.verma@jurify.in',
    enrollmentNo: 'D/5678/2020',
    barCouncil: 'Delhi Bar Council',
    submittedDate: '1 day ago',
    status: 'pending',
    documents: [
      { name: 'Aadhaar Card', status: 'pending', key: 'aadhaar' },
      { name: 'PAN Card', status: 'pending', key: 'pan' },
      { name: 'Bar Certificate', status: 'pending', key: 'bar' }
    ]
  },
  {
    id: 'v3',
    applicantName: 'Adv. Vikram Choudhary',
    applicantInitials: 'VC',
    applicantEmail: 'vikram.c@jurify.in',
    enrollmentNo: 'RAJ/9012/2015',
    barCouncil: 'Rajasthan Bar Council',
    submittedDate: '2 days ago',
    status: 'approved',
    documents: [
      { name: 'Aadhaar Card', status: 'verified', key: 'aadhaar' },
      { name: 'PAN Card', status: 'verified', key: 'pan' },
      { name: 'Bar Certificate', status: 'verified', key: 'bar' }
    ]
  },
  {
    id: 'v4',
    applicantName: 'Adv. Lakshmi Iyer',
    applicantInitials: 'LI',
    applicantEmail: 'lakshmi.i@jurify.in',
    enrollmentNo: 'TN/3456/2012',
    barCouncil: 'Tamil Nadu Bar Council',
    submittedDate: '3 days ago',
    status: 'approved',
    documents: [
      { name: 'Aadhaar Card', status: 'verified', key: 'aadhaar' },
      { name: 'PAN Card', status: 'verified', key: 'pan' },
      { name: 'Bar Certificate', status: 'verified', key: 'bar' }
    ]
  },
  {
    id: 'v5',
    applicantName: 'Adv. Ramesh Chauhan',
    applicantInitials: 'RC',
    applicantEmail: 'ramesh.c@jurify.in',
    enrollmentNo: 'UP/7890/2010',
    barCouncil: 'Uttar Pradesh Bar Council',
    submittedDate: '4 days ago',
    status: 'approved',
    documents: [
      { name: 'Aadhaar Card', status: 'verified', key: 'aadhaar' },
      { name: 'PAN Card', status: 'verified', key: 'pan' },
      { name: 'Bar Certificate', status: 'verified', key: 'bar' }
    ]
  },
  {
    id: 'v6',
    applicantName: 'Adv. Anita Kapoor',
    applicantInitials: 'AK',
    applicantEmail: 'anita.k@jurify.in',
    enrollmentNo: 'PH/2345/2014',
    barCouncil: 'Punjab & Haryana',
    submittedDate: '5 days ago',
    status: 'approved',
    documents: [
      { name: 'Aadhaar Card', status: 'verified', key: 'aadhaar' },
      { name: 'PAN Card', status: 'verified', key: 'pan' },
      { name: 'Bar Certificate', status: 'verified', key: 'bar' }
    ]
  },
  {
    id: 'v7',
    applicantName: 'Adv. Rahul Sen',
    applicantInitials: 'RS',
    applicantEmail: 'rahul.sen@jurify.in',
    enrollmentNo: 'WB/8901/2019',
    barCouncil: 'West Bengal Bar Council',
    submittedDate: '1 week ago',
    status: 'rejected',
    documents: [
      { name: 'Aadhaar Card', status: 'verified', key: 'aadhaar' },
      { name: 'PAN Card', status: 'rejected', key: 'pan' },
      { name: 'Bar Certificate', status: 'rejected', key: 'bar' }
    ]
  }
]

export const ADMIN_CASES: AdminCase[] = [
  {
    id: 'c1',
    title: 'Child Custody Dispute',
    category: 'Family Law',
    clientName: 'Sunita Rawat',
    lawyerName: 'Adv. Priya Mehta',
    postedDate: '2 days ago',
    status: 'active'
  },
  {
    id: 'c2',
    title: 'Land Encroachment Case',
    category: 'Property Law',
    clientName: 'Ramesh Chauhan',
    lawyerName: 'Adv. Vikram Choudhary',
    postedDate: '5 days ago',
    status: 'active'
  },
  {
    id: 'c3',
    title: 'Illegal Termination Appeal',
    category: 'Labour Rights',
    clientName: 'Anita Kapoor',
    lawyerName: 'Adv. Lakshmi Iyer',
    postedDate: '1 week ago',
    status: 'active'
  },
  {
    id: 'c4',
    title: 'Unpaid Salary Recovery',
    category: 'Labour Rights',
    clientName: 'Rajesh Sharma',
    lawyerName: 'None',
    postedDate: '3 days ago',
    status: 'open'
  },
  {
    id: 'c5',
    title: 'Consumer Court Fraud',
    category: 'Consumer Protection',
    clientName: 'Vikram Singh',
    lawyerName: 'None',
    postedDate: '4 days ago',
    status: 'flagged'
  },
  {
    id: 'c6',
    title: 'Cyber Defamation FIR',
    category: 'Cyber Law',
    clientName: 'Neha Gupta',
    lawyerName: 'Adv. Priya Mehta',
    postedDate: '6 days ago',
    status: 'resolved'
  },
  {
    id: 'c7',
    title: 'Rent Dispute',
    category: 'Property Law',
    clientName: 'Rajesh Sharma',
    lawyerName: 'Adv. Ramesh Chauhan',
    postedDate: '1 week ago',
    status: 'resolved'
  }
]

export const ADMIN_BLOGS: AdminBlogPost[] = [
  {
    id: 'b1',
    title: 'Understanding Easement Rights in Rajasthan',
    authorName: 'Adv. Vikram Choudhary',
    authorRole: 'Lawyer · Verified',
    category: 'Property Law',
    publishedDate: '2 days ago',
    views: 342,
    likes: 45,
    status: 'published'
  },
  {
    id: 'b2',
    title: 'Tenant Rights in Delhi NCR: A Guide',
    authorName: 'Adv. Priya Mehta',
    authorRole: 'Lawyer · Verified',
    category: 'Property Law',
    publishedDate: '5 days ago',
    views: 512,
    likes: 82,
    status: 'published'
  },
  {
    id: 'b3',
    title: 'How to File a Consumer Complaint',
    authorName: 'Adv. Ramesh Chauhan',
    authorRole: 'Lawyer · Verified',
    category: 'Civil Rights',
    publishedDate: '1 week ago',
    views: 289,
    likes: 34,
    status: 'published'
  },
  {
    id: 'b4',
    title: 'Rights of Women in Custody Battles',
    authorName: 'Adv. Priya Mehta',
    authorRole: 'Lawyer · Verified',
    category: 'Family Law',
    publishedDate: '3 days ago',
    views: 0,
    likes: 0,
    status: 'under-review'
  },
  {
    id: 'b5',
    title: 'Employer Obligations under Maternity Act',
    authorName: 'Adv. Lakshmi Iyer',
    authorRole: 'Lawyer · Verified',
    category: 'Labour Rights',
    publishedDate: '6 days ago',
    views: 0,
    likes: 0,
    status: 'draft'
  },
  {
    id: 'b6',
    title: 'Understanding Bail Provisions in India',
    authorName: 'Adv. Sunil Verma',
    authorRole: 'Lawyer · Verified',
    category: 'Criminal Law',
    publishedDate: '1 week ago',
    views: 412,
    likes: 56,
    status: 'published'
  },
  {
    id: 'b7',
    title: 'Property Mutation Process Explained',
    authorName: 'Adv. Vikram Choudhary',
    authorRole: 'Lawyer · Verified',
    category: 'Property Law',
    publishedDate: '10 days ago',
    views: 612,
    likes: 94,
    status: 'featured'
  }
]

export const ADMIN_REPORTS: AdminUserReport[] = [
  {
    id: 'r1',
    reportedContent: 'Blog Post: "Employer Obligations under Maternity Act"',
    type: 'Inappropriate Content',
    reportedBy: 'Ramesh Chauhan',
    date: '1 day ago',
    priority: 'high',
    status: 'open'
  },
  {
    id: 'r2',
    reportedContent: 'Case Listing: "Consumer Court Fraud"',
    type: 'Spam Case',
    reportedBy: 'Adv. Priya Mehta',
    date: '2 days ago',
    priority: 'medium',
    status: 'open'
  },
  {
    id: 'r3',
    reportedContent: 'User Account: Vikram Singh',
    type: 'Fake Profile',
    reportedBy: 'Anita Kapoor',
    date: '3 days ago',
    priority: 'high',
    status: 'open'
  },
  {
    id: 'r4',
    reportedContent: 'User Account: Rajesh Sharma',
    type: 'Fraud',
    reportedBy: 'Sunita Rawat',
    date: '1 week ago',
    priority: 'low',
    status: 'dismissed'
  },
  {
    id: 'r5',
    reportedContent: 'Blog Post: "Tenant Rights in Delhi NCR"',
    type: 'Spam Case',
    reportedBy: 'Adv. Sunil Verma',
    date: '2 weeks ago',
    priority: 'low',
    status: 'resolved'
  }
]

export const ADMIN_LOGS: AdminAuditLog[] = [
  {
    id: 'l1',
    timestamp: '2026-06-08T18:38:35Z',
    actionType: 'user',
    description: 'User <strong>Rajesh Sharma</strong> status changed to Active',
    doneBy: 'Super Admin'
  },
  {
    id: 'l2',
    timestamp: '2026-06-08T17:48:35Z',
    actionType: 'verify',
    description: 'Application by <strong>Adv. Priya Mehta</strong> documents reviewed',
    doneBy: 'Super Admin'
  },
  {
    id: 'l3',
    timestamp: '2026-06-08T16:48:35Z',
    actionType: 'case',
    description: 'Case <strong>Consumer Court Fraud</strong> flagged as spam',
    doneBy: 'Super Admin'
  },
  {
    id: 'l4',
    timestamp: '2026-06-08T15:48:35Z',
    actionType: 'blog',
    description: 'Blog post <strong>Understanding Easement Rights in Rajasthan</strong> published',
    doneBy: 'Adv. Vikram Choudhary'
  },
  {
    id: 'l5',
    timestamp: '2026-06-08T14:48:35Z',
    actionType: 'security',
    description: 'Multiple login failures detected for user <strong>Vikram Singh</strong>',
    doneBy: 'System'
  },
  {
    id: 'l6',
    timestamp: '2026-06-08T12:48:35Z',
    actionType: 'system',
    description: 'System cache cleared for performance tuning',
    doneBy: 'Super Admin'
  },
  {
    id: 'l7',
    timestamp: '2026-06-07T18:48:35Z',
    actionType: 'system',
    description: 'Required document requirements updated in KYC dashboard settings',
    doneBy: 'Super Admin'
  }
]

export const ADMIN_ACTIVITIES = [
  {
    id: 'a1',
    icon: 'verify' as const,
    text: '<strong>Adv. Priya Mehta</strong> submitted verification documents',
    time: '2 hours ago'
  },
  {
    id: 'a2',
    icon: 'case' as const,
    text: '<strong>Ramesh Chauhan</strong> created case: <strong>Land Encroachment Case</strong>',
    time: '5 hours ago'
  },
  {
    id: 'a3',
    icon: 'user' as const,
    text: '<strong>Anita Kapoor</strong> registered as a Lawyer',
    time: '1 day ago'
  },
  {
    id: 'a4',
    icon: 'alert' as const,
    text: '<strong>Vikram Singh</strong> was suspended (Security breach)',
    time: '2 days ago'
  },
  {
    id: 'a5',
    icon: 'blog' as const,
    text: '<strong>Adv. Vikram Choudhary</strong> published blog: <strong>Understanding Easement Rights</strong>',
    time: '3 days ago'
  }
]
