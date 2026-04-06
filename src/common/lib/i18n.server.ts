import {
  getCookie,
  getRequestHeader,
  getRequestUrl,
  setCookie,
} from '@tanstack/react-start/server'

import { defaultLocale } from '../constants/languages'
import { isLocaleValid } from '../utils/locale'
import type { LocaleKey } from '../constants/languages'

const COOKIE_KEY = 'locale'
const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60,
  path: '/',
}

function persistLocale(locale: string) {
  setCookie(COOKIE_KEY, locale, COOKIE_OPTIONS)
  return locale as LocaleKey
}

export const getLocaleFromRequest = (): LocaleKey => {
  // 1️⃣ query param (user override)
  const queryLocale = getRequestUrl().searchParams.get(COOKIE_KEY) ?? ''
  if (isLocaleValid(queryLocale)) {
    return persistLocale(queryLocale)
  }

  // 2️⃣ cookie (saved preference)
  const cookieLocale = getCookie(COOKIE_KEY) ?? ''
  if (isLocaleValid(cookieLocale)) {
    return cookieLocale as LocaleKey
  }

  // 3️⃣ browser header (first visit)
  const headerLocale = getRequestHeader('accept-language') ?? ''
  if (isLocaleValid(headerLocale)) {
    return persistLocale(headerLocale)
  }

  // 4️⃣ fallback
  return persistLocale(defaultLocale)
}
