import { LocalizedText } from './utils'

export type Product = {
  id: string
  slug: string
  isActive: boolean
  title: LocalizedText
  description: LocalizedText
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
