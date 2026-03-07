import { i18n } from '@lingui/core'

export const locales = {
  be: 'Belarusian',
  en: 'English',
  ru: 'Russian',
} as const

export type LocaleKey = keyof typeof locales

export const isLocaleValid = (locale: string) =>
  Object.keys(locales).includes(locale)

export const defaultLocale = 'en'

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function initI18n(locale: string) {
  const { messages } = await import(`../../locales/${locale}/messages.po`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

export { i18n }
