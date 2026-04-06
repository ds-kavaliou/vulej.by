import {
  boolean,
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { relations as defineRelations, sql } from 'drizzle-orm'
import { supportedLanguages, supportedUnits } from '@/common/constants'

/** Supported Languages */
export const languageEnum = pgEnum('language_code', supportedLanguages)

/** Supported Units */
export const unitEnum = pgEnum('unit_code', supportedUnits)

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

export const CartsTable = pgTable('carts', {
  id: uuid('id').defaultRandom().primaryKey(),
  token: uuid('token').defaultRandom().notNull().unique(),

  userId: uuid('user_id'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const CartItemsTable = pgTable(
  'cart_items',
  {
    cartId: uuid('cart_id')
      .notNull()
      .references(() => CartsTable.id, { onDelete: 'cascade' }),

    variantId: uuid('variant_id')
      .notNull()
      .references(() => ProductVariantsTable.id, { onDelete: 'cascade' }),

    quantity: integer('quantity').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.cartId, t.variantId] }),
    index('cart_items_cart_idx').on(t.cartId),
    check('cart_items_quantity_gt_zero', sql`${t.quantity} > 0`),
  ],
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

export const CartsRelations = defineRelations(CartsTable, ({ many }) => ({
  items: many(CartItemsTable),
}))

export const CartItemsRelations = defineRelations(
  CartItemsTable,
  ({ one }) => ({
    cart: one(CartsTable, {
      fields: [CartItemsTable.cartId],
      references: [CartsTable.id],
    }),

    variant: one(ProductVariantsTable, {
      fields: [CartItemsTable.variantId],
      references: [ProductVariantsTable.id],
    }),
  }),
)

/**
 * SCHEMA EXPORT
 */

export const schema = {
  CategoriesTable,
  CategoryI18nTable,
  CategoriesRelations,
  CategoryI18nRelations,

  ProductsTable,
  ProductI18nTable,
  ProductVariantsTable,
  ProductImagesTable,
  ProductsTableRelations,
  ProductVariantsTableRelations,
  ProductImagesTableRelations,
  ProductI18nRelations,

  ProductCategoriesTable,
  ProductCategoriesRelations,

  CartsTable,
  CartItemsTable,
  CartsRelations,
  CartItemsRelations,
}
