export type ProductDto = {
  id: string
  slug: string
  isActive: boolean
  title: string
  description: string
  variants: {
    id: string
    price: number
    unit: string
    size: number
  }[]
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
