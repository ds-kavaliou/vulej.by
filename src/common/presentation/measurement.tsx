import { units } from '../constants/units'
import type { LocaleKey } from '../constants/languages'
import type { SupportedUnit } from '../constants/units'

type MeasurementProps = {
  value: number
  unit: SupportedUnit
  locale: LocaleKey
}

export function Measurement(props: MeasurementProps) {
  const { value, unit, locale } = props

  return (
    <div className="flex items-center">
      <span className="text-xs font-medium">{value}</span>
      <span className="text-xs">{units[unit][locale]}</span>
    </div>
  )
}
