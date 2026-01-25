import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getRecommendedProducts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { repository } =
      await import('@/server/repositories/product.repository')

    return await repository.findMany({ limit: 3 })
  },
)

export const Route = createFileRoute('/_main/')({
  loader: async () => ({ products: await getRecommendedProducts() }),
  component: RouteComponent,
})

function RouteComponent() {
  const { products } = Route.useLoaderData()

  return (
    <div className="container">
      {products.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  )
}
