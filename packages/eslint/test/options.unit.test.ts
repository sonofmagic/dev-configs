import { getDefaultTypescriptOptions, getDefaultVueOptions } from '@/defaults'
import { __applyVueVersionSpecificRules, createBaseRuleSet, resolveUserOptions } from '@/options'
import { isObject } from '@/utils'

describe('defaults helpers', () => {
  it('enables ionic and weapp tweaks for vue projects', () => {
    const vueOptions = getDefaultVueOptions({ ionic: true, weapp: true })

    expect(vueOptions.overrides['vue/no-deprecated-slot-attribute']).toBe('off')
    expect(vueOptions.overrides['vue/singleline-html-element-content-newline']).toMatchObject([
      'warn',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: expect.arrayContaining(['text']),
      },
    ])
  })

  it('merges nest specific typescript rules', () => {
    const typescriptOptions = getDefaultTypescriptOptions({ nestjs: true })

    expect(typescriptOptions.overrides['ts/explicit-function-return-type']).toBe('off')
    expect(typescriptOptions.overrides['ts/no-unused-vars']).toBeDefined()
  })
})

describe('resolveUserOptions', () => {
  it('expands boolean feature flags into config objects', () => {
    const resolved = resolveUserOptions({ vue: true, typescript: true })

    expect(isObject(resolved.vue)).toBe(true)
    expect(resolved.vue?.overrides?.['vue/no-useless-v-bind']).toBeDefined()
    expect(resolved.typescript?.overrides?.['ts/no-unused-vars']).toBeDefined()
    expect(resolved.formatters).toBe(true)
  })

  it('applies vue2 specific overrides when requested', () => {
    const resolved = resolveUserOptions({
      vue: {
        vueVersion: 2,
        overrides: {},
      },
    })

    expect(resolved.vue?.overrides?.['vue/no-v-for-template-key-on-child']).toBe('off')
    expect(resolved.vue?.overrides?.['vue/no-deprecated-v-bind-sync']).toBe('off')
  })

  it('merges custom typescript overrides with the defaults', () => {
    const resolved = resolveUserOptions({
      typescript: {
        overrides: {
          'ts/custom-rule': 'error',
        },
      },
    })

    expect(resolved.typescript?.overrides?.['ts/custom-rule']).toBe('error')
    expect(resolved.typescript?.overrides?.['ts/no-unused-expressions']).toBeDefined()
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

describe('isObject', () => {
  it('only treats plain objects as objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)
    expect(isObject(null)).toBe(false)
  })
})

describe('applyVueVersionSpecificRules', () => {
  it('skips processing when overrides are missing', () => {
    const option = { overrides: undefined } as any
    __applyVueVersionSpecificRules(option)
    expect(option.overrides).toBeUndefined()
  })
})
