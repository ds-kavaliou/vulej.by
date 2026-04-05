import type { getCartWithItems } from './cart.db'

export type CartWithRelations = NonNullable<
  Awaited<ReturnType<typeof getCartWithItems>>
>
