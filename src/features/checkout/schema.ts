import * as z from 'zod'

export const CheckoutFormSchema = z.object({
  name: z.string().min(3, 'the field must be at least 3 characters.'),
  phone: z.string().min(3, 'the field must be at least 3 characters.'),
  address: z.string().min(3, 'the field must be at least 3 characters.'),
})
