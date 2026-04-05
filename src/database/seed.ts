import { db } from './client'
import {
  CategoriesTable,
  CategoryI18nTable,
  ProductCategoriesTable,
  ProductI18nTable,
  ProductImagesTable,
  ProductVariantsTable,
  ProductsTable,
} from './schema'
import { categories, products } from './seed.data'

async function seed() {
  console.info('🌱 Seeding database...')

  const shouldReset =
    process.argv.includes('--reset') || process.argv.includes('-r')

  if (shouldReset) {
    console.log('🗑️  Clearing existing tables...')
    await db.delete(ProductsTable)
    await db.delete(ProductVariantsTable)
    await db.delete(ProductImagesTable)
    await db.delete(ProductI18nTable)

    await db.delete(CategoriesTable)
    await db.delete(CategoryI18nTable)
    await db.delete(ProductCategoriesTable)
    console.log('   Cleared all tables')
  } else {
    const existingProducts = await db.select().from(ProductsTable).limit(1)

    if (existingProducts.length > 0) {
      console.log('⚠️  The database already seeded.')
      console.log(
        '   Run with --reset flag to clear and reseed: npm run db:seed -- --reset',
      )
      process.exit(0)
    }
  }

  await db.transaction(async (tx) => {
    if (categories.length) {
      const insertedCategories = await tx
        .insert(CategoriesTable)
        .values(
          categories.map((c) => ({
            slug: c.slug,
            isActive: c.isActive ?? true,
          })),
        )
        .onConflictDoNothing()
        .returning({ slug: CategoriesTable.slug, id: CategoriesTable.id })

      const categoryIdBySlug = new Map(
        insertedCategories.map((x) => [x.slug, x.id]),
      )

      await tx.insert(CategoryI18nTable).values(
        categories.flatMap((category) => {
          const categoryId = categoryIdBySlug.get(category.slug)
          if (!categoryId) return []
          return category.i18n.map((values) => ({
            categoryId,
            ...values,
          }))
        }),
      )

      if (products.length) {
        const insertedProducts = await tx
          .insert(ProductsTable)
          .values(
            products.map((p) => ({
              slug: p.slug,
              isActive: p.isActive,
            })),
          )
          .onConflictDoNothing()
          .returning({ slug: ProductsTable.slug, id: ProductsTable.id })

        const productIdBySlug = new Map(
          insertedProducts.map((x) => [x.slug, x.id]),
        )

        await tx.insert(ProductI18nTable).values(
          products.flatMap((product) => {
            const productId = productIdBySlug.get(product.slug)
            if (!productId) return []
            return product.i18n.map((values) => ({
              productId,
              ...values,
            }))
          }),
        )

        await tx.insert(ProductVariantsTable).values(
          products.flatMap((product) => {
            const productId = productIdBySlug.get(product.slug)
            if (!productId) return []
            return product.variants.map((values) => ({
              productId,
              ...values,
            }))
          }),
        )

        await tx.insert(ProductImagesTable).values(
          products.flatMap((product) => {
            const productId = productIdBySlug.get(product.slug)
            if (!productId) return []
            return product.images.map((values) => ({
              productId,
              ...values,
            }))
          }),
        )

        await tx
          .insert(ProductCategoriesTable)
          .values(
            products.flatMap((p) => {
              const productId = productIdBySlug.get(p.slug)
              if (!productId) return []

              return p.categories
                .map((slug) => categoryIdBySlug.get(slug))
                .filter((id): id is string => Boolean(id))
                .map((categoryId) => ({
                  productId,
                  categoryId,
                }))
            }),
          )
          .onConflictDoNothing()
      }
    }
  })

  console.info('🌱 Database seeding finished.')
}

seed()
  .then(() => console.info('✅ Seeding complete!'))
  .catch((e) => console.error('❌ Seeding failed:', e))
  .finally(() => {
    process.exit()
  })
