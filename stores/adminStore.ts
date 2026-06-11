import { create } from 'zustand'
import type {
  AdminUser,
  AdminVerification,
  AdminCase,
  AdminBlogPost,
  AdminUserReport,
  AdminAuditLog,
  AdminLogType
} from '@/types'
import {
  ADMIN_USERS,
  ADMIN_VERIFICATIONS,
  ADMIN_CASES,
  ADMIN_BLOGS,
  ADMIN_REPORTS,
  ADMIN_LOGS
} from '@/lib/data/admin'

type AdminTab = 'overview' | 'users' | 'verifications' | 'cases' | 'blogs' | 'reports' | 'logs' | 'settings'

interface AdminState {
  currentTab: AdminTab
  setCurrentTab: (tab: AdminTab) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // Data lists
  users: AdminUser[]
  verifications: AdminVerification[]
  cases: AdminCase[]
  blogs: AdminBlogPost[]
  reports: AdminUserReport[]
  logs: AdminAuditLog[]
  
  // Selected items
  selectedVerification: AdminVerification | null
  setSelectedVerification: (v: AdminVerification | null) => void
  rejectReason: string
  setRejectReason: (reason: string) => void
  
  // Filters
  roleFilter: string
  setRoleFilter: (role: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  typeFilter: string
  setTypeFilter: (type: string) => void

  // Actions
  suspendUser: (id: string) => void
  activateUser: (id: string) => void
  approveVerification: (id: string) => void
  rejectVerification: (id: string, reason: string) => void
  flagCase: (id: string) => void
  resolveCase: (id: string) => void
  deleteCase: (id: string) => void
  featureBlog: (id: string) => void
  deleteBlog: (id: string) => void
  publishBlog: (id: string) => void
  resolveReport: (id: string) => void
  dismissReport: (id: string) => void
  addAuditLog: (actionType: AdminLogType, description: string, doneBy?: string) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  currentTab: 'overview',
  setCurrentTab: (tab) => set({ 
    currentTab: tab, 
    searchQuery: '', 
    roleFilter: 'All Roles', 
    statusFilter: 'All Status', 
    categoryFilter: 'All Categories', 
    typeFilter: tab === 'reports' ? 'All Types' : 'All Action Types' 
  }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  users: ADMIN_USERS,
  verifications: ADMIN_VERIFICATIONS,
  cases: ADMIN_CASES,
  blogs: ADMIN_BLOGS,
  reports: ADMIN_REPORTS,
  logs: ADMIN_LOGS,
  
  selectedVerification: null,
  setSelectedVerification: (v) => set({ selectedVerification: v, rejectReason: '' }),
  rejectReason: '',
  setRejectReason: (reason) => set({ rejectReason: reason }),
  
  roleFilter: 'All Roles',
  setRoleFilter: (role) => set({ roleFilter: role }),
  statusFilter: 'All Status',
  setStatusFilter: (status) => set({ statusFilter: status }),
  categoryFilter: 'All Categories',
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  typeFilter: 'All Action Types',
  setTypeFilter: (type) => set({ typeFilter: type }),

  suspendUser: (id) => set((state) => {
    const user = state.users.find(u => u.id === id);
    if (!user) return {};
    
    // Add audit log
    const logDesc = `User <strong>${user.name}</strong> was suspended`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'security',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      users: state.users.map(u => u.id === id ? { ...u, status: 'suspended' } : u),
      logs: [newLog, ...state.logs]
    };
  }),

  activateUser: (id) => set((state) => {
    const user = state.users.find(u => u.id === id);
    if (!user) return {};
    
    const logDesc = `User <strong>${user.name}</strong> status changed to Active`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'user',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      users: state.users.map(u => u.id === id ? { ...u, status: 'active' } : u),
      logs: [newLog, ...state.logs]
    };
  }),

