import { and, eq, sql } from 'drizzle-orm'

import { db, CartsTable, CartItemsTable } from '@/database'

export async function createCart(userId?: string) {
  const [cart] = await db
    .insert(CartsTable)
    .values({
      userId: userId || null,
    })
    .returning()

  return cart
}

export async function findCartById(cartId: string) {
  return db.query.CartsTable.findFirst({
    where: eq(CartsTable.id, cartId),
  })
}

export async function findCartByToken(token: string) {
  return db.query.CartsTable.findFirst({
    where: eq(CartsTable.token, token),
  })
}

export async function findOrCreateCart(token?: string, userId?: string) {
  if (token) {
    const existing = await findCartByToken(token)
    if (existing) return existing
  }

  return createCart(userId)
}

/** Queries */

export async function getCartWithItems(cartId: string) {
  return db.query.CartsTable.findFirst({
    where: eq(CartsTable.id, cartId),
    with: {
      items: {
        columns: {
          quantity: true,
        },
        orderBy: (items, { asc }) => [asc(items.createdAt)],
        with: {
          variant: {
            with: {
              product: {
                with: {
                  i18n: true,
                  images: true,
                },
              },
            },
          },
        },
      },
    },
  })
}

/** Mutations */

export async function adjustCartItem(
  cartId: string,
  variantId: string,
  intent: 'increment' | 'decrement' | 'clear',
) {
  return db.transaction(async (tx) => {
    let result

    switch (intent) {
      case 'increment': {
        const [insertedOrUpdated] = await tx
          .insert(CartItemsTable)
          .values({
            cartId,
            variantId,
            quantity: 1,
          })
          .onConflictDoUpdate({
            target: [CartItemsTable.cartId, CartItemsTable.variantId],
            set: {
              quantity: sql`${CartItemsTable.quantity} + 1`,
              updatedAt: sql`NOW()`,
            },
          })
          .returning({
            cartId: CartItemsTable.cartId,
            variantId: CartItemsTable.variantId,
            quantity: CartItemsTable.quantity,
          })

        result = insertedOrUpdated

        break
      }

      case 'decrement': {
        const [decremented] = await tx
          .update(CartItemsTable)
          .set({
            quantity: sql`${CartItemsTable.quantity} - 1`,
            updatedAt: sql`NOW()`,
          })
          .where(
            and(
              eq(CartItemsTable.cartId, cartId),
              eq(CartItemsTable.variantId, variantId),
              sql`${CartItemsTable.quantity} > 1`,
            ),
          )
          .returning({
            cartId: CartItemsTable.cartId,
            variantId: CartItemsTable.variantId,
            quantity: CartItemsTable.quantity,
          })

        if (decremented) {
          result = decremented
        } else {
          await tx
            .delete(CartItemsTable)
            .where(
              and(
                eq(CartItemsTable.cartId, cartId),
                eq(CartItemsTable.variantId, variantId),
              ),
            )
        }

        break
      }

      case 'clear': {
        await tx
          .delete(CartItemsTable)
          .where(
            and(
              eq(CartItemsTable.cartId, cartId),
              eq(CartItemsTable.variantId, variantId),
            ),
          )

        break
      }
    }

    await tx
      .update(CartsTable)
      .set({ updatedAt: sql`NOW()` })
      .where(eq(CartsTable.id, cartId))

    return result
  })
}

/** Utilities */
