import { createServerFn } from '@tanstack/react-start'
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { getCartStateById, addToCart } from '@/server/cart'
import { i18n, LocaleKey } from '@/common/lib'

import { getOrCreateCart } from './lib/get-or-create-cart.server'
import { CartKeys } from './consts'

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
  return useSuspenseQuery(getCartStateOptions())
}

export const addToCartAction = createServerFn({ method: 'POST' })
  .inputValidator((input: { variantId: string }) => input)
  .handler(async ({ data }) => {
    const cart = await getOrCreateCart()

    await addToCart(cart.id, data.variantId)

    return getCartStateById(cart.id, i18n.locale as LocaleKey)
  })

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addToCartAction,
    onSuccess: (cart) => {
      queryClient.setQueryData([CartKeys.CartState], cart)
    },
  })
}
