import { NavLink, useParams } from 'react-router-dom'
import { useProjectById } from '../store/projects'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = useProjectById(id || '')

  if (!project) {
    return (
      <div className="space-y-3">
        <p className="text-lg font-semibold">Proyecto no encontrado</p>
        <NavLink to="/projects" className="text-brand-600 hover:underline">Volver a Projects</NavLink>
      </div>
    )
  }

  return (
    <section className="space-y-3">
      <NavLink to="/projects" className="text-brand-600 hover:underline">← Volver</NavLink>
      <h2 className="text-2xl font-semibold">{project.name}</h2>
      {project.description && <p className="opacity-80">{project.description}</p>}
      <p className="text-sm opacity-70">Estado: {project.status}</p>
      <p className="text-sm opacity-70">Creado: {new Date(project.createdAt).toLocaleString()}</p>
      <p className="text-sm opacity-70">Actualizado: {new Date(project.updatedAt).toLocaleString()}</p>
    </section>
  )
}