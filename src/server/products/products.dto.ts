export type ProductDto = {
  id: string
  slug: string
  isActive: boolean
  title: string
  description: string
  variants: ProductVariantDto[]
  image?: {
    id: string
    alt: string | null
    path: string
  }
  images: {
    id: string
    alt: string | null
    path: string
  }[]
}

export type ProductVariantDto = {
  id: string
  price: number
  unit: string
  size: number
}
