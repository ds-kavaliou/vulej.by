import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin')({
  beforeLoad: ({ location }) => {
    const session = false // TODO: get session

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (session) {
      throw redirect({
        to: '/admin/login',
        search: { redirect: location.href },
      })
    }

    // TODO: check if session is valid, if not - redirect to login page
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-svh">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container-wrapper">header and menu</div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
