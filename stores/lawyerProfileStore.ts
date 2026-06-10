import { create } from 'zustand'

interface LawyerProfileState {
  connected: boolean
  calWeekOffset: number
  selectedSlot: string | null
  toggleConnect: () => void
  shiftWeek: (dir: -1 | 1) => void
  selectSlot: (key: string) => void
  clearSelectedSlot: () => void
}

export const useLawyerProfileStore = create<LawyerProfileState>((set) => ({
  connected: false,
  calWeekOffset: 0,
  selectedSlot: null,

  toggleConnect: () => set((s) => ({ connected: !s.connected })),

  shiftWeek: (dir) => set((s) => ({ calWeekOffset: s.calWeekOffset + dir })),

  selectSlot: (key) => set({ selectedSlot: key }),

  clearSelectedSlot: () => set({ selectedSlot: null }),
}))
