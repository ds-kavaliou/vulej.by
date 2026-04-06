import { currencies } from '../utils/money'
import type { LocaleKey } from '../constants/languages'

type PriceProps = {
  value: number
  locale: LocaleKey
}

export function Price(props: PriceProps) {
  const { value, locale } = props

  return (
    <div className="inline-flex items-center justify-center">
      <span className="text-sm font-medium">{(value / 100).toFixed(2)}</span>
      <span className="text-sm font-medium">{currencies[locale]}</span>
    </div>
  )
}
