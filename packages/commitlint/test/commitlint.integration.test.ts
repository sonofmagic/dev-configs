import lint from '@commitlint/lint'
import createPreset from 'conventional-changelog-conventionalcommits'
import { createIcebreakerCommitlintConfig } from '@/index'

type LintRules = Parameters<typeof lint>[1]
type CommitlintRules = ReturnType<typeof createIcebreakerCommitlintConfig>['rules']

async function lintMessage(
  message: string,
  rules: CommitlintRules,
) {
  const preset = await createPreset()
  return lint(message, rules as LintRules, {
    parserOpts: preset.parser,
  })
}

describe('commitlint integration', () => {
  it('validates default type enum rules', async () => {
    const config = createIcebreakerCommitlintConfig()

    const valid = await lintMessage('feat: add feature', config.rules)
    const invalid = await lintMessage('invalid: nope', config.rules)

    expect(valid.valid).toBe(true)
    expect(invalid.valid).toBe(false)
    expect(invalid.errors.some(error => error.name === 'type-enum')).toBe(true)
  })

  it('accepts added commit types', async () => {
    const config = createIcebreakerCommitlintConfig({
      types: {
        add: ['deps'],
        definitions: [
          {
            value: 'deps',
            title: 'Dependencies',
            description: 'Dependency updates',
            emoji: '📦',
          },
        ],
      },
    })

    const result = await lintMessage('deps: bump dependencies', config.rules)
    expect(result.valid).toBe(true)
  })

  it('enforces scope and header/subject constraints', async () => {
    const config = createIcebreakerCommitlintConfig({
      scopes: {
        values: ['core'],
        required: true,
        case: 'lower-case',
      },
      header: {
        maxLength: 10,
      },
      subject: {
        allowEmpty: false,
      },
    })

    const missingScope = await lintMessage('feat: short', config.rules)
    const wrongCase = await lintMessage('feat(Core): short', config.rules)
    const longHeader = await lintMessage('feat(core): 12345678901', config.rules)
    const emptySubject = await lintMessage('feat(core): ', config.rules)

    expect(missingScope.valid).toBe(false)
    expect(missingScope.errors.some(error => error.name === 'scope-empty'))
      .toBe(true)
    expect(wrongCase.errors.some(error => error.name === 'scope-case'))
      .toBe(true)
    expect(longHeader.errors.some(error => error.name === 'header-max-length'))
      .toBe(true)
    expect(emptySubject.errors.some(error => error.name === 'subject-empty'))
      .toBe(true)
  })
})
