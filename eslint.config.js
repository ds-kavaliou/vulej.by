//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import pluginLingui from 'eslint-plugin-lingui'

export default [
  {
    ignores: [
      '.output/**',
      '.vinxi/**',
      '.history/**',
      '.tanstack/**',
      'dist/**',
      'src/locales/**',
      'lingui.config.js',
      'commitlint.config.js',
      'eslint.config.js',
      'prettier.config.js',
    ],
  },
  pluginLingui.configs['flat/recommended'],
  ...tanstackConfig,
]
