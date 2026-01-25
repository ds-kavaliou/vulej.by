import { eq } from 'drizzle-orm'
import { db } from '../database'
import { ProductsTable } from '../database/schema'
import { BaseRepository } from './types'

export const repository: BaseRepository<any, unknown, unknown> = {
  findById: async (id: string) => {
    const query = await db.query.ProductsTable.findFirst({
      where: eq(ProductsTable.id, id),
      with: {
        variants: true,
      },
    })

    return query
  },
  findMany: async () => {
    const query = db.query.ProductsTable.findMany({
      with: {
        variants: true,
      },
    })

    return query
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
