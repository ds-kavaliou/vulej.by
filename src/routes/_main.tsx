import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Trans } from '@lingui/react/macro'

import {
  Badge,
  Button,
  Icon,
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerSection,
} from '@/common/components'

import { cn } from '@/common/utils'
import { useMediaQuery } from '@/common/hooks'
import { CartItem, useCartState } from '@/features/cart'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-svh">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container-wrapper">
          <div className="container grid grid-cols-[auto_1fr_auto] grid-rows-[80px] items-center">
            <Logo />
            <Banner className="lg:order-last lg:ml-4 lg:border-l lg:border-gray-300 lg:pl-4" />
            <MenuButton className="justify-self-end" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="pt-5 pb-9">
        <div className="container-wrapper ">
          <div className="container flex flex-col gap-4 items-center">
            <SocialLinks />

            <Link to="/">
              <img
                className="h-16 w-12"
                src="/images/logo.avif"
                alt="Vulej.by"
              />
              <span className="sr-only">Vulej.by</span>
            </Link>

            <div className="text-xs font-light text-center">
              <span>
                © {2026} <Trans>Designed and developed by </Trans>
              </span>
              <a
                href="https://github.com/ds-kavaliou"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Dzianis Kavaliou
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export function Logo(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 {...props}>
      <Link to="/">
        <img className="h-16 w-12" src="/images/logo.avif" alt="Vulej.by" />
        <span className="sr-only">Vulej.by</span>
      </Link>
    </h1>
  )
}

export function Banner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col items-center py-2 text-sm', className)}
      {...props}
    >
      <span className="text-center lg:hidden">
        <Trans>Natural honey in Gomel</Trans>
      </span>
      <a href="tel:+375297303792">
        <span>+375 (29) 730-37-92</span>
      </a>
    </div>
  )
}

export function MenuButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const cart = useCartState()

  const total = cart.data.totalQuantity
  const items = cart.data.items

  return (
    <Drawer direction={isDesktop ? 'right' : 'bottom'} autoFocus>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className={cn('relative', className)}
          {...props}
        >
          <span className="sr-only">Toggle mobile menu</span>
          <Icon name="Ellipsis" className="w-8 h-8" />

          <Badge
            variant="destructive"
            className="absolute -right-2 -top-2 size-5.5 rounded-full"
            hidden={total <= 0}
          >
            {total}
          </Badge>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <DrawerSection>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </DrawerSection>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3].map((name, i) => (
        <Button
          key={i}
          size="icon"
          className="rounded-full"
          nativeButton={false}
          render={
            <a href="/" target="_blank">
              {name}
            </a>
          }
        >
          <Icon name="Facebook" className="w-5 h-5" />
        </Button>
      ))}
    </div>
  )
}
