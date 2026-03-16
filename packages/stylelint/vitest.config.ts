import path from 'node:path'
import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: 'stylelint-plugin-no-tailwindcss',
        replacement: path.resolve(__dirname, '../stylelint-plugin-no-tailwindcss/src/index.ts'),
      },
      {
        find: 'postcss-tailwindcss',
        replacement: path.resolve(__dirname, '../postcss-tailwindcss/src/index.ts'),
      },
    ],
    globals: true,
    testTimeout: 60_000,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      enabled: true,
      provider: 'v8',
      all: true,
      skipFull: true,
      include: [
        'src/**',
      ],
      exclude: [
        '**/*.d.ts',
        '**/dist/**',
      ],
      thresholds: {
        lines: 95,
        branches: 95,
        functions: 95,
        statements: 95,
      },
    },
  },
})
