
import { getProductsWithRealations } from './products.db'
import { mapProductToDto } from './products.mapper'
import type { LocaleKey } from '@/common/lib'

export const getRecommendedProducts = async (locale: LocaleKey) => {
  const result = await getProductsWithRealations({ limit: 3 })

  return result.map((x) => mapProductToDto(x, locale))
}
