import { getProductsWithRelations } from './products.db'
import { mapProductToDto } from './products.mapper'

import type { LocaleKey } from '@/common/constants'

export const getRecommendedProducts = async (locale: LocaleKey) => {
  const result = await getProductsWithRelations({ limit: 3 })

  return result.map((x) => mapProductToDto(x, locale))
}
