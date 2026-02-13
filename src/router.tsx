import { createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { PropsWithChildren } from 'react'
import { I18nProvider } from '@lingui/react'
import { i18n } from './common/lib/i18n'

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    Wrap: ({ children }: PropsWithChildren) => {
      return <I18nProvider i18n={i18n}>{children}</I18nProvider>
    },
  })

  return router
}
