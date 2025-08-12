import Button from "../components/ui/Button";
import { useThemeStore } from '../store/theme'

export default function Settings() {
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Ajustes</h2>
      <p>Theme actual: <span className="font-mono">{theme}</span></p>
      <Button variant="ghost" onClick={toggle}>Alternar modo</Button>
    </section>
  )
}