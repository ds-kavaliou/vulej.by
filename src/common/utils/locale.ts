import { supportedLocales } from '../constants/languages'

export const isLocaleValid = (locale: string) =>
  Object.keys(supportedLocales).includes(locale)
