import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { createServerFn } from '@tanstack/react-start'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient } from '@tanstack/react-query'

import { getLocaleFromRequest } from '@/common/lib/i18n.server'
import { i18n, initI18n } from '@/common/lib/i18n'

import { getCartStateOptions } from '@/features/cart'

import styles from '@/styles.css?url'

const initI18nFn = createServerFn().handler(() =>
  initI18n(getLocaleFromRequest()),
)

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  beforeLoad: async () => {
    await initI18nFn()
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getCartStateOptions())
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Vulej.by',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: styles,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => {
    return <p>This page doesn't exist!</p>
  },
  errorComponent: () => {
    return <p>Something went wrong</p>
  },
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={i18n.locale} className="layout-fixed">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Query',
              render: <ReactQueryDevtools />,
            },
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />

        <Scripts />
      </body>
    </html>
  )
}
