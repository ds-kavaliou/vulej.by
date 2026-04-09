import styles from '@/styles.css?url'

export type LANG = 'ru' | 'be' | 'en'

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

export const fontLinks = [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Lato:wght@700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  },
  { rel: 'stylesheet', href: styles },
]

export const faviconLinks = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: '/favicon/favicon.ico',
  },
  { rel: 'manifest', href: '/favicon/site.webmanifest' },
  {
    rel: 'mask-icon',
    href: '/favicon/safari-pinned-tab.svg',
    color: '#5bbad5',
  },
]

export const seoI18n: Record<LANG, SEOConfig> = {
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

export function generateMetaTags(locale: LANG = 'en'): MetaTag[] {
  const seo = seoI18n[locale as LANG] || seoI18n.en

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

export function generateStructuredData(locale: LANG = 'en') {
  const seo = seoI18n[locale as LANG] || seoI18n.en

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seo.siteName || 'Vulej.by',
    url: seo.url || APP_URL,
    description: seo.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${APP_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vulej.by',
    url: APP_URL,
    logo: 'https://vulej-by.vercel.app/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+375-29-730-37-92',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'Belarusian', 'English'],
    },
    sameAs: [],
  }
}
