import { createServerFn } from '@tanstack/react-start'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { i18n } from '@lingui/core'
import {
  findFeaturedProductList,
  findPaginatedProductList,
} from './products.server'
import { ProductListSchema } from './products.schema'
import { mapProductToDto } from './products.mapper'
import { ProductKeys } from './consts'
import type { ProductListParams } from './products.schema'
import type { LocaleKey } from '@/common/constants'

export const findProductsFn = createServerFn()
  .inputValidator(ProductListSchema)
  .handler(async ({ data }) => {
    return findPaginatedProductList(data).then((result) =>
      result.map((x) => mapProductToDto(x, i18n.locale as LocaleKey)),
    )
  })

export const findProductsQueryOptions = (value: ProductListParams) => {
  return queryOptions({
    queryKey: [ProductKeys.Products, value.page, value.perPage, value.q],
    queryFn: () => findProductsFn({ data: value }),
  })
}

export const useProducts = (value: ProductListParams) => {
  return useSuspenseQuery(findProductsQueryOptions(value))
}

/** --- */

export const findFeaturedProductsFn = createServerFn().handler(async () => {
  return findFeaturedProductList().then((result) =>
    result.map((x) => mapProductToDto(x, i18n.locale as LocaleKey)),
  )
})

export const findFeaturedProductsQueryOptions = () => {
  return queryOptions({
    queryKey: [ProductKeys.Recommended],
    queryFn: () => findFeaturedProductsFn(),
  })
}

export const useFeaturedProducts = () => {
  return useSuspenseQuery(findFeaturedProductsQueryOptions())
}
