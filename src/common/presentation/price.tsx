import { LocaleKey } from '../constants/languages'
import { currencies } from '../utils/money'

type PriceProps = {
  value: number
  locale: LocaleKey
}

export function Price(props: PriceProps) {
  const { value, locale } = props

  return (
    <div className="flex items-center justify-center">
      <span className="text-sm font-medium">{(value / 100).toFixed(2)}</span>
      <span className="text-sm font-medium">{currencies[locale]}</span>
    </div>
  )
}
