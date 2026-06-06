import { createServerFn, useServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useAppSession } from './lib/session'

export const getAdminSessionFn = createServerFn({
  method: 'GET',
}).handler(async () => {
  const session = await useAppSession()

  return {
    isAdmin: session.data.isAdmin === true,
  }
})

export async function requireAdmin() {
  const session = await useAppSession()

  if (session.data.isAdmin !== true) {
    throw redirect({ to: '/admin/login' })
  }

  return session
}

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { password: string; redirect?: string }) => data)
  .handler(async ({ data }) => {
    if (data.password !== process.env.ADMIN_PASSWORD) {
      return {
        error: 'Invalid password',
      }
    }

    const session = await useAppSession()

    await session.update({
      isAdmin: true,
    })

    throw redirect({
      to: data.redirect || '/admin',
      replace: true,
    })
  })

export const useAdminLogInMutation = () => {
  const login = useServerFn(loginFn)

  return useMutation({
    mutationFn: (value: { password: string; redirect?: string }) =>
      login({ data: value }),
  })
}

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()

  await session.clear()

  throw redirect({
    to: '/admin/login',
  })
})
