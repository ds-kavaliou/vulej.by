import { useState } from 'react'

import type { ProductDto, ProductVariantDto } from '../products.mapper'
import { ToggleGroup, ToggleGroupItem } from '@/common/components'
import { Measurement, Price } from '@/common/presentation'
import { useLocale } from '@/common/hooks'

type ProductCardProps = {
  product: ProductDto
  action: (selected: ProductVariantDto) => React.ReactNode
}

export function ProductCard({ product, action }: ProductCardProps) {
  const locale = useLocale()

  const [activeIdx, setActiveIdx] = useState(0)
  const selected = product.variants[activeIdx]

  return (
    <div className="group flex flex-col gap-y-4 items-center max-w-sm p-2 overflow-hidden">
      <img
        src={product.image?.path}
        alt={product.image?.alt ?? product.title}
        className="transition duration-500 translate-y-8 group-hover:translate-y-4 aspect-square w-full"
        loading="eager"
      />

      <div className="px-4 flex flex-col items-center text-center gap-y-2 flex-1">
        <h2 className="font-head text-2xl font-medium uppercase transition-colors duration-500 group-hover:text-primary">
          {product.title}
        </h2>

        <ToggleGroup spacing={2} value={[selected.id]}>
          {product.variants.map((variant, idx) => (
            <ToggleGroupItem
              key={variant.id}
              value={variant.id}
              className="px-2 py-0.5 gap-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              pressed={activeIdx === idx}
              onPressedChange={() => setActiveIdx(idx)}
            >
              <Measurement
                value={variant.size}
                unit={variant.unit}
                locale={locale}
              />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="font-semibold text-xl text-primary">
          <Price value={selected.price} locale={locale} />
        </div>
        <p className="text-[.925rem] font-light text-muted-foreground">
          {product.description}
        </p>
      </div>

      <div>{action(selected)}</div>
    </div>
  )
}
