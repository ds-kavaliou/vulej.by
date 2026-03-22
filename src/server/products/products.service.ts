import { LocaleKey } from '@/common/lib'

import { getProductsWithRealations } from './products.db'
import { mapProductToDto } from './products.mapper'

export const getRecommendedProducts = async (locale: LocaleKey) => {
  const result = await getProductsWithRealations({ limit: 3 })

  return result.map((x) => mapProductToDto(x, locale))
}
