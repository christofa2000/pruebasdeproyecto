import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../components/ui/Button'
import ProjectForm from '../components/projects/ProjectForm'
import { useProjectsStore } from '../store/projects'
import type { ProjectStatus } from '../types/project'
import { useUIStore } from '../store/ui'         // ← toasts
import { sleep } from '../utils/async'           // ← latencia simulada

export default function Projects() {
  const projects = useProjectsStore((s) => s.items)
  const add     = useProjectsStore((s) => s.add)
  const update  = useProjectsStore((s) => s.update)
  const remove  = useProjectsStore((s) => s.remove)
  const pushToast = useUIStore((s) => s.push)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all')
  const [loading, setLoading] = useState<'add' | 'update' | 'remove' | null>(null)

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesQ = !ql || p.name.toLowerCase().includes(ql) || p.description?.toLowerCase().includes(ql)
      const matchesStatus = status === 'all' || p.status === status
      return matchesQ && matchesStatus
    })
  }, [projects, q, status])

  async function handleAdd(data: { name: string; description?: string; status: ProjectStatus }) {
    try {
      setLoading('add')
      await sleep(300)
      add(data)
      pushToast({ title: 'Proyecto creado', variant: 'success' })
    } finally {
      setLoading(null)
    }
  }

  async function handleUpdate(id: string, data: any) {
    try {
      setLoading('update')
      await sleep(200)
      update(id, data)
      pushToast({ title: 'Proyecto actualizado', variant: 'success' })
    } finally {
      setLoading(null)
    }
  }

  async function handleRemove(id: string) {
    try {
      setLoading('remove')
      await sleep(150)
      remove(id)
      pushToast({ title: 'Proyecto eliminado', variant: 'info' })
    } finally {
      setLoading(null)
    }
  }

  return (
    <section className="space-y-6">
      {/* filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Proyectos</h2>
        <div className="flex gap-2">
          <input
            placeholder="Buscar…"
            className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:ring-2 focus:ring-brand-600"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:ring-2 focus:ring-brand-600"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="all">Todos</option>
            <option value="planning">planning</option>
            <option value="in-progress">in-progress</option>
            <option value="done">done</option>
          </select>
        </div>
      </div>

      {/* alta */}
      <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
        <h3 className="font-medium mb-3">Nuevo proyecto</h3>
        <ProjectForm onSubmit={handleAdd} />
        {loading === 'add' && <p className="text-sm opacity-70 mt-2">Guardando…</p>}
      </div>

      {/* lista */}
      <ul className="space-y-3">
        {filtered.map((p) => (
          <li key={p.id} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
            {editingId === p.id ? (
              <div className="space-y-2">
                <ProjectForm
                  initial={p}
                  onSubmit={(data) => handleUpdate(p.id, data)}
                />
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
                </div>
                {loading === 'update' && <p className="text-sm opacity-70">Actualizando…</p>}
              </div>
            ) : (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <NavLink to={`/projects/${p.id}`} className="font-medium hover:underline">
                    {p.name}
                  </NavLink>
                  {p.description && <p className="text-sm opacity-70">{p.description}</p>}
                  <p className="text-xs opacity-60 mt-1">
                    {p.status} • actualizado {new Date(p.updatedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setEditingId(p.id)}>Editar</Button>
                  <Button variant="ghost" onClick={() => handleRemove(p.id)} disabled={loading === 'remove'}>
                    {loading === 'remove' ? 'Eliminando…' : 'Eliminar'}
                  </Button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
