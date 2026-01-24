import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container-wrapper flex flex-col min-h-svh">
      <header>
        <div className="container">header</div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>
        <div className="container">footer</div>
      </footer>
    </div>
  )
}
