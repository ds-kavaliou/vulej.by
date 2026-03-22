import { LocaleKey, resolveImageUrl } from '@/common/lib'

import { CartWithRelations } from './cart.types'
import { CartDto } from './cart.dto'

export function mapCartToDto(
  cart: CartWithRelations,
  locale: LocaleKey,
): CartDto {
  const items = cart.items.map((item) => {
    const variant = item.variant
    const product = variant.product

    const translation =
      product.i18n.find((entry) => entry.lang === locale) ?? product.i18n.at(0)

    const images = product.images.map((x) => ({
      ...x,
      path: resolveImageUrl(x.path),
    }))

    const image = images.find((img) => img.isPrimary) ?? images.at(0)

    const subtotal = variant.price * item.quantity

    return {
      id: cart.id + ':' + product.id + ':' + variant.id,
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      title: translation?.title ?? 'Unnamed product',
      image: image
        ? {
            path: image.path,
            alt: image.alt,
          }
        : null,
      price: variant.price,
      quantity: item.quantity,
      subtotal,
    }
  })

  return {
    id: cart.id,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.subtotal, 0),
    items,
  }
}
