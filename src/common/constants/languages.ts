export const supportedLanguages = ['be', 'en', 'ru'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

export const supportedLocales: Record<SupportedLanguage, string> = {
  be: 'Belarusian',
  en: 'English',
  ru: 'Russian',
} as const

export const defaultLocale: LocaleKey = 'en'

export type LocaleKey = keyof typeof supportedLocales
