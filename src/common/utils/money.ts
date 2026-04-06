import type { LocaleKey } from '../constants/languages'

export const currencies: Record<LocaleKey, string> = {
  be: 'р.',
  en: '$',
  ru: '₽',
} as const

export function formatMoney(cents: number, locale: LocaleKey): string {
  return `${(cents / 100).toFixed(2)} ${currencies[locale]}`
}
