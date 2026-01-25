import { repository } from '@/server/repositories/product.repository'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({
  loader: async () => {
    const data = await repository.findMany()

    return { products: data }
  },
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
