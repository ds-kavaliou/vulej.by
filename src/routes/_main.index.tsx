import { Trans } from '@lingui/react/macro'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import {
  getRecommendedProductsQueryOptions,
  useRecommendedProducts,
} from '@/features/products'
import { CatalogItemCard } from '@/features/catalog'
import { Button } from '@/common/components'

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
  const navigate = useNavigate()

  return (
    <div className="container">
      <section className="flex h-[calc(100vh-var(--header-height))] flex-col justify-center hero-background mt-20">
        <div className="container -translate-y-10 xl:grid xl:grid-cols-2 xl:items-center gap-8">
          <div className="flex flex-col items-center text-center xl:items-start xl:text-start">
            <h4 className="text-sm font-semibold uppercase tracking-wide sm:text-base xl:text-lg">
              <Trans>Свежий, сладкий.</Trans>
            </h4>
            <h1 className="mb-4 font-logo text-5xl font-bold uppercase tracking-widest  sm:text-6xl md:text-7xl lg:-ml-1 xl:text-8xl">
              vulej.by
            </h1>
            <p className="mb-4 max-w-prose md:text-lg">
              <Trans>
                &#x0423; нас Вы можете приобрести <strong>мёд</strong>{' '}
                превосходного качества, &#1072; так же другую продукцию
                пчеловодства произведенную на собственной пасеке.
              </Trans>
            </p>
            <Button
              variant={'outline'}
              size={'lg'}
              onClick={() => navigate({ to: '/api/products' })}
            >
              <Trans>узнать больше</Trans>
            </Button>
          </div>
          <div className="hidden xl:block">
            <img className="scale-125" src="/images/hero-1.avif" alt="honey" />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-4 *:flex-[1_1_320px]">
        {products.data.map((product) => (
          <CatalogItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
