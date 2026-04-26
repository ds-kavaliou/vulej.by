import { Trans } from '@lingui/react/macro'

import type { ProductVariantDto } from '@/features/products'
import { useCartItem, useUpdateCartMutation } from '@/features/cart'

import { Button, Icon } from '@/common/components'

type CatalogItemActionProps = {
  selected: ProductVariantDto
}

export function CatalogItemAction({ selected }: CatalogItemActionProps) {
  const mutation = useUpdateCartMutation()
  const item = useCartItem(selected.id)

  const quantity = item?.quantity ?? 0
  const isInCart = quantity > 0

  return (
    <Button
      className="inline-flex items-center gap-2"
      variant="ghost"
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          data: {
            variantId: selected.id,
            intent: 'increment',
          },
        })
      }
    >
      <Icon name="Airplay" />
      <span className="uppercase tracking-widest text-xs font-bold transition-colors hover:text-secondary-foreground">
        {mutation.isPending ? (
          <Trans>Adding...</Trans>
        ) : isInCart ? (
          <>
            <Trans>Add more</Trans> {quantity}
          </>
        ) : (
          <Trans>Add to cart</Trans>
        )}
      </span>
    </Button>
  )
}
