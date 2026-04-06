import type { CartItemDto } from '@/server/cart'

import { Icon } from '@/common/components'
import { Measurement, Price } from '@/common/presentation'
import { useLocale } from '@/common/hooks'

import { useUpdateCartMutation } from '../actions'

type CartItemProps = {
  item: CartItemDto
}

export function CartItem({ item }: CartItemProps) {
  const mutation = useUpdateCartMutation()
  const locale = useLocale()

  const increment = () =>
    mutation.mutate({
      data: {
        variantId: item.variantId,
        intent: 'increment',
      },
    })

  const decrement = () =>
    mutation.mutate({
      data: {
        variantId: item.variantId,
        intent: 'decrement',
      },
    })

  const clear = () =>
    mutation.mutate({
      data: {
        variantId: item.variantId,
        intent: 'clear',
      },
    })

  return (
    <div className="grid grid-cols-[1rem_3rem_1fr_4rem_4rem] items-center gap-1 py-2 text-sm sm:text-base">
      <button onClick={clear}>
        <Icon name="X" className="w-4 h-4" />
      </button>
      <img src={item.image?.path} alt={item.title} />
      <div className="flex items-baseline gap-2">
        <h3 className="font-head uppercase">{item.title}</h3>
        <Measurement
          value={item.measurement.value}
          unit={item.measurement.unit}
          locale={locale}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <button onClick={decrement}>
          <Icon name="ChevronLeft" className="h-5 w-5" />
        </button>
        <span>{item.quantity}</span>
        <button onClick={increment}>
          <Icon name="ChevronRight" className="h-5 w-5" />
        </button>
      </div>
      <Price value={item.subtotal} locale={locale} />
    </div>
  )
}
