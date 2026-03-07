import { createFileRoute } from '@tanstack/react-router'

import {
  getRecommendedProductsQueryOptions,
  useRecommendedProducts,
} from '@/features/products'
import { CatalogItemCard } from '@/features/catalog'

export const Route = createFileRoute('/_main/')({
  loader: async ({ context }) => ({
    products: await context.queryClient.ensureQueryData(
      getRecommendedProductsQueryOptions(),
    ),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const products = useRecommendedProducts()

  return (
    <div className="container">
      <div className="flex flex-wrap justify-center gap-4 *:flex-[1_1_320px]">
        {products.data.map((product) => (
          <CatalogItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
