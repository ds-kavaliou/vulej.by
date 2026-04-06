import type { SupportedUnit } from '@/common/constants'

export type CartItemDto = {
  id: string
  variantId: string
  productId: string
  slug: string
  title: string
  image: {
    path: string
    alt: string | null
  } | null
  measurement: {
    value: number
    unit: SupportedUnit
  }
  price: number
  quantity: number
  subtotal: number
}

export type CartDto = {
  id: string
  totalQuantity: number
  subtotal: number
  items: Array<CartItemDto>
}
