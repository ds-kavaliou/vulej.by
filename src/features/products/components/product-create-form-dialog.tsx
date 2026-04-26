import { ProductCreateForm } from './product-create-form'
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
} from '@/common/components'

export function ProductCreateFormDialog() {
  return (
    <Dialog>
      <DialogTrigger>new</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <ProductCreateForm />

        <DialogFooter className="sm:justify-start">
          <DialogClose render={<Button type="button">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
