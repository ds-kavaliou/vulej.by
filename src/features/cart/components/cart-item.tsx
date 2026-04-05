import { useUpdateCartMutation } from '../actions'
import type { CartItemDto } from '@/server/cart'
import { Icon } from '@/common/components'

type CartItemProps = {
  item: CartItemDto
}

export function CartItem({ item }: CartItemProps) {
  const mutation = useUpdateCartMutation()

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
    <div className="grid grid-cols-[auto_48px_1fr_70px_70px] items-center gap-1 py-2 text-sm sm:text-base">
      <button onClick={clear}>
        <Icon name="X" className="w-4 h-4" />
      </button>
      <img src={item.image?.path} alt={item.title} />
      <div className="flex items-baseline gap-2">
        <h3 className="font-head uppercase">{item.title}</h3>
        <span className="text-sm">{item.slug}</span>
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
      <div className="text-right">{item.subtotal.toFixed(2)} р.</div>
    </div>
  )
}
