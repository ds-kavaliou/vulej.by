//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: [
      '.output/**',
      '.vinxi/**',
      'dist/**',
      'src/locales/**',
      'lingui.config.js',
      'commitlint.config.js',
      'eslint.config.js',
      'prettier.config.js',
    ],
  },
  ...tanstackConfig,
]
