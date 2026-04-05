import type { getProductsWithRealations } from './products.db'

export type ProductsWithRelations = NonNullable<
  Awaited<ReturnType<typeof getProductsWithRealations>>
>
