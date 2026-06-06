import { useSession } from '@tanstack/react-start/server'

type SessionData = {
  isAdmin?: boolean
}

export function useAppSession() {
  return useSession<SessionData>({
    name: 'admin-session',
    password: process.env.ADMIN_SESSION_SECRET!,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    },
  })
}
