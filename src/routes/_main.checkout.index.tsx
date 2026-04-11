import { Trans } from '@lingui/react/macro'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  getFormData,
  mergeForm,
  useForm,
  useTransform,
} from '@tanstack/react-form-start'

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
} from '@/common/components'
import { sendMessageToTelegramChat } from '@/server/telegram'
import { CheckoutFormSchema } from '@/features/checkout'

const handleFormSubmit = createServerFn({ method: 'POST' })
  .inputValidator(async (data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new Response('Invalid form submission', { status: 400 })
    }

    const parsed = await CheckoutFormSchema.safeParseAsync(
      Object.fromEntries(data),
    )

    if (!parsed.success) {
      throw new Response('Invalid form submission', { status: 400 })
    }

    return parsed.data
  })
  .handler(async (ctx) => {
    console.log('--->', ctx.data)

    const result = await sendMessageToTelegramChat(JSON.stringify(ctx.data))

    if (result.message_id) {
      throw redirect({ to: '/checkout/success' })
    }

    throw redirect({ to: '/checkout/failure' })
  })

const getServerFormData = createServerFn({ method: 'GET' }).handler(async () =>
  getFormData(),
)

export const Route = createFileRoute('/_main/checkout/')({
  component: RouteComponent,
  loader: async () => ({
    state: await getServerFormData(),
  }),
})

function RouteComponent() {
  const { state } = Route.useLoaderData()

  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
    },
    validators: {
      onBlur: CheckoutFormSchema,
    },
    transform: useTransform((base) => mergeForm(base, state), [state]),
  })

  return (
    <form
      action={handleFormSubmit.url}
      encType="multipart/form-data"
      method="post"
    >
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
                    <FieldLabel htmlFor={field.name}>
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
                    <FieldLabel htmlFor={field.name}>
                      <Trans>Phone Number</Trans>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder={t`Phone Number`}
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
              name="address"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      <Trans>Address</Trans>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder={t`Address`}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </FieldSet>

        <Field orientation="horizontal">
          <form.Subscribe selector={(f) => [f.canSubmit, f.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
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
