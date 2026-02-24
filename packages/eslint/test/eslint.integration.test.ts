import type { Linter } from 'eslint'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { ESLint } from 'eslint'
import { icebreaker } from '@/index'

const ROOT_DIR = path.resolve(__dirname, '..')
const INPUT_ROOT = path.join(ROOT_DIR, 'fixtures', 'input')
const OUTPUT_ROOT = path.join(ROOT_DIR, 'fixtures', 'output')
const TEMP_ROOT = path.join(os.tmpdir(), 'icebreaker-eslint')

const CASES = [
  'all',
  'with-formatters',
  'no-markdown-with-formatters',
  'no-style',
  'tab-double-quotes',
] as const

const CASE_CONFIGS: Record<
  typeof CASES[number],
  { options: Record<string, unknown>, extra?: Array<Record<string, unknown>> }
> = {
  'all': {
    options: {
      typescript: true,
      vue: true,
      svelte: true,
      astro: true,
    },
  },
  'with-formatters': {
    options: {
      typescript: true,
      vue: true,
      astro: true,
      formatters: true,
    },
  },
  'no-markdown-with-formatters': {
    options: {
      jsx: false,
      vue: false,
      markdown: false,
      formatters: {
        markdown: true,
      },
    },
  },
  'no-style': {
    options: {
      typescript: true,
      vue: true,
      stylistic: false,
    },
  },
  'tab-double-quotes': {
    options: {
      typescript: true,
      vue: true,
      stylistic: {
        indent: 'tab',
        quotes: 'double',
      },
    },
    extra: [
      {
        rules: {
          'style/no-mixed-spaces-and-tabs': 'off',
        },
      },
    ],
  },
}

async function listFiles(dir: string, base = dir): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath, base))
      continue
    }
    files.push(path.relative(base, fullPath))
  }
  return files
}

const BASE_EXTENSIONS = [
  'js',
  'jsx',
  'ts',
  'tsx',
  'vue',
  'md',
  'html',
  'xml',
  'css',
  'toml',
]

async function resolveCaseContext(caseName: typeof CASES[number]) {
  const config = CASE_CONFIGS[caseName]
  const options = JSON.parse(JSON.stringify(config.options)) as Record<string, unknown>

  const hasAstro = await moduleAvailable('eslint-plugin-astro')
  const hasSvelte = await moduleAvailable('eslint-plugin-svelte')

  if (!hasAstro && options['astro']) {
    options['astro'] = false
  }
  if (!hasSvelte && options['svelte']) {
    options['svelte'] = false
  }

  const extensions = [...BASE_EXTENSIONS]
  if (options['astro']) {
    extensions.push('astro')
  }
  if (options['svelte']) {
    extensions.push('svelte')
  }

  const ignoreExtensions: string[] = []
  if (!options['astro']) {
    ignoreExtensions.push('.astro')
  }
  if (!options['svelte']) {
    ignoreExtensions.push('.svelte')
  }

  const composer = icebreaker(options, ...(config.extra ?? []))
  const configs = await composer.toConfigs()

  return {
    configs: stripUnsupportedRules(configs),
    extensions,
    ignoreExtensions,
  }
}

async function prepareFixture(caseName: typeof CASES[number]): Promise<string> {
  const dest = path.join(TEMP_ROOT, `${caseName}-${crypto.randomUUID()}`)
  await fs.rm(dest, { recursive: true, force: true })
  await fs.mkdir(dest, { recursive: true })
  await fs.cp(INPUT_ROOT, dest, { recursive: true })
  return dest
}

async function compareOutputs(
  caseName: string,
  actualRoot: string,
  options: { ignoreExtensions?: string[] } = {},
) {
  const expectedRoot = path.join(OUTPUT_ROOT, caseName)
  const expectedFiles = (await listFiles(expectedRoot))
    .filter((file) => {
      if (!options.ignoreExtensions || options.ignoreExtensions.length === 0) {
        return true
      }
      return !options.ignoreExtensions.some(ext => file.endsWith(ext))
    })
  expect(expectedFiles.length).toBeGreaterThan(0)

  await Promise.all(expectedFiles.map(async (relativePath) => {
    const expected = await fs.readFile(
      path.join(expectedRoot, relativePath),
      'utf8',
    )
    const actual = await fs.readFile(
      path.join(actualRoot, relativePath),
      'utf8',
    )
    expect(actual).toBe(expected)
  }))
}

describe('eslint integration fixtures', () => {
  it.each(CASES)('formats %s fixtures with expected output', async (caseName) => {
    const tempDir = await prepareFixture(caseName)
    const { configs, extensions, ignoreExtensions } = await resolveCaseContext(caseName)

    const eslint = new ESLint({
      cwd: tempDir,
      fix: true,
      overrideConfig: configs,
      overrideConfigFile: true,
    })

    const results = await eslint.lintFiles([
      `**/*.{${extensions.join(',')}}`,
    ])
    await ESLint.outputFixes(results)

    await compareOutputs(caseName, tempDir, { ignoreExtensions })
  })
})

function stripUnsupportedRules(configs: Linter.Config[]): Linter.Config[] {
  return configs.map((config) => {
    if (!config.rules) {
      return config
    }
    if (!Object.prototype.hasOwnProperty.call(config.rules, 'ts/ban-types')) {
      return config
    }
    const { 'ts/ban-types': _banTypes, ...rest } = config.rules
    return {
      ...config,
      ...(Object.keys(rest).length > 0 ? { rules: rest } : {}),
    }
  })
}

const moduleAvailability = new Map<string, Promise<boolean>>()

async function moduleAvailable(name: string) {
  const cached = moduleAvailability.get(name)
  if (cached) {
    return cached
  }
  const result = (async () => {
    try {
      await import(name)
      return true
    }
    catch {
      return false
    }
  })()
  moduleAvailability.set(name, result)
  return result
}
