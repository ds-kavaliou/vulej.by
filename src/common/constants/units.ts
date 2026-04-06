import { LocaleKey } from './languages'

export type SupportedUnit = (typeof supportedUnits)[number]

export const supportedUnits = ['g', 'kg', 'l', 'ml', 'piece'] as const
export const units: Record<SupportedUnit, Record<LocaleKey, string>> = {
  g: {
    be: 'гр',
    en: 'g',
    ru: 'гр',
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
