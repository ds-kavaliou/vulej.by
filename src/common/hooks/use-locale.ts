import { useLingui } from '@lingui/react/macro'
import { LocaleKey } from '../constants'

export function useLocale() {
  const { i18n } = useLingui()

  return i18n.locale as LocaleKey
}
