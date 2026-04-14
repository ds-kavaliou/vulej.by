import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import type { QueryClient } from '@tanstack/react-query'
import { defaultLocale } from '@/common/constants'
import { getLocaleFromRequest } from '@/common/lib/i18n.server'
import { getActiveLocale, i18n, initI18n } from '@/common/lib/i18n'
import { getCartStateOptions } from '@/features/cart'
import { generateMetaTags } from '@/common/lib/seo'
import { faviconLinks, fontLinks } from '@/common/lib'

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
    const locale = getActiveLocale()
    await context.queryClient.ensureQueryData(getCartStateOptions())
    return { locale }
  },
  head: ({ loaderData }) => {
    const locale = loaderData?.locale || defaultLocale

    const metaTags = generateMetaTags(locale)

    return {
      meta: metaTags,
      links: [...fontLinks, ...faviconLinks],
    }
  },
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
        <Scripts />
      </body>
    </html>
  )
}
