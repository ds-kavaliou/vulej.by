import { createFileRoute } from '@tanstack/react-router'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components'

export const Route = createFileRoute('/_auth/admin/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card className="max-w-xl w-full mx-auto">
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
      </CardHeader>
      <CardContent>admin auth form</CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  )
}
