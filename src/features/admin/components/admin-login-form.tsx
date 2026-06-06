import { useForm } from '@tanstack/react-form-start'
import { Trans } from '@lingui/react/macro'
import { t } from '@lingui/core/macro'
import { useImperativeHandle } from 'react'
import z from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/common/components'

const AdminLoginSchema = z.object({
  password: z.string().trim().min(1, `Password is required`),
})

export type AdminLoginParams = z.infer<typeof AdminLoginSchema>

export type AdminLoginFormRef = {
  submit: () => void
}

export type AdminLoginFormProps = {
  onFormSubmit: (value: AdminLoginParams) => void
  ref: React.RefObject<AdminLoginFormRef | null>
}

export function AdminLoginForm({ onFormSubmit, ref }: AdminLoginFormProps) {
  const form = useForm({
    defaultValues: {
      password: '',
    },
    onSubmit: ({ value }) => onFormSubmit(value),
  })

  useImperativeHandle(ref, () => {
    return {
      submit: () => form.handleSubmit(),
    }
  }, [form])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()

        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field>
                <FieldLabel htmlFor={field.name} required>
                  <Trans>Password</Trans>
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={t`Your Password`}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
    </form>
  )
}
