import { createServerFn } from '@tanstack/react-start'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { ProductKeys } from './consts'
import type { LocaleKey } from '@/common/lib';
import { i18n } from '@/common/lib'

const getRecommendedProductsAction = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { getRecommendedProducts } = await import('@/server/products')
    return await getRecommendedProducts(i18n.locale as LocaleKey)
  },
)

export const getRecommendedProductsQueryOptions = () => {
  return queryOptions({
    queryKey: [ProductKeys.Recommended],
    queryFn: () => getRecommendedProductsAction(),
  })
}

export const useRecommendedProducts = () => {
  return useSuspenseQuery(getRecommendedProductsQueryOptions())
}
