import { create } from 'zustand'
import type { UserRole } from '@/types'

export type DashboardView = 'overview' | 'my-cases' | 'active-cases'

interface DashboardState {
  viewRole: UserRole
  dashboardView: DashboardView
  search: string
  setViewRole: (role: UserRole) => void
  setDashboardView: (view: DashboardView) => void
  setSearch: (search: string) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  viewRole: 'lawyer',
  dashboardView: 'overview',
  search: '',
  setViewRole: (role) => set({ viewRole: role, dashboardView: 'overview' }),
  setDashboardView: (view) => set({ dashboardView: view }),
  setSearch: (search) => set({ search }),
}))
