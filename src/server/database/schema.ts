import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { relations as defineRelations } from 'drizzle-orm'

/**
 * TABLES
 */

export const ProductsTable = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),

  title: text('title').notNull(),
  description: text('description'),

  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const ProductVariantsTable = pgTable('product_variants', {
  id: uuid('id').defaultRandom().primaryKey(),

  productId: uuid('product_id')
    .notNull()
    .references(() => ProductsTable.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),

  size: integer('size_value').notNull(),
  unit: text('size_unit').notNull(),
  price: integer('price').notNull(),
  stock: integer('stock').notNull(),
  sku: text('sku').unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const ProductImagesTable = pgTable('product_images', {
  id: uuid('id').defaultRandom().primaryKey(),

  productId: uuid('product_id')
    .notNull()
    .references(() => ProductsTable.id, { onDelete: 'cascade' }),

  path: text('path').notNull(),
  alt: text('alt'),

  isPrimary: boolean('is_primary').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),

  createdAt: timestamp('created_at').defaultNow(),
})

export const CategoriesTable = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),

  title: text('title').notNull(),
  description: text('description'),

  isActive: boolean('is_active').notNull().default(true),

  createdAt: timestamp('created_at').defaultNow(),
})

export const ProductCategoriesTable = pgTable(
  'product_categories',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => ProductsTable.id, { onDelete: 'cascade' }),

    categoryId: uuid('category_id')
      .notNull()
      .references(() => CategoriesTable.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.productId, t.categoryId] })],
)

/**
 * RELATIONS
 */

export const ProductTableRelations = defineRelations(
  ProductsTable,
  ({ many }) => ({
    variants: many(ProductVariantsTable),
    images: many(ProductImagesTable),
  }),
)

export const ProductVariantsTableRelations = defineRelations(
  ProductVariantsTable,
  ({ one }) => ({
    product: one(ProductsTable, {
      fields: [ProductVariantsTable.productId],
      references: [ProductsTable.id],
    }),
  }),
)

export const ProductImagesTableRelations = defineRelations(
  ProductImagesTable,
  ({ one }) => ({
    product: one(ProductsTable, {
      fields: [ProductImagesTable.productId],
      references: [ProductsTable.id],
    }),
  }),
)

/**
 * SCHEMA EXPORT
 */

export const schema = {
  ProductsTable,
  ProductVariantsTable,
  ProductImagesTable,
  CategoriesTable,
  ProductCategoriesTable,
  ProductTableRelations,
  ProductVariantsTableRelations,
  ProductImagesTableRelations,
}
