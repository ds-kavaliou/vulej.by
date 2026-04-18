import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section>
      <div className="container-wrapper h-dvh grid">
        <div className="max-w-xl w-full m-auto pb-32">
          <Outlet />
        </div>
      </div>
    </section>
  )
}
