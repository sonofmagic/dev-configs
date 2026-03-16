import { defineConfig } from 'tsdown'

export default defineConfig({
  checks: {
    pluginTimings: false,
  },
  entry: {
    index: 'src/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: {
    resolver: 'tsc',
  },
  clean: true,
  fixedExtension: false,
  deps: {
    neverBundle: ['eslint-plugin-mdx'],
    onlyBundle: false,
  },
})
