import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section>
      <div className="container-wrapper">dashboard</div>
    </section>
  )
}
