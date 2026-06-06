import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Trans } from '@lingui/react/macro'

import type { AdminLoginFormRef, AdminLoginParams } from '@/features/admin'
import { AdminLoginForm, useAdminLogInMutation } from '@/features/admin'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components'

type LoginSearch = {
  redirect?: string
}

export const Route = createFileRoute('/_auth/admin/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      redirect: (search.redirect as string) || '',
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const search = Route.useSearch()

  const formRef = useRef<AdminLoginFormRef | null>(null)
  const mutation = useAdminLogInMutation()

  const submit = () => formRef.current?.submit()
  const handle = (params: AdminLoginParams) =>
    mutation.mutateAsync({ ...params, redirect: search.redirect })

  return (
    <Card className="max-w-xl w-full mx-auto">
      <CardHeader>
        <CardTitle>
          <Trans>Authorization</Trans>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AdminLoginForm ref={formRef} onFormSubmit={handle} />
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={submit} disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Trans>Processing...</Trans>
          ) : (
            <Trans>Log In</Trans>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
