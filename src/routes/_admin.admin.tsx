import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icon,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/common/components'

export const Route = createFileRoute('/_admin/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Admin Panel</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon name="LayoutDashboard" />
                    <Link to="/admin" className="w-full">
                      Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={(props) => (
                      <SidebarMenuButton {...props}>
                        <Icon name="Box" />
                        <span>Catalog</span>
                        <Icon
                          name="ChevronDown"
                          className="ml-auto transition-transform group-data-open/collapsible:rotate-180"
                        />
                      </SidebarMenuButton>
                    )}
                  />

                  <CollapsibleContent
                    render={
                      <SidebarMenuSub>
                        {menus.map((entity) => (
                          <SidebarMenuSubItem key={entity.id}>
                            <SidebarMenuSubButton
                              render={(props) => (
                                <Link to={entity.to} {...props}>
                                  {entity.name}
                                </Link>
                              )}
                            />
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    }
                  />
                </SidebarMenuItem>
              </Collapsible>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>footer</SidebarFooter>
      </Sidebar>

      <div className="flex flex-col gap-2 w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>

        <main className="px-4">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

const menus = [{ id: 1, name: 'Products', to: '/admin/products' }] as const
