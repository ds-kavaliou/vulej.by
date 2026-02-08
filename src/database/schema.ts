import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { relations as defineRelations, InferSelectModel } from 'drizzle-orm'

/**
 * CONSTS
 */

/** Supported Lanuages */
export const supportedLanguages = ['be', 'en', 'ru'] as const
export const languageEnum = pgEnum('language_code', supportedLanguages)

/** Supported Units */
export const supportedUnits = ['g', 'kg', 'l', 'ml', 'piece'] as const
export const unitEnum = pgEnum('unit_code', supportedUnits)

/**
 * TABLES
 */

export const ProductsTable = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => [index('products_slug_idx').on(t.slug)],
)

export const ProductVariantsTable = pgTable('product_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => ProductsTable.id, { onDelete: 'cascade' }),

  size: integer('size_value').notNull(),
  unit: unitEnum('size_unit').notNull(),
  price: integer('price').notNull(),
  stock: integer('stock').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const ProductImagesTable = pgTable('product_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => ProductsTable.id, { onDelete: 'cascade' }),

  isPrimary: boolean('is_primary').notNull().default(false),
  path: text('path').notNull(),
  alt: text('alt'),

  createdAt: timestamp('created_at').defaultNow(),
})

export const CategoriesTable = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull(),
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

export const ProductI18nTable = pgTable(
  'product_i18n',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => ProductsTable.id, { onDelete: 'cascade' }),

    lang: languageEnum('lang').notNull(),

    title: text('title').notNull(),
    description: text('description').notNull(),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.productId, t.lang] })],
)

export const CategoryI18nTable = pgTable(
  'category_i18n',
  {
    categoryId: uuid('category_id')
      .notNull()
      .references(() => CategoriesTable.id, { onDelete: 'cascade' }),

    lang: languageEnum('lang').notNull(),

    title: text('title').notNull(),
    description: text('description').notNull(),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.categoryId, t.lang] })],
)

/**
 * RELATIONS
 */

export const ProductsTableRelations = defineRelations(
  ProductsTable,
  ({ many }) => ({
    categories: many(ProductCategoriesTable),
    variants: many(ProductVariantsTable),
    images: many(ProductImagesTable),
    i18n: many(ProductI18nTable),
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

export const ProductCategoriesRelations = defineRelations(
  ProductCategoriesTable,
  ({ one }) => ({
    product: one(ProductsTable, {
      fields: [ProductCategoriesTable.productId],
      references: [ProductsTable.id],
    }),
    category: one(CategoriesTable, {
      fields: [ProductCategoriesTable.categoryId],
      references: [CategoriesTable.id],
    }),
  }),
)

export const CategoriesRelations = defineRelations(
  CategoriesTable,
  ({ many }) => ({
    products: many(ProductCategoriesTable),
    i18n: many(CategoryI18nTable),
  }),
)

export const ProductI18nRelations = defineRelations(
  ProductI18nTable,
  ({ one }) => ({
    product: one(ProductsTable, {
      fields: [ProductI18nTable.productId],
      references: [ProductsTable.id],
    }),
  }),
)

export const CategoryI18nRelations = defineRelations(
  CategoryI18nTable,
  ({ one }) => ({
    category: one(CategoriesTable, {
      fields: [CategoryI18nTable.categoryId],
      references: [CategoriesTable.id],
    }),
  }),
)

/**
 * DB TYPES
 */

export type ProductDB = InferSelectModel<typeof ProductsTable>
export type ProductVariantDB = InferSelectModel<typeof ProductVariantsTable>
export type ProductImageDB = InferSelectModel<typeof ProductImagesTable>
export type ProductI18nDB = InferSelectModel<typeof ProductI18nTable>
export type ProductWithRelationsDB = ProductDB & {
  variants: ProductVariantDB[]
  images: ProductImageDB[]
  i18n: ProductI18nDB[]
}

export type CategoryDB = InferSelectModel<typeof CategoriesTable>
export type CategoryI18nDB = InferSelectModel<typeof CategoryI18nTable>
export type CategoryWithRelationsDB = CategoryDB & {
  i18n: CategoryI18nDB[]
}

/**
 * SCHEMA EXPORT
 */

export const schema = {
  CategoriesTable,
  CategoryI18nTable,

  ProductsTable,
  ProductI18nTable,
  ProductVariantsTable,
  ProductImagesTable,
  ProductCategoriesTable,

  ProductsTableRelations,
  ProductVariantsTableRelations,
  ProductImagesTableRelations,
  ProductCategoriesRelations,
  ProductI18nRelations,

  CategoriesRelations,
  CategoryI18nRelations,
}
