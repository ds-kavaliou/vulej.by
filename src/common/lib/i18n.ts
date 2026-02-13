import { i18n } from '@lingui/core'
import { createServerOnlyFn } from '@tanstack/react-start'
import {
  getCookie,
  getRequestHeader,
  getRequestUrl,
  setCookie,
} from '@tanstack/react-start/server'

export const locales = {
  be: 'Belarusian',
  en: 'English',
  ru: 'Russian',
}

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

const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60,
  path: '/',
}

function persistLocale(locale: string) {
  setCookie('locale', locale, COOKIE_OPTIONS)
  return locale
}

export const getLocaleFromRequest = createServerOnlyFn(() => {
  const queryLocale = getRequestUrl().searchParams.get('locale') ?? ''
  if (isLocaleValid(queryLocale)) {
    return persistLocale(queryLocale)
  }

  // 2️⃣ cookie (saved preference)
  const cookieLocale = getCookie('locale') ?? ''
  if (isLocaleValid(cookieLocale)) {
    return cookieLocale
  }

  // 3️⃣ browser header (first visit)
  const headerLocale = getRequestHeader('accept-language') ?? ''
  if (isLocaleValid(headerLocale)) {
    return persistLocale(headerLocale)
  }

  // 4️⃣ fallback
  return persistLocale(defaultLocale)
})
