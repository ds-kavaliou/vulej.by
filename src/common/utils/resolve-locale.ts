export function resolveLocale(
  text: { values: Record<string, string> },
  locale: string,
) {
  return text.values[locale] ?? text.values.en
}
