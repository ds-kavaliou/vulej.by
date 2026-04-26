import z from 'zod'

export const ProductListSchema = z.object({
  q: z.string().min(1).optional(),
  page: z.number().min(0).optional(),
  perPage: z.number().min(0).optional(),
})

export type ProductListParams = z.infer<typeof ProductListSchema>
