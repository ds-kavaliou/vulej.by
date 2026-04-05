import { CatalogItemAction } from './catalog-item-action'
import type { ProductDto } from '@/server/products'
import { ProductCard } from '@/features/products'

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
