import { createServerFn } from '@tanstack/react-start'
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import {
  getOrCreateCart,
  getCartStateById,
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
} from '@/server/cart'
import { i18n, LocaleKey } from '@/common/lib'

import { CartKeys } from './consts'

/** get */
export const getCartStateAction = createServerFn().handler(async () => {
  const cart = await getOrCreateCart()
  return getCartStateById(cart.id, i18n.locale as LocaleKey)
})

export const getCartStateOptions = () => {
  return queryOptions({
    queryKey: [CartKeys.CartState],
    queryFn: () => getCartStateAction(),
  })
}

export const useCartState = () => {
  return useSuspenseQuery({ ...getCartStateOptions() })
}

export const useCartItemsMap = () => {
  return useSuspenseQuery({
    ...getCartStateOptions(),
    select: (cart) => {
      return cart.items.reduce<Record<string, (typeof cart.items)[number]>>(
        (acc, item) => {
          acc[item.variantId] = item
          return acc
        },
        {},
      )
    },
  })
}

export const useCartItem = (variantId: string) => {
  const { data } = useCartItemsMap()
  return data[variantId] ?? null
}

/** update */
export const updateCartAction = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: {
      variantId: string
      intent: 'increment' | 'decrement' | 'clear'
    }) => input,
  )
  .handler(async ({ data }) => {
    const cart = await getOrCreateCart()

    if (data.intent === 'increment') {
      await incrementCartItem(cart.id, data.variantId)
    } else if (data.intent === 'decrement') {
      await decrementCartItem(cart.id, data.variantId)
    } else if (data.intent === 'clear') {
      await removeCartItem(cart.id, data.variantId)
    }

    return getCartStateById(cart.id, i18n.locale as LocaleKey)
  })

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCartAction,
    onSuccess: (cart) => {
      queryClient.setQueryData([CartKeys.CartState], cart)
    },
  })
}
