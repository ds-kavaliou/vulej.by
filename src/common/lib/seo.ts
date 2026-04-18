import type { LocaleKey } from '@/common/constants'
import { defaultLocale } from '@/common/constants'

export interface SEOConfig {
  title: string
  description: string
  image: string
  url?: string
  siteName?: string
}

type MetaTag =
  | { charSet: string }
  | { name: string; content: string }
  | { title: string }
  | { property: string; content: string }
  | { rel: string; href: string }

const APP_URL = import.meta.env.VITE_APP_URL || 'https://vulej-by.vercel.app/'

export const seoI18n: Record<LocaleKey, SEOConfig> = {
  ru: {
    title: 'Свежий, домашний мёд. | vulej.by',
    description:
      'Превосходный мед 🍯 и продукция пчеловодства 🐝 из собственной пасеки - качество, которое стоит попробовать!',
    image: 'https://vulej-by.vercel.app/images/logo.png',
    url: APP_URL,
    siteName: 'Vulej.by',
  },
  be: {
    title: 'Свежы, салодкі мёд. | vulej.by',
    description:
      'Выдатны мёд 🍯 і прадукцыя пчалярства 🐝 з уласнай пасекі — якасць, якую можна паспрабаваць!',
    image: 'https://vulej-by.vercel.app/images/logo.png',
    url: APP_URL,
    siteName: 'Vulej.by',
  },
  en: {
    title: 'Fresh, homemade honey. | vulej.by',
    description:
      'Exceptional honey 🍯 and beekeeping products 🐝 from our own apiary - quality worth trying!',
    image: 'https://vulej-by.vercel.app/images/logo.png',
    url: APP_URL,
    siteName: 'Vulej.by',
  },
}

export function generateMetaTags(
  locale: LocaleKey = defaultLocale,
): Array<MetaTag> {
  const seo = seoI18n[locale]

  return [
    { charSet: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
    { title: seo.title },
    { name: 'description', content: seo.description },
    { name: 'google', content: 'notranslate' },
    // Open Graph
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:image', content: seo.image },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: seo.url || APP_URL },
    { property: 'og:site_name', content: seo.siteName || 'Vulej.by' },
    // Twitter Card
    { name: 'twitter:title', content: seo.title },
    { name: 'twitter:description', content: seo.description },
    { name: 'twitter:image', content: seo.image },
    { name: 'twitter:card', content: 'summary_large_image' },
    // Canonical URL
    { rel: 'canonical', href: `${APP_URL}` },
  ]
}
