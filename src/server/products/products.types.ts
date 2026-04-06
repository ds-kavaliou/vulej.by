import type { getProductsWithRelations } from './products.db'

export type ProductsWithRelations = NonNullable<
  Awaited<ReturnType<typeof getProductsWithRelations>>
>
