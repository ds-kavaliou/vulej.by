import { ToggleGroup, ToggleGroupItem } from '@/common/components'
import { resolveImageUrl } from '@/common/lib'
import { resolveLocale } from '@/common/utils'
import { Product } from '@/domain'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useMemo, useState } from 'react'

const getRecommendedProducts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { service } = await import('@/server/services/products')

    return await service.getRecommendedProducts()
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
      <div className="flex flex-wrap justify-center gap-4 *:flex-[1_1_320px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const activeVariant = product.variants[activeIdx]

  const title = useMemo(
    () => resolveLocale(product.title, 'be'),
    [product.title],
  )
  const description = useMemo(
    () => resolveLocale(product.description, 'be'),
    [product.description],
  )
  const picture = useMemo(
    () => resolveImageUrl(product.image?.path),
    [product.image],
  )

  return (
    <div className="group flex flex-col gap-y-4 items-center max-w-sm overflow-hidden">
      <img
        src={picture}
        alt={title}
        className="transition duration-500 translate-y-8 group-hover:translate-y-4"
      />

      <div className="px-4 flex flex-col items-center text-center gap-y-2 flex-1">
        <h2 className="font-head text-2xl font-medium uppercase transition-colors duration-500 group-hover:text-primary">
          {title}
        </h2>

        <ToggleGroup spacing={2} value={[activeVariant.id]}>
          {product.variants.map((variant, idx) => (
            <ToggleGroupItem
              key={variant.id}
              value={variant.id}
              className="px-2 py-0.5 gap-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              pressed={activeIdx === idx}
              onPressedChange={() => setActiveIdx(idx)}
            >
              <span>{variant.size}</span>
              <span className="text-[.625rem]">{variant.unit}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="font-semibold text-xl text-primary">
          <strong>{activeVariant.price} руб.</strong>
        </div>
        <p className="text-[.925rem] font-light text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}
