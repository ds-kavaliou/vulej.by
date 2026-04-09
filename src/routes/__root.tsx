import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import type { QueryClient } from '@tanstack/react-query'

import { getLocaleFromRequest } from '@/common/lib/i18n.server'
import { i18n, initI18n } from '@/common/lib/i18n'

import { getCartStateOptions } from '@/features/cart'

import {
  faviconLinks,
  fontLinks,
  generateMetaTags,
  generateOrganizationStructuredData,
  generateStructuredData,
  LANG,
} from '@/common/lib/seo'

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
    const cartData = await context.queryClient.ensureQueryData(
      getCartStateOptions(),
    )
    return { cartData }
  },
  head: () => {
    const locale = (i18n.locale || 'en') as LANG

    const metaTags = generateMetaTags(locale)
    const structuredData = generateStructuredData(locale)

    return {
      meta: metaTags,
      links: [...fontLinks, ...faviconLinks],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(structuredData),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(generateOrganizationStructuredData()),
        },
      ],
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
