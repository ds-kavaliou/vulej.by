import { repository } from '@/server/repositories/products/repository'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/products')({
  server: {
    handlers: {
      GET: async () => {
        const products = await repository.findMany()
        return Response.json({ status: 'success', products })
      },
    },
  },
})
