import { ProductWithRelationsDB } from '@/database'
import { Product } from '@/domain'

export const mapToDomainValue = (row: ProductWithRelationsDB): Product => {
  const resolvePrimaryImage = (
    image?: ProductWithRelationsDB['images'][number],
  ) => {
    if (!image) return undefined
    return {
      id: image.id,
      path: image.path,
      alt: image.alt,
    }
  }
  return {
    id: row.id,
    slug: row.slug,
    isActive: row.isActive,
    title: {
      values: Object.fromEntries(row.i18n.map((t) => [t.lang, t.title])),
    },
    description: {
      values: Object.fromEntries(row.i18n.map((t) => [t.lang, t.description])),
    },
    variants: row.variants.map((entity) => ({
      id: entity.id,
      price: entity.price,
      unit: entity.unit,
      size: entity.size,
    })),
    image: resolvePrimaryImage(row.images.find((entity) => entity.isPrimary)),
    images: row.images.map((entity) => ({
      id: entity.id,
      path: entity.path,
      alt: entity.alt,
    })),
  }
}
