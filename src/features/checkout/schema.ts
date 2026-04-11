import * as z from 'zod'
import { msg } from '@lingui/core/macro'

import { i18n } from '@/common/lib'
import { validateBYPhoneNumber } from '@/common/utils'

export const CheckoutFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: () => i18n._(msg`Name field is required.`) })
    .min(2, {
      error: (issue) => {
        const min = Number(issue.minimum)
        return i18n._(msg`Name must be at least ${min} characters.`)
      },
    }),
  phone: z.string().refine(validateBYPhoneNumber, {
    error: () => {
      return i18n._(msg`Invalid Belarus phone number.`)
    },
  }),
  address: z
    .string()
    .trim()
    .min(1, { error: () => i18n._(msg`Address field is required.`) })
    .min(10, {
      error: (issue) => {
        const min = Number(issue.minimum)
        return i18n._(msg`Address must be at least ${min} characters.`)
      },
    }),
  note: z
    .string()
    .trim()
    .max(256, {
      error: (issue) => {
        const max = Number(issue.maximum)
        return i18n._(msg`Address must be at max ${max} characters long.`)
      },
    }),
})
