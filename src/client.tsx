import { StrictMode } from 'react'
import { StartClient } from '@tanstack/react-start/client'
import { hydrateRoot } from 'react-dom/client'

import { initI18n } from './common/lib/i18n'
import type { LocaleKey } from './common/constants'

initI18n(document.documentElement.lang as LocaleKey)

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
