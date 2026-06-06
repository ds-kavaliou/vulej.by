import { i18n } from '@lingui/core'
import type { LocaleKey } from '@/common/constants'

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function initI18n(locale: LocaleKey): Promise<LocaleKey> {
  const { messages } = await import(`../../locales/${locale}/messages.ts`)

  i18n.load(locale, messages)
  i18n.activate(locale)

  return locale
}

export { i18n }
