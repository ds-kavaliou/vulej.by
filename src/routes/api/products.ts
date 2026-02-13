import { createFileRoute } from '@tanstack/react-router'
import { service } from '@/server/services/products'

export const Route = createFileRoute('/api/products')({
  server: {
    handlers: {
      GET: async () => {
        const products = await service.getRecommendedProducts()
        return Response.json({ status: 'success', products })
      },
    },
  },
})
