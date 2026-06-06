import { useServerFn } from '@tanstack/react-start'
import { logoutFn } from '../admin.functions'
import { Button, Icon } from '@/common/components'

export function AdminLogoutButton() {
  const logout = useServerFn(logoutFn)

  return (
    <Button variant="outline" className="w-full" onClick={() => logout()}>
      <Icon name="LogOut" /> Log out
    </Button>
  )
}
