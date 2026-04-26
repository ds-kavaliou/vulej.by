import { createFileRoute } from '@tanstack/react-router'
import { findProductsFn } from '@/features/products/products.functions'

export const Route = createFileRoute('/_admin/admin/products')({
  loader: (request) => {
    return findProductsFn({ data: request.location.search })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const items = Route.useLoaderData()

  return (
    <ul className="">
      {items.map((x) => (
        <li key={x.id}>{JSON.stringify(x)}</li>
      ))}
    </ul>
  )
}
