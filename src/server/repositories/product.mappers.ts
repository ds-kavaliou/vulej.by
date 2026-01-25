import { InferSelectModel } from 'drizzle-orm/table'
import {
  ProductImagesTable,
  ProductsTable,
  ProductVariantsTable,
} from '../database/schema'
import { Product } from './product.types'
import { WithRelations } from './types'

export function mapProductFromDb(
  row: WithRelations<
    InferSelectModel<typeof ProductsTable>,
    {
      variants: InferSelectModel<typeof ProductVariantsTable>[]
      images: InferSelectModel<typeof ProductImagesTable>[]
    }
  >,
): Product {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    isActive: row.isActive,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    variants: row.variants,
    images: row.images,
  }
}
