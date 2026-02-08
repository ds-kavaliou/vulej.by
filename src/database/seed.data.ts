import {
  CategoriesTable,
  CategoryI18nTable,
  ProductI18nTable,
  ProductImagesTable,
  ProductsTable,
  ProductVariantsTable,
} from './schema'
import { InferInsertModel } from 'drizzle-orm'

export type ProductWithRelationsInsert = InferInsertModel<
  typeof ProductsTable
> & {
  variants: Omit<
    InferInsertModel<typeof ProductVariantsTable>,
    'id' | 'productId'
  >[]
  images: Omit<InferInsertModel<typeof ProductImagesTable>, 'productId'>[]
  i18n: Omit<InferInsertModel<typeof ProductI18nTable>, 'productId'>[]
  categories: string[]
}

export type CategoryWithRelationsInsert = InferInsertModel<
  typeof CategoriesTable
> & {
  i18n: Omit<InferInsertModel<typeof CategoryI18nTable>, 'categoryId'>[]
}

export const enum ProductCategories {
  HONEY = 'honey',
  BEE_PRODUCTS = 'bee-products',
  GIFT_SETS = 'gift-sets',
}

export const categories: CategoryWithRelationsInsert[] = [
  {
    slug: ProductCategories.HONEY,
    isActive: true,
    i18n: [
      {
        lang: 'en',
        title: 'Honey',
        description: 'Natural honey from our apiary',
      },
      {
        lang: 'ru',
        title: 'Мёд',
        description: 'Натуральный мёд с нашей пасеки',
      },
      {
        lang: 'be',
        title: 'Мёд',
        description: 'Натуральны мёд з нашай пасекі',
      },
    ],
  },
  {
    slug: ProductCategories.BEE_PRODUCTS,
    isActive: true,
    i18n: [
      {
        lang: 'en',
        title: 'Bee products',
        description: 'Propolis, pollen, wax, and other bee products',
      },
      {
        lang: 'ru',
        title: 'Продукты пчеловодства',
        description: 'Прополис, пыльца, воск и другие продукты пчеловодства',
      },
      {
        lang: 'be',
        title: 'Прадукты пчалярства',
        description: 'Праполіс, пылок, воск і іншыя прадукты пчалярства',
      },
    ],
  },
  {
    slug: ProductCategories.GIFT_SETS,
    isActive: true,
    i18n: [
      {
        lang: 'en',
        title: 'Gift sets',
        description: 'Honey gift boxes and curated sets',
      },
      {
        lang: 'ru',
        title: 'Подарочные наборы',
        description: 'Подарочные наборы мёда и продуктов пчеловодства',
      },
      {
        lang: 'be',
        title: 'Падарункавыя наборы',
        description: 'Падарункавыя наборы мёду і прадуктаў пчалярства',
      },
    ],
  },
]

export const products: ProductWithRelationsInsert[] = [
  {
    slug: 'buckwheat-honey',
    isActive: true,
    i18n: [
      {
        lang: 'en',
        title: 'Buckwheat honey',
        description: 'Dark, rich, aromatic.',
      },
      {
        lang: 'ru',
        title: 'Гречишный мёд',
        description: 'Тёмный, насыщенный, ароматный.',
      },
      {
        lang: 'be',
        title: 'Грэчаны мёд',
        description: 'Цёмны, насычаны, духмяны.',
      },
    ],
    categories: [ProductCategories.HONEY],
    variants: [
      { size: 250, unit: 'g', price: 700, stock: 50 },
      { size: 500, unit: 'g', price: 1200, stock: 40 },
    ],
    images: [
      {
        path: '/products/pr-1.avif',
        alt: 'Buckwheat honey jar',
        isPrimary: true,
      },
    ],
  },

  {
    slug: 'linden-honey',
    isActive: true,
    i18n: [
      {
        lang: 'en',
        title: 'Linden honey',
        description: 'Light floral taste with a smooth texture.',
      },
      {
        lang: 'ru',
        title: 'Липовый мёд',
        description: 'Светлый цветочный вкус и нежная текстура.',
      },
      {
        lang: 'be',
        title: 'Ліпавы мёд',
        description: 'Светлы кветкавы смак і далікатная тэкстура.',
      },
    ],
    categories: [ProductCategories.HONEY],
    variants: [
      { size: 250, unit: 'g', price: 650, stock: 60 },
      { size: 500, unit: 'g', price: 1100, stock: 45 },
      { size: 1000, unit: 'g', price: 2000, stock: 25 },
    ],
    images: [
      {
        path: '/products/pr-2.webp',
        alt: 'Linden honey jar',
        isPrimary: true,
      },
    ],
  },

  {
    slug: 'wildflower-honey',
    isActive: true,
    i18n: [
      {
        lang: 'en',
        title: 'Wildflower honey',
        description: 'Balanced taste collected from wild meadow flowers.',
      },
      {
        lang: 'ru',
        title: 'Цветочный мёд',
        description: 'Сбалансированный вкус луговых цветов.',
      },
      {
        lang: 'be',
        title: 'Кветкавы мёд',
        description: 'Збалансаваны смак луговых кветак.',
      },
    ],
    categories: [ProductCategories.HONEY],
    variants: [
      { size: 250, unit: 'g', price: 600, stock: 70 },
      { size: 500, unit: 'g', price: 1050, stock: 50 },
    ],
    images: [
      {
        path: '/products/pr-3.webp',
        alt: 'Wildflower honey jar',
        isPrimary: true,
      },
    ],
  },

  {
    slug: 'propolis-tincture-30ml',
    isActive: true,
    i18n: [
      {
        lang: 'en',
        title: 'Propolis tincture 30 ml',
        description: 'Traditional propolis tincture for daily use.',
      },
      {
        lang: 'ru',
        title: 'Настойка прополиса 30 мл',
        description:
          'Традиционная настойка прополиса для ежедневного применения.',
      },
      {
        lang: 'be',
        title: 'Настойка прапалісу 30 мл',
        description: 'Традыцыйная настойка прапалісу для штодзённага ўжывання.',
      },
    ],
    categories: [ProductCategories.BEE_PRODUCTS],
    variants: [{ size: 30, unit: 'ml', price: 900, stock: 35 }],
    images: [
      {
        path: '/products/pr-4.webp',
        alt: 'Propolis tincture bottle',
        isPrimary: true,
      },
    ],
  },

  {
    slug: 'honey-gift-set-3x250g',
    isActive: true,
    i18n: [
      {
        lang: 'en',
        title: 'Honey gift set',
        description: 'Gift set with three jars of assorted honey (3 × 250 g).',
      },
      {
        lang: 'ru',
        title: 'Подарочный набор мёда',
        description: 'Набор из трёх банок мёда (3 × 250 г).',
      },
      {
        lang: 'be',
        title: 'Падарункавы набор мёду',
        description: 'Набор з трох слоікаў мёду (3 × 250 г).',
      },
    ],
    categories: [ProductCategories.HONEY, ProductCategories.GIFT_SETS],
    variants: [{ size: 1, unit: 'piece', price: 2500, stock: 15 }],
    images: [
      {
        path: '/products/pr-5.webp',
        alt: 'Honey gift set',
        isPrimary: true,
      },
    ],
  },
]
