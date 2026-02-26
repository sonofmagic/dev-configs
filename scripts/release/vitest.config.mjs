import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['scripts/release/lib/**/*.test.mjs'],
    coverage: {
      enabled: false,
    },
  },
})
