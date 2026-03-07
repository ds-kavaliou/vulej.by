import { eq } from 'drizzle-orm'

import { LocaleKey } from '@/common/lib'
import { db, CartsTable } from '@/database'

import { mapCartToDto } from './cart.mapper'
import { getCartWithRelations } from './cart.queries'

export const createCart = async () => {
  const [cart] = await db.insert(CartsTable).values({}).returning()
  return cart
}

export const getCartByToken = async (token: string) => {
  return db.query.CartsTable.findFirst({
    where: eq(CartsTable.token, token),
  })
}

export const getCartStateById = async (id: string, locale: LocaleKey) => {
  const result = await getCartWithRelations(id)

  if (!result) throw new Error('Cart not found')

  return mapCartToDto(result, locale)
}
