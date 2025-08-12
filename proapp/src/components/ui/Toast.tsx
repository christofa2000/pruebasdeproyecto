import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useUIStore } from '../../store/ui'

function ToastItem({ id, title, variant = 'info' }: { id: string; title: string; variant?: 'success' | 'error' | 'info' }) {
  const remove = useUIStore((s) => s.remove)
  useEffect(() => {
    const t = setTimeout(() => remove(id), 2500)
    return () => clearTimeout(t)
  }, [id, remove])

  const color = variant === 'success' ? 'bg-green-600' : variant === 'error' ? 'bg-red-600' : 'bg-gray-800'

  return (
    <div className={`text-white ${color} rounded-2xl shadow px-3 py-2`}>{title}</div>
  )
}

export default function ToastsContainer() {
  const toasts = useUIStore((s) => s.toasts)
  const el = document.getElementById('toasts-root')
  if (!el) return null
  return createPortal(
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} />
      ))}
    </div>,
    el
  )
}