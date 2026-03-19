import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker(
  {
    astro: true,
    svelte: true,
    vue: true,
    // Keep demos lintable in IDEs. Package lint scripts don't target this root demo directory.
    ignores: ['**/fixtures/**'],
  },
)