  approveVerification: (id) => set((state) => {
    const verification = state.verifications.find(v => v.id === id);
    if (!verification) return {};
    
    const logDesc = `Verification request for <strong>${verification.applicantName}</strong> approved`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'verify',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      verifications: state.verifications.map(v => v.id === id ? { ...v, status: 'approved' } : v),
      users: state.users.map(u => u.email === verification.applicantEmail ? { ...u, status: 'active' } : u),
      logs: [newLog, ...state.logs],
      selectedVerification: null
    };
  }),

  rejectVerification: (id, reason) => set((state) => {
    const verification = state.verifications.find(v => v.id === id);
    if (!verification) return {};
    
    const logDesc = `Verification request for <strong>${verification.applicantName}</strong> rejected: ${reason}`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'verify',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      verifications: state.verifications.map(v => v.id === id ? { ...v, status: 'rejected' } : v),
      logs: [newLog, ...state.logs],
      selectedVerification: null
    };
  }),

  flagCase: (id) => set((state) => {
    const kase = state.cases.find(c => c.id === id);
    if (!kase) return {};
    
    const logDesc = `Case <strong>${kase.title}</strong> flagged for content moderation`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'case',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      cases: state.cases.map(c => c.id === id ? { ...c, status: 'flagged' } : c),
      logs: [newLog, ...state.logs]
    };
  }),

  resolveCase: (id) => set((state) => {
    const kase = state.cases.find(c => c.id === id);
    if (!kase) return {};
    
    const logDesc = `Case <strong>${kase.title}</strong> moderation resolved`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'case',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      cases: state.cases.map(c => c.id === id ? { ...c, status: 'active' } : c),
      logs: [newLog, ...state.logs]
    };
  }),

  deleteCase: (id) => set((state) => {
    const kase = state.cases.find(c => c.id === id);
    if (!kase) return {};
    
    const logDesc = `Case <strong>${kase.title}</strong> was deleted from directory`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'case',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      cases: state.cases.filter(c => c.id !== id),
      logs: [newLog, ...state.logs]
    };
  }),

  featureBlog: (id) => set((state) => {
    const post = state.blogs.find(b => b.id === id);
    if (!post) return {};
    
    const logDesc = `Blog post <strong>${post.title}</strong> set as featured article`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'blog',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      blogs: state.blogs.map(b => b.id === id ? { ...b, status: 'featured' } : b),
      logs: [newLog, ...state.logs]
    };
  }),

  deleteBlog: (id) => set((state) => {
    const post = state.blogs.find(b => b.id === id);
    if (!post) return {};
    
    const logDesc = `Blog post <strong>${post.title}</strong> was deleted`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'blog',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      blogs: state.blogs.filter(b => b.id !== id),
      logs: [newLog, ...state.logs]
    };
  }),

  publishBlog: (id) => set((state) => {
    const post = state.blogs.find(b => b.id === id);
    if (!post) return {};
    
    const logDesc = `Blog post <strong>${post.title}</strong> approved and published`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'blog',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      blogs: state.blogs.map(b => b.id === id ? { ...b, status: 'published' } : b),
      logs: [newLog, ...state.logs]
    };
  }),

  resolveReport: (id) => set((state) => {
    const report = state.reports.find(r => r.id === id);
    if (!report) return {};
    
    const logDesc = `Report on <strong>${report.reportedContent}</strong> marked as Resolved`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'security',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      reports: state.reports.map(r => r.id === id ? { ...r, status: 'resolved' } : r),
      logs: [newLog, ...state.logs]
    };
  }),

  dismissReport: (id) => set((state) => {
    const report = state.reports.find(r => r.id === id);
    if (!report) return {};
    
    const logDesc = `Report on <strong>${report.reportedContent}</strong> was dismissed`;
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'security',
      description: logDesc,
      doneBy: 'Super Admin'
    };
    
    return {
      reports: state.reports.map(r => r.id === id ? { ...r, status: 'dismissed' } : r),
      logs: [newLog, ...state.logs]
    };
  }),

  addAuditLog: (actionType, description, doneBy = 'Super Admin') => set((state) => {
    const newLog: AdminAuditLog = {
      id: `l-gen-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType,
      description,
      doneBy
    };
    return {
      logs: [newLog, ...state.logs]
    };
  })
}))
