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
    // TODO: check if user has admin role, if not - redirect to home page
    // TODO: provide session to the route context
  },
  component: () => <Outlet />,
})
