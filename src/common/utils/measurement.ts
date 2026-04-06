import type { LocaleKey } from '../constants/languages'
import type { SupportedUnit } from '../constants/units'

const units: Record<SupportedUnit, Record<LocaleKey, string>> = {
  g: {
    be: 'г',
    en: 'g',
    ru: 'г',
  },
  kg: {
    be: 'кг',
    en: 'kg',
    ru: 'кг',
  },
  l: {
    be: 'л',
    en: 'l',
    ru: 'л',
  },
  ml: {
    be: 'мл',
    en: 'ml',
    ru: 'мл',
  },
  piece: {
    be: 'шт',
    en: 'piece',
    ru: 'шт',
  },
} as const

export function formatMeasurement(
  value: number,
  unit: SupportedUnit,
  locale: LocaleKey,
): string {
  return `${value} ${units[unit][locale]}`
}
