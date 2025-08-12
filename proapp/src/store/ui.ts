import { create } from 'zustand'

export type ToastVariant = 'success' | 'error' | 'info'
export interface Toast {
  id: string
  title: string
  variant?: ToastVariant
}

interface UIState {
  toasts: Toast[]
  push: (t: Omit<Toast, 'id'>) => void
  remove: (id: string) => void
  clear: () => void
}

const newId = () => (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2))

export const useUIStore = create<UIState>((set, get) => ({
  toasts: [],
  push: (t) => set({ toasts: [...get().toasts, { id: newId(), ...t }] }),
  remove: (id) => set({ toasts: get().toasts.filter((x) => x.id !== id) }),
  clear: () => set({ toasts: [] }),
}))