export type ProjectStatus = 'planning' | 'in-progress' | 'done'

export interface Project {
  id: string
  name: string
  description?: string
  status: ProjectStatus
  createdAt: string
  updatedAt: string
}