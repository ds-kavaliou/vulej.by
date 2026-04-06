import { i18n } from '@lingui/core'
import type { LocaleKey } from '../constants/languages'

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function initI18n(locale: LocaleKey) {
  const { messages } = await import(`../../locales/${locale}/messages.po`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

export { i18n }
