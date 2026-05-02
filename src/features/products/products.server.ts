import type { ProductCreateParams, ProductListParams } from './products.schema'

import { db } from '@/database'

export function findPaginatedProductList(params: ProductListParams) {
  const { page = 1, perPage = 10 } = params

  return db.query.ProductsTable.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    with: {
      variants: true,
      images: true,
      i18n: true,
    },
  })
}

export type ProductListItem = Awaited<
  ReturnType<typeof findPaginatedProductList>
>[number]

export function findFeaturedProductList() {
  return db.query.ProductsTable.findMany({
    limit: 3,
    with: {
      variants: true,
      images: true,
      i18n: true,
    },
  })
}

export type ProductFeaturedListItem = Awaited<
  ReturnType<typeof findPaginatedProductList>
>[number]

export async function createProduct(value: ProductCreateParams) {
  console.log(value)

  // const result = await db.insert(ProductsTable).values({
  //   slug: value.slug,
  //   isActive: value.isActive,
  // })

  return { success: true }
}
