import { __applyVueVersionSpecificRules, createBaseRuleSet, resolveUserOptions } from '@/options'

describe('resolveUserOptions', () => {
  it('expands boolean feature flags into config objects', () => {
    const resolved = resolveUserOptions({ vue: true, typescript: true })

    const resolvedVue = resolved.vue
    const resolvedTypescript = resolved.typescript

    if (!resolvedVue || typeof resolvedVue === 'boolean') {
      throw new Error('Expected vue options to resolve to an object')
    }

    if (!resolvedTypescript || typeof resolvedTypescript === 'boolean') {
      throw new Error('Expected typescript options to resolve to an object')
    }

    expect(resolvedVue.overrides?.['vue/no-useless-v-bind']).toBeDefined()
    expect(resolvedVue.overrides?.['vue/no-v-for-template-key-on-child']).toBe('error')
    expect(resolvedVue.overrides?.['vue/no-v-for-template-key']).toBe('off')
    expect(resolvedTypescript.overrides?.['ts/no-unused-vars']).toBeDefined()
    expect(resolved.formatters).toBe(true)
  })

  it('keeps vue disabled when not configured', () => {
    const resolved = resolveUserOptions()

    expect(resolved.vue).toBeUndefined()

    const resolvedTypescript = resolved.typescript
    if (!resolvedTypescript || typeof resolvedTypescript === 'boolean') {
      throw new Error('Expected typescript options to resolve to an object')
    }
    expect(resolvedTypescript.overrides?.['ts/no-unused-vars']).toBeDefined()
  })

  it('keeps disabled feature flags as false', () => {
    const resolved = resolveUserOptions({ vue: false, typescript: false })

    expect(resolved.vue).toBe(false)
    expect(resolved.typescript).toBe(false)
  })

  it('applies vue2 specific overrides when requested', () => {
    const resolved = resolveUserOptions({
      vue: {
        vueVersion: 2,
        overrides: {},
      },
    })

    const resolvedVue = resolved.vue
    if (!resolvedVue || typeof resolvedVue === 'boolean') {
      throw new Error('Expected vue options to resolve to an object')
    }

    expect(resolvedVue.overrides?.['vue/no-v-for-template-key-on-child']).toBe('off')
    expect(resolvedVue.overrides?.['vue/no-deprecated-v-bind-sync']).toBe('off')
  })

  it('merges custom typescript overrides with the defaults', () => {
    const resolved = resolveUserOptions({
      typescript: {
        overrides: {
          'ts/custom-rule': 'error',
        },
      },
    })

    const resolvedTypescript = resolved.typescript
    if (!resolvedTypescript || typeof resolvedTypescript === 'boolean') {
      throw new Error('Expected typescript options to resolve to an object')
    }

    expect(resolvedTypescript.overrides?.['ts/custom-rule']).toBe('error')
    expect(resolvedTypescript.overrides?.['ts/no-unused-expressions']).toBeDefined()
  })

  it('merges custom vue overrides with the defaults', () => {
    const resolved = resolveUserOptions({
      vue: {
        overrides: {
          'vue/custom-rule': 'warn',
        },
      },
    })

    const resolvedVue = resolved.vue
    if (!resolvedVue || typeof resolvedVue === 'boolean') {
      throw new Error('Expected vue options to resolve to an object')
    }

    expect(resolvedVue.overrides?.['vue/custom-rule']).toBe('warn')
    expect(resolvedVue.overrides?.['vue/no-useless-v-bind']).toBeDefined()
  })
})

describe('createBaseRuleSet', () => {
  it('returns the default rules in modern mode', () => {
    expect(createBaseRuleSet(false)['unicorn/prefer-number-properties']).toBe('warn')
  })

  it('disables perfectionist sorting in legacy mode', () => {
    expect(createBaseRuleSet(true)['perfectionist/sort-imports']).toBe('off')
  })
})

describe('applyVueVersionSpecificRules', () => {
  it('skips processing when option is not an object', () => {
    expect(() => __applyVueVersionSpecificRules(false)).not.toThrow()
  })

  it('skips processing when overrides are missing', () => {
    const option = { overrides: undefined } as any
    __applyVueVersionSpecificRules(option)
    expect(option.overrides).toBeUndefined()
  })
})
