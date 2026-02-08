import { db } from './client'
import type {
  ProductWithRelationsDB,
  ProductDB,
  CategoryDB,
  ProductI18nDB,
  CategoryI18nDB,
  ProductImageDB,
  ProductVariantDB,
  CategoryWithRelationsDB,
} from './schema'

import {
  CategoriesTable,
  CategoryI18nTable,
  ProductsTable,
  ProductI18nTable,
  ProductVariantsTable,
  ProductImagesTable,
  ProductCategoriesTable,
} from './schema'

export {
  db,
  CategoriesTable,
  CategoryI18nTable,
  ProductsTable,
  ProductI18nTable,
  ProductVariantsTable,
  ProductImagesTable,
  ProductCategoriesTable,
}

export type {
  ProductWithRelationsDB,
  ProductDB,
  CategoryDB,
  ProductI18nDB,
  CategoryI18nDB,
  ProductImageDB,
  ProductVariantDB,
  CategoryWithRelationsDB,
}
