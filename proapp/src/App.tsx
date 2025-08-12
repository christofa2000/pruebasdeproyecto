import { useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import clsx from 'clsx'

import Button from './components/ui/Button'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Settings from './pages/Settings'
import { useThemeStore } from './store/theme'

// ...imports existentes
import ProjectDetail from './pages/ProjectDetail'
import ToastsContainer from './components/ui/Toast'




export default function App() {
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-dvh bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-10 border-b border-gray-200/60 dark:border-gray-800/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <span className="font-semibold">ProApp</span>
          <nav className="ml-auto flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx('text-sm', isActive ? 'font-semibold' : 'opacity-70 hover:opacity-100')
              }
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                clsx('text-sm', isActive ? 'font-semibold' : 'opacity-70 hover:opacity-100')
              }
            >
              Proyectos
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                clsx('text-sm', isActive ? 'font-semibold' : 'opacity-70 hover:opacity-100')
              }
            >
              Ajustes
            </NavLink>
          </nav>
          <Button variant="ghost" onClick={toggle} className="ml-2">
            Modo {theme === 'dark' ? '🌙' : '☀️'}
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/settings" element={<Settings />} />
            {/* Dentro de <Routes> van las rutas, sin anidar otro <Routes> */}
          </Routes>
         
      </main>
       <ToastsContainer />
    </div>
  )
}