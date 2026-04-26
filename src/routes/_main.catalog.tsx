import { createFileRoute } from '@tanstack/react-router'
import { findProductsQueryOptions, useProducts } from '@/features/products'
import { CatalogItemCard } from '@/features/catalog'

export const Route = createFileRoute('/_main/catalog')({
  loader: async ({ context, location }) => ({
    products: await context.queryClient.ensureQueryData(
      findProductsQueryOptions(location.search),
    ),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const search = Route.useSearch()

  const products = useProducts(search)

  return (
    <section className="container-wrapper min-h-[calc(100svh-var(--header-height))]">
      <div className="flex flex-wrap justify-center gap-4 *:flex-[1_1_320px]">
        {products.data.map((product) => (
          <CatalogItemCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
