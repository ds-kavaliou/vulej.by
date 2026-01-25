import { eq } from 'drizzle-orm'
import { db } from '../database'
import { ProductsTable } from '../database/schema'
import { BaseRepository } from './types'
import { mapProductFromDb } from './product.mappers'
import { Product } from './product.types'

export const repository: BaseRepository<Product, unknown, unknown> = {
  findById: async (id: string) => {
    const result = await db.query.ProductsTable.findFirst({
      where: eq(ProductsTable.id, id),
      with: {
        variants: true,
        images: true,
      },
    })

    if (!result) {
      return null
    }

    return mapProductFromDb(result)
  },
  findMany: async () => {
    const result = await db.query.ProductsTable.findMany({
      with: {
        variants: true,
        images: true,
      },
    })

    return result.map(mapProductFromDb)
  },
  create: function (data: unknown) {
    throw new Error('Function not implemented.')
  },
  update: function (id: string, data: unknown) {
    throw new Error('Function not implemented.')
  },
  delete: function (id: string) {
    throw new Error('Function not implemented.')
  },
}
