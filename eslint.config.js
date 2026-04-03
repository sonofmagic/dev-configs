if (typeof Object.groupBy !== 'function') {
  Object.defineProperty(Object, 'groupBy', {
    value(items, callback) {
      const groups = {}
      let index = 0

      for (const item of items) {
        const key = callback(item, index++)
        groups[key] ??= []
        groups[key].push(item)
      }

      return groups
    },
    configurable: true,
    writable: true,
  })
}

const { icebreaker } = await import('@icebreakers/eslint-config')

export default icebreaker(
  {
    astro: true,
    svelte: true,
    vue: true,
    // Keep demos lintable in IDEs. Package lint scripts don't target this root demo directory.
    ignores: ['**/fixtures/**'],
  },
)
