import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/products')({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({ status: 'ok' })
      },
    },
  },
})
