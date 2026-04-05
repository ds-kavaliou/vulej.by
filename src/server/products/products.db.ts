import { and, inArray } from 'drizzle-orm'

import { ProductsTable, db } from '@/database'

export type FindManyParams = {
  limit?: number
  offset?: number
  ids?: Array<string>
}

export const getProductsWithRealations = async ({
  ids,
  limit,
  offset,
}: FindManyParams = {}) => {
  const where = and(ids ? inArray(ProductsTable.id, ids) : undefined)
  return db.query.ProductsTable.findMany({
    where,
    limit,
    offset,
    with: {
      variants: true,
      images: true,
      i18n: true,
    },
  })
}
