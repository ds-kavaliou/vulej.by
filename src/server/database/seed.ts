import { randomUUID } from 'crypto'
import { db } from './client'
import {
  CategoriesTable,
  ProductCategoriesTable,
  ProductImagesTable,
  ProductsTable,
  ProductVariantsTable,
} from './schema'

async function seed() {
  console.info('🌱 Seeding database...')

  /**
   * 1. Categories
   */

  console.info('Inserting categories...')

  const honeyCategoryId = randomUUID()
  await db.insert(CategoriesTable).values([
    {
      id: honeyCategoryId,
      slug: 'honey',
      title: 'Honey',
      description: 'Delicious and natural honey products.',
      isActive: true,
    },
  ])

  console.info('Categories inserted.')

  /**
   * 2. Products
   */

  console.info('Inserting products...')

  const buckwheatHoneyId = randomUUID()
  await db
    .insert(ProductsTable)
    .values({
      id: buckwheatHoneyId,
      title: 'Buckwheat Honey',
      description: 'Dark, rich honey with strong aroma',
      isActive: true,
    })
    .onConflictDoNothing()

  console.info('Products inserted.')

  /**
   * 3. Product → Category
   */

  console.info('Linking products to categories...')

  await db
    .insert(ProductCategoriesTable)
    .values({
      productId: buckwheatHoneyId,
      categoryId: honeyCategoryId,
    })
    .onConflictDoNothing()

  console.info('Products linked to categories.')

  /**
   * 4. Variants
   */

  console.info('Inserting product variants...')

  await db
    .insert(ProductVariantsTable)
    .values([
      {
        id: randomUUID(),
        productId: buckwheatHoneyId,
        title: '250g jar',
        size: 250,
        unit: 'g',
        price: 750,
        stock: 20,
      },
      {
        id: randomUUID(),
        productId: buckwheatHoneyId,
        title: '500g jar',
        size: 500,
        unit: 'g',
        price: 1300,
        stock: 12,
      },
    ])
    .onConflictDoNothing()

  console.info('Product variants inserted.')

  /**
   * 5. Images
   */

  console.info('Inserting product images...')

  await db
    .insert(ProductImagesTable)
    .values([
      {
        id: randomUUID(),
        productId: buckwheatHoneyId,
        path: '/products/buckwheat-honey-1.jpg',
        alt: 'Jar of Buckwheat Honey',
      },
    ])
    .onConflictDoNothing()

  console.info('Product images inserted.')

  console.info('🌱 Database seeding finished.')
}

seed()
  .then(() => console.info('✅ Seeding complete!'))
  .catch((e) => console.error('❌ Seeding failed:', e))
  .finally(() => {
    process.exit()
  })
