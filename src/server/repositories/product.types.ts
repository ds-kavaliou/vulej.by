export type Product = {
  id: string
  title: string
  description: string | null
  isActive: boolean
  createdAt: Date | null
  updatedAt: Date | null
  variants: ProductVariant[]
  images: ProductImage[]
}

export type ProductVariant = {
  id: string
  productId: string
  title: string
  size: number
  unit: string
  price: number
  stock: number
  sku: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type ProductImage = {
  id: string
  productId: string
  path: string
  alt: string | null
  createdAt: Date | null
}
