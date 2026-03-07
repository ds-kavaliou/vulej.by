import { createServerFn } from '@tanstack/react-start'

import { getCartStateById } from '@/server'
import { getOrCreateCart } from './lib/get-or-create-cart'

export const getCartStateAction = createServerFn().handler(async () => {
  const cart = await getOrCreateCart()
  return getCartStateById(cart.id, 'be')
})
