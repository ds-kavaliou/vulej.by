import { and, eq, inArray } from 'drizzle-orm'
import { db, ProductsTable } from '@/database'
import { mapToDomainValue } from './mappers'

export const repository = {
  findById: async (id: string) => {
    const result = await db.query.ProductsTable.findFirst({
      where: eq(ProductsTable.id, id),
      with: {
        variants: true,
        images: true,
        i18n: true,
      },
    })

    if (!result) {
      return null
    }

    return mapToDomainValue(result)
  },
  findBySlug: async (slug: string) => {
    const result = await db.query.ProductsTable.findFirst({
      where: eq(ProductsTable.slug, slug),
      with: {
        variants: true,
        images: true,
        i18n: true,
      },
    })

    if (!result) {
      return null
    }

    return mapToDomainValue(result)
  },
  findMany: async ({ ids, limit, offset }: FindManyParams = {}) => {
    const where = and(ids ? inArray(ProductsTable.id, ids) : undefined)
    const result = await db.query.ProductsTable.findMany({
      where,
      limit,
      offset,
      with: {
        variants: true,
        images: true,
        i18n: true,
      },
    })

    return result.map(mapToDomainValue)
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

export type FindManyParams = {
  limit?: number
  offset?: number
  ids?: string[]
}
