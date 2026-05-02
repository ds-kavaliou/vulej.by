import z from 'zod'

export const ProductListSchema = z.object({
  q: z.string().min(1).optional(),
  page: z.number().min(0).optional(),
  perPage: z.number().min(0).optional(),
})

export type ProductListParams = z.infer<typeof ProductListSchema>

export const ProductCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(12),
  slug: z.string().min(1),
  isActive: z.boolean(),
})

export type ProductCreateParams = z.infer<typeof ProductCreateSchema>
