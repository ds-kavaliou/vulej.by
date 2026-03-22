import { getCookie, setCookie } from '@tanstack/react-start/server'

import { createCart, getCartByToken } from './cart.service'

const COOKIE_KEY = 'cart'
const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 30,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
} as const

export async function getOrCreateCart() {
  const token = getCookie(COOKIE_KEY)

  if (token) {
    const cart = await getCartByToken(token)

    if (cart) return cart
  }

  const cart = await createCart()
  setCookie(COOKIE_KEY, cart.token, COOKIE_OPTIONS)

  return cart
}
