import { useMemo } from 'react'
import { Trans } from '@lingui/react/macro'

import { Button, Icon } from '@/common/components'

import { useAddToCartMutation, useCartState } from '@/features/cart'
import { ProductCard } from '@/features/products'

import { CartItemDto } from '@/server/cart'
import { ProductDto, ProductVariantDto } from '@/server/products'

type CatalogItemCardProps = {
  product: ProductDto
}

export function CatalogItemCard({ product }: CatalogItemCardProps) {
  const cart = useCartState()
  const addToCart = useAddToCartMutation()

  const cartItemsMap = useMemo(() => {
    return cart.data.items.reduce<Record<string, CartItemDto>>(
      (map, item) => ((map[item.variantId] = item), map),
      {},
    )
  }, [cart.data.items])

  const render = (selected: ProductVariantDto) => {
    const quantity = cartItemsMap[selected.id]?.quantity ?? 0
    const isInCart = quantity > 0

    return (
      <Button
        className="inline-flex items-center gap-2"
        variant="ghost"
        disabled={addToCart.isPending}
        onClick={() =>
          addToCart.mutate({
            data: {
              variantId: selected.id,
            },
          })
        }
      >
        <Icon name="Airplay" />
        <span className="uppercase tracking-widest text-xs font-bold transition-colors hover:text-secondary-foreground">
          {addToCart.isPending ? (
            <Trans>Adding...</Trans>
          ) : isInCart ? (
            <span>
              <Trans>Add more</Trans> {quantity}
            </span>
          ) : (
            <Trans>Add to cart</Trans>
          )}
        </span>
      </Button>
    )
  }

  return <ProductCard product={product} render={render} />
}
