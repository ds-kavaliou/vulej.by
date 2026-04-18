import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/checkout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="container-wrapper">
      <div className="container py-8 max-w-xl mx-auto">
        <Outlet />
      </div>
    </section>
  )
}
