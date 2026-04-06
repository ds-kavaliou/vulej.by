import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/checkout/failure')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div>Something went wrong:( We're already working on this problem</div>
      <Link
        to="/"
        className="tracking-[0.15em] uppercase text-xs font-semibold"
      >
        redirect to main page
      </Link>
    </div>
  )
}
