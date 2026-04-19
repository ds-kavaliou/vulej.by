import type { AnyRouteMatch } from '@tanstack/react-router'
import type { LocaleKey } from '../constants'

const defaults: AnyRouteMatch['meta'] = [
  {
    charSet: 'utf-8',
  },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
  },
  { name: 'google', content: 'notranslate' },
]

const seo = (locale: LocaleKey) => {
  const url = import.meta.env.VITE_APP_URL
  const config = seoI18nConfig[locale]

  return [
    { title: config.title },
    { name: 'description', content: config.description },
    /** Open Graph */
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:image', content: config.image },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: 'vulej.by' },
    /** Twitter */
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
    { name: 'twitter:image', content: config.image },
    { name: 'twitter:card', content: 'summary' },
  ]
}

export const meta = {
  defaults,
  seo,
}

const seoI18nConfig = {
  ru: {
    title: 'Свежий, домашний мёд. | vulej.by',
    description:
      'Превосходный мед 🍯 и продукция пчеловодства 🐝 из собственной пасеки - качество, которое стоит попробовать!',
    image: '/images/logo.png',
  },
  be: {
    title: 'Свежы, салодкі мёд. | vulej.by',
    description:
      'Выдатны мёд 🍯 і прадукцыя пчалярства 🐝 з уласнай пасекі — якасць, якую можна паспрабаваць!',
    image: '/images/logo.png',
  },
  en: {
    title: 'Fresh, homemade honey. | vulej.by',
    description:
      'Exceptional honey 🍯 and beekeeping products 🐝 from our own apiary - quality worth trying!',
    image: '/images/logo.png',
  },
} as const
