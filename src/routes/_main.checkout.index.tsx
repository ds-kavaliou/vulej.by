import { Trans } from '@lingui/react/macro'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { useForm } from '@tanstack/react-form-start'
import { t } from '@lingui/core/macro'

import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Input,
  Textarea,
} from '@/common/components'
import { sendMessageToTelegramChat } from '@/server/telegram'
import { CheckoutFormSchema } from '@/features/checkout'
import { formatBYPhoneNumber } from '@/common/utils'

const handleCheckoutFormSubmit = createServerFn({ method: 'POST' })
  .inputValidator(async (data: unknown) => {
    const parsed = await CheckoutFormSchema.safeParseAsync(data)

    if (!parsed.success) {
      throw new Response(JSON.stringify(parsed.error.flatten()), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return parsed.data
  })
  .handler(async (ctx) => {
    const result = await sendMessageToTelegramChat(JSON.stringify(ctx.data))

    if (result.success) {
      throw redirect({ to: '/checkout/success' })
    }

    throw redirect({ to: '/checkout/failure' })
  })

export const Route = createFileRoute('/_main/checkout/')({
  component: RouteComponent,
})

function RouteComponent() {
  const submit = useServerFn(handleCheckoutFormSubmit)

  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      note: '',
    },
    validators: {
      onSubmit: CheckoutFormSchema,
    },
    onSubmit: async (f) => await submit({ data: f.value }),
  })

  return (
    <form onSubmit={(e) => (e.preventDefault(), void form.handleSubmit())}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>
            <Trans>Contact Info</Trans>
          </FieldLegend>
          <FieldDescription>
            <Trans>Contact Description</Trans>
          </FieldDescription>

          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name} required>
                      <Trans>Name</Trans>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder={t`Name`}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name} required>
                      <Trans>Phone Number</Trans>
                    </FieldLabel>
                    <Input
                      type="tel"
                      autoComplete="tel"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(formatBYPhoneNumber(e.target.value))
                      }
                      aria-invalid={isInvalid}
                      placeholder={t`Phone Number`}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="address"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name} required>
                      <Trans>Address</Trans>
                    </FieldLabel>
                    <Input
                      autoComplete="street-address"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder={t`Address`}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="note"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      <Trans>Note</Trans>
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={t`Note`}
                    />
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </FieldSet>

        <Field orientation="horizontal">
          <form.Subscribe
            selector={(f) => [f.canSubmit, f.isSubmitting, f.isPristine]}
          >
            {([canSubmit, isSubmitting, isPristine]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting || isPristine}
              >
                {isSubmitting ? (
                  <Trans>Processing...</Trans>
                ) : (
                  <Trans>Submit</Trans>
                )}
              </Button>
            )}
          </form.Subscribe>
        </Field>
      </FieldGroup>
    </form>
  )
}
