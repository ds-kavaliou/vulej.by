import { createServerFn, useServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'

import { useAppSession } from './lib/session.server'

export const getAdminSessionFn = createServerFn({
  method: 'GET',
}).handler(async () => {
  const session = await useAppSession()

  return {
    isAdmin: session.data.isAdmin === true,
  }
})

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { password: string; redirect?: string }) => data)
  .handler(async ({ data }) => {
    if (data.password !== process.env.ADMIN_PASSWORD) {
      return {
        error: true,
        message: 'Invalid password',
      }
    }

    const session = await useAppSession()

    await session.update({
      isAdmin: true,
    })

    throw redirect({
      href: data.redirect || '/admin',
      replace: true,
    })
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()

  await session.clear()

  throw redirect({
    to: '/admin/login',
  })
})

export const useAdminLogInMutation = () => {
  const login = useServerFn(loginFn)

  return useMutation({
    mutationFn: (value: { password: string; redirect?: string }) =>
      login({ data: value }),
  })
}
