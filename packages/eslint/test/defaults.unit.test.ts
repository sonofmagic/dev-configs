import { getDefaultTypescriptOptions, getDefaultVueOptions } from '@/defaults'

describe('getDefaultVueOptions', () => {
  it('includes the base vue overrides', () => {
    const vueOptions = getDefaultVueOptions()

    expect(vueOptions.overrides).toBeDefined()
    const vueOverrides = vueOptions.overrides!
    expect(vueOverrides['vue/no-useless-v-bind']).toBeDefined()
    expect(vueOverrides['vue/no-unused-refs']).toBe('warn')
  })

  it('adds ionic and weapp tweaks when enabled', () => {
    const vueOptions = getDefaultVueOptions({ ionic: true, weapp: true })

    expect(vueOptions.overrides).toBeDefined()

    const vueOverrides = vueOptions.overrides!
    expect(vueOverrides['vue/no-deprecated-slot-attribute']).toBe('off')
    expect(vueOverrides['vue/singleline-html-element-content-newline']).toMatchObject([
      'warn',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: expect.arrayContaining(['text', 'span']),
      },
    ])
  })

  it('keeps ionic and weapp overrides disabled by default', () => {
    const vueOptions = getDefaultVueOptions()

    expect(vueOptions.overrides).toBeDefined()
    const vueOverrides = vueOptions.overrides!
    expect(vueOverrides['vue/no-deprecated-slot-attribute']).toBeUndefined()
    expect(vueOverrides['vue/singleline-html-element-content-newline']).toBeUndefined()
  })
})

describe('getDefaultTypescriptOptions', () => {
  it('includes base typescript overrides', () => {
    const typescriptOptions = getDefaultTypescriptOptions()

    expect(typescriptOptions.overrides).toBeDefined()
    const typescriptOverrides = typescriptOptions.overrides!
    expect(typescriptOverrides['ts/no-unused-vars']).toBeDefined()
    expect(typescriptOverrides['ts/no-unused-expressions']).toBeDefined()
  })

  it('merges nest specific typescript rules', () => {
    const typescriptOptions = getDefaultTypescriptOptions({ nestjs: true })

    expect(typescriptOptions.overrides).toBeDefined()
    const typescriptOverrides = typescriptOptions.overrides!
    expect(typescriptOverrides['ts/explicit-function-return-type']).toBe('off')
    expect(typescriptOverrides['ts/no-unused-vars']).toBeDefined()
  })

  it('keeps nest rules disabled when nestjs is false', () => {
    const typescriptOptions = getDefaultTypescriptOptions()

    expect(typescriptOptions.overrides).toBeDefined()
    const typescriptOverrides = typescriptOptions.overrides!
    expect(typescriptOverrides['ts/explicit-function-return-type']).toBeUndefined()
  })
})
