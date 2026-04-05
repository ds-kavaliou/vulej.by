import { mapCartToDto } from './cart.mapper'
import { adjustCartItem, findCartByToken, getCartWithItems } from './cart.db'
import type { LocaleKey } from '@/common/lib'
import { CartsTable, db } from '@/database'


export const createCart = async () => {
  const [cart] = await db.insert(CartsTable).values({}).returning()

  return cart
}

export const getCartByToken = async (token: string) => {
  return findCartByToken(token)
}

export const getCartStateById = async (id: string, locale: LocaleKey) => {
  const result = await getCartWithItems(id)

  if (!result) throw new Error('Cart not found')

  return mapCartToDto(result, locale)
}

export const incrementCartItem = async (cartId: string, variantId: string) => {
  return adjustCartItem(cartId, variantId, 'increment')
}

export const decrementCartItem = async (cartId: string, variantId: string) => {
  return adjustCartItem(cartId, variantId, 'decrement')
}

export const removeCartItem = async (cartId: string, variantId: string) => {
  return adjustCartItem(cartId, variantId, 'clear')
}
