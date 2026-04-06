import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/checkout/success')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col text-center py-4">
      <h2 className="font-head text-2xl mb-2">
        <strong>Hey</strong>, the order was completed successfully
      </h2>
      <p className="mb-5">some details</p>
      <Link
        to="/"
        className="tracking-[0.15em] uppercase text-xs font-semibold"
      >
        redirect to main page
      </Link>
    </div>
  )
}
