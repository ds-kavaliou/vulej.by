import { ProductCard } from '@/features/products'

import { ProductDto } from '@/server/products'

import { CatalogItemAction } from './catalog-item-action'

type CatalogItemCardProps = {
  product: ProductDto
}

export function CatalogItemCard({ product }: CatalogItemCardProps) {
  return (
    <ProductCard
      product={product}
      action={(selected) => <CatalogItemAction selected={selected} />}
    />
  )
}
