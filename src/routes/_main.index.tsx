import { Trans } from '@lingui/react/macro'
import { Link, createFileRoute } from '@tanstack/react-router'

import {
  findFeaturedProductsQueryOptions,
  useFeaturedProducts,
} from '@/features/products'
import { CatalogItemCard } from '@/features/catalog'
import { Button } from '@/common/components'

export const Route = createFileRoute('/_main/')({
  loader: async ({ context }) => ({
    products: await context.queryClient.ensureQueryData(
      findFeaturedProductsQueryOptions(),
    ),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const products = useFeaturedProducts()

  return (
    <>
      <section className="container-wrapper min-h-[calc(100svh-var(--header-height))]">
        <div className="container py-8 pt-36 xl:pt-28 xl:grid xl:grid-cols-2 xl:items-center xl:gap-8">
          <div className="flex flex-col items-center text-center xl:items-start xl:text-start">
            <h4 className="text-sm font-semibold uppercase tracking-wide sm:text-base xl:text-lg">
              <Trans>Fresh and sweet.</Trans>
            </h4>
            <h1 className="mb-4 font-logo text-5xl font-bold uppercase tracking-widest  sm:text-6xl md:text-7xl lg:-ml-1 xl:text-8xl">
              vulej.by
            </h1>
            <p className="mb-4 max-w-prose md:text-lg">
              <Trans>
                Here you can purchase <strong>honey</strong> of exceptional
                quality, as well as other beekeeping products made at our own
                apiary.
              </Trans>
            </p>
            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link to="/catalog">
                  <Trans>learn more</Trans>
                </Link>
              }
            />
          </div>
          <div className="hidden xl:block aspect-[1.42222222]">
            <img
              className="aspect-[1.42222222]"
              fetchPriority="high"
              src="/images/hero-1.avif"
              alt="honey"
            />
          </div>
        </div>
      </section>

      <section className="container-wrapper">
        <div className="flex flex-wrap justify-center gap-4 *:flex-[1_1_320px]">
          {products.data.map((product) => (
            <CatalogItemCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
