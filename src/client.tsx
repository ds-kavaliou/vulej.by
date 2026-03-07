import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { initI18n } from './common/lib/i18n'

initI18n(document.documentElement.lang)

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
