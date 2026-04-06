import type { LocaleKey } from '@/common/constants'

import type { ProductDto } from './products.dto'
import type { ProductsWithRelations } from './products.types'
import { resolveImageUrl } from '@/common/lib'

export const mapProductToDto = (
  product: ProductsWithRelations[number],
  locale: LocaleKey,
): ProductDto => {
  const translation =
    product.i18n.find((entry) => entry.lang === locale) ?? product.i18n.at(0)

  const images = product.images.map((x) => ({
    ...x,
    path: resolveImageUrl(x.path),
  }))

  const image = images.find((img) => img.isPrimary) ?? images.at(0)

  return {
    id: product.id,
    slug: product.slug,
    isActive: product.isActive,
    title: translation?.title ?? '',
    description: translation?.description ?? '',
    variants: product.variants.map((entity) => ({
      id: entity.id,
      price: entity.price,
      unit: entity.unit,
      size: entity.size,
    })),
    image,
    images,
  }
}
