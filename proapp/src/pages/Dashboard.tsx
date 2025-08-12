import Button from '../components/ui/Button'  


export default function Dashboard() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
        
      <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
        <p className="text-sm opacity-70">Métrica A</p>
        <p className="mt-1 text-2xl font-semibold">1,234</p>
      </div>
      <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
        <p className="text-sm opacity-70">Métrica B</p>
        <p className="mt-1 text-2xl font-semibold">98%</p>
      </div>
      <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
        <p className="text-sm opacity-70">Métrica C</p>
        <p className="mt-1 text-2xl font-semibold">42</p>
      </div>



      <Button>Prueba</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="lg">Grande</Button>


    </section>

  )
}