import { createServerFn } from '@tanstack/react-start'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { i18n, LocaleKey } from '@/common/lib'
import { ProductKeys } from './consts'

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
