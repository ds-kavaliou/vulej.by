import { memo, useImperativeHandle } from 'react'
import { useForm } from '@tanstack/react-form-start'
import { Trans } from '@lingui/react/macro'
import { t } from '@lingui/core/macro'

import { ProductCreateSchema } from '../products.schema'
import type { ProductCreateParams } from '../products.schema'

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Switch,
} from '@/common/components'

export type ProductCreateFormRef = {
  submit: () => void
}

type ProductCreateFormProps = {
  onFormSubmit: (value: ProductCreateParams) => void
  ref: React.RefObject<ProductCreateFormRef | null>
}

function ProductCreateFormComponent({
  onFormSubmit,
  ref,
}: ProductCreateFormProps) {
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      slug: '',
      isActive: false,
    },
    validators: {
      onSubmit: ProductCreateSchema,
    },
    onSubmit: ({ value }) => onFormSubmit(value),
  })

  useImperativeHandle(ref, () => {
    return {
      submit: () => form.handleSubmit(),
    }
  }, [form])

  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <form.Field
              name="slug"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name} required>
                      <Trans>Slug</Trans>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder={t`Slug`}
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
              name="isActive"
              children={(field) => {
                return (
                  <Field orientation="horizontal">
                    <Switch
                      id={field.name}
                      name={field.name}
                      checked={field.state.value}
                      onCheckedChange={(e) => field.handleChange(e)}
                    />
                    <FieldLabel htmlFor={field.name}>
                      <Trans>Is Active</Trans>
                    </FieldLabel>
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  )
}

export const ProductCreateForm = memo(ProductCreateFormComponent)
