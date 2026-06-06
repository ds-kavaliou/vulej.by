import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { getAdminSessionFn } from '@/features/admin'

export const Route = createFileRoute('/_admin')({
  beforeLoad: async ({ location }) => {
    const session = await getAdminSessionFn()

    if (!session.isAdmin) {
      throw redirect({
        to: '/admin/login',
        search: { redirect: location.href },
      })
    }
  },
  component: () => <Outlet />,
})
