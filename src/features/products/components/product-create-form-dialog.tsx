import { useCallback, useRef } from 'react'
import { Trans } from '@lingui/react/macro'

import { useCreateProductMutation } from '../products.functions'
import { ProductCreateForm } from './product-create-form'
import type { ProductCreateParams } from '../products.schema'
import type { ProductCreateFormRef } from './product-create-form'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icon,
} from '@/common/components'

export function ProductCreateFormDialog() {
  const formRef = useRef<ProductCreateFormRef | null>(null)
  const mutation = useCreateProductMutation()

  const pending = mutation.isPending

  const submit = () => formRef.current?.submit()
  const handle = useCallback((value: ProductCreateParams) => {
    mutation.mutate({ data: value })
  }, [])

  return (
    <Dialog>
      <DialogTrigger
        render={(props) => (
          <Button variant="outline" size="icon" {...props}>
            <Icon name="Plus" />
          </Button>
        )}
      />
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            <Trans>Create Product</Trans>
          </DialogTitle>
          <DialogDescription>
            <Trans>Create a new product</Trans>
          </DialogDescription>
        </DialogHeader>

        <ProductCreateForm ref={formRef} onFormSubmit={handle} />

        <DialogFooter className="sm:justify-start">
          <DialogClose
            render={
              <Button type="button" variant="outline">
                <Trans>Cancel</Trans>
              </Button>
            }
          />

          <Button type="button" onClick={submit} disabled={pending}>
            {pending ? <Trans>Processing...</Trans> : <Trans>Submit</Trans>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
