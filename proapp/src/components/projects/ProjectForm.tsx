import { useEffect, useState } from 'react'
import type { Project, ProjectStatus } from '../../types/project'
import Button from '../ui/Button'
import { projectCreateSchema } from '../../schemas/project'

interface Props {
  initial?: Partial<Project>
  onSubmit: (data: { name: string; description?: string; status: ProjectStatus }) => void
}

type Errors = Partial<Record<'name' | 'description' | 'status', string>>
const statuses: ProjectStatus[] = ['planning', 'in-progress', 'done']

export default function ProjectForm({ initial, onSubmit }: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [status, setStatus] = useState<ProjectStatus>((initial?.status as ProjectStatus) ?? 'planning')
  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {
    setName(initial?.name ?? '')
    setDescription(initial?.description ?? '')
    setStatus((initial?.status as ProjectStatus) ?? 'planning')
  }, [initial])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = projectCreateSchema.safeParse({ name, description: description || undefined, status })
    if (!parsed.success) {
      const e: Errors = {}
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof Errors
        e[k] = i.message
      })
      setErrors(e)
      return
    }
    setErrors({})
    onSubmit(parsed.data)
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="text-sm opacity-70">Nombre</label>
        <input
          className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nuevo proyecto"
        />
        {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm opacity-70">Descripción</label>
        <textarea
          className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm opacity-70">Estado</label>
        <select
          className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.status && <p className="text-xs text-red-600">{errors.status}</p>}
      </div>
      <Button type="submit">Guardar</Button>
    </form>
  )
}