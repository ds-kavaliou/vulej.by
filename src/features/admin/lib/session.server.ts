import { useSession } from '@tanstack/react-start/server'

type SessionData = {
  isAdmin?: boolean
}

export function useAppSession() {
  const password = process.env.ADMIN_SESSION_SECRET

  if (!password) {
    throw new Error('ADMIN_SESSION_SECRET environment variable is not set')
  }

  return useSession<SessionData>({
    name: 'admin-session',
    password,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    },
  })
}
