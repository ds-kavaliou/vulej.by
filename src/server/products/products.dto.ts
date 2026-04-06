import type { SupportedUnit } from '@/common/constants'

export type ProductDto = {
  id: string
  slug: string
  isActive: boolean
  title: string
  description: string
  variants: Array<ProductVariantDto>
  image?: {
    id: string
    alt: string | null
    path: string
  }
  images: Array<{
    id: string
    alt: string | null
    path: string
  }>
}

export type ProductVariantDto = {
  id: string
  price: number
  unit: SupportedUnit
  size: number
}
