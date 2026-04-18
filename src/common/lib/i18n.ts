import { i18n } from '@lingui/core'
import type { LocaleKey } from '@/common/constants'

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function initI18n(locale: LocaleKey): Promise<LocaleKey> {
  const { messages } = await import(`../../locales/${locale}/messages.po`)

  i18n.load(locale, messages)
  i18n.activate(locale)

  return locale
}

export function getActiveLocale(): LocaleKey {
  return i18n.locale as LocaleKey
}

export { i18n }
