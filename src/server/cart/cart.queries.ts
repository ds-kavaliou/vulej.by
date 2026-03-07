import { eq } from 'drizzle-orm'

import { db, CartsTable } from '@/database'

export async function getCartWithRelations(id: string) {
  return db.query.CartsTable.findFirst({
    where: eq(CartsTable.id, id),
    with: {
      items: {
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

export type CartWithRelations = NonNullable<
  Awaited<ReturnType<typeof getCartWithRelations>>
>
