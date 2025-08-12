import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Project, ProjectStatus } from '../types/project'

const nowISO = () => new Date().toISOString()
const newId = () =>
  (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2))

interface ProjectsState {
  items: Project[]
  add: (data: { name: string; description?: string; status?: ProjectStatus }) => string
  update: (id: string, data: Partial<Omit<Project, 'id' | 'createdAt'>>) => void
  remove: (id: string) => void
  clear: () => void
}

const seed: Project[] = [
  { id: 'demo-1', name: 'Landing ProApp', description: 'Marketing site', status: 'in-progress', createdAt: nowISO(), updatedAt: nowISO() },
  { id: 'demo-2', name: 'Design System', description: 'Tokens + componentes', status: 'planning', createdAt: nowISO(), updatedAt: nowISO() },
]

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      items: seed,
      add: ({ name, description, status = 'planning' }) => {
        const id = newId()
        const project: Project = { id, name, description, status, createdAt: nowISO(), updatedAt: nowISO() }
        set({ items: [project, ...get().items] })
        return id
      },
      update: (id, data) => {
        set({
          items: get().items.map((p) => (p.id === id ? { ...p, ...data, updatedAt: nowISO() } : p)),
        })
      },
      remove: (id) => set({ items: get().items.filter((p) => p.id !== id) }),
      clear: () => set({ items: [] }),
    }),
    { name: 'proapp-projects-v1' }
  )
)

// 👇 Estos exports resuelven tu error
export const useAllProjects = () => useProjectsStore((s) => s.items)
export const useProjectById = (id: string) => useProjectsStore((s) => s.items.find((p) => p.id === id))
