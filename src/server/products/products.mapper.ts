import { LocaleKey, resolveImageUrl } from '@/common/lib'

import { ProductDto } from './products.dto'
import { ProductsWithRelations } from './products.queries'

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
