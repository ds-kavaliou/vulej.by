import { repository } from '@/server/repositories/products/repository'

export const service = {
  getRecommendedProducts: async () => {
    return await repository.findMany({ limit: 3 })
  },
}
