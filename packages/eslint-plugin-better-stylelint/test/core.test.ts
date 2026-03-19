import { createSyncFn } from 'synckit'
import {
  __clearStylelintResultCache,
  __getStylelintResultCacheSize,
  __resetStylelintWorker,
  runStylelintSync,
} from '@/core'

const runStylelintWorkerMock = vi.fn()

vi.mock('synckit', () => {
  return {
    createSyncFn: vi.fn(() => runStylelintWorkerMock),
  }
})

describe('runStylelintSync', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    runStylelintWorkerMock.mockReset()
    __clearStylelintResultCache()
    __resetStylelintWorker()
  })

  it('creates a synckit sync worker for the internal worker file', () => {
    runStylelintWorkerMock.mockReturnValue({
      ok: true,
      result: {
        warnings: [],
      },
    })

    runStylelintSync('.demo {}', '/tmp/demo.css', '/tmp')

    expect(createSyncFn).toHaveBeenCalledWith(expect.stringMatching(/worker\.(ts|js)$/u))
    expect(runStylelintWorkerMock).toHaveBeenCalledWith('.demo {}', '/tmp/demo.css', '/tmp')
  })

  it('maps stylelint warnings from the worker response', () => {
    runStylelintWorkerMock.mockReturnValue({
      ok: true,
      result: {
        warnings: [
          {
            rule: 'color-no-invalid-hex',
            severity: 'warning',
            text: 'Unexpected invalid hex color "#ggg"',
            line: 2,
            column: 4,
          },
        ],
      },
    })

    expect(runStylelintSync('.demo { color: #ggg; }', '/tmp/demo.css')).toEqual([
      {
        ruleId: 'color-no-invalid-hex',
        message: 'Unexpected invalid hex color "#ggg"',
        line: 2,
        column: 4,
        severity: 1,
      },
    ])
  })

  it('maps parse errors as fatal stylelint diagnostics', () => {
    runStylelintWorkerMock.mockReturnValue({
      ok: true,
      result: {
        parseErrors: [
          {
            text: 'Unclosed block',
            line: 3,
            column: 1,
          },
        ],
      },
    })

    expect(runStylelintSync('.demo {', '/tmp/demo.css')).toEqual([
      {
        ruleId: 'stylelint',
        message: 'Unclosed block',
        line: 3,
        column: 1,
        severity: 2,
        fatal: true,
      },
    ])
  })

  it('surfaces worker failures as bridge errors', () => {
    runStylelintWorkerMock.mockReturnValue({
      ok: false,
      error: 'Cannot resolve stylelint',
    })

    expect(runStylelintSync('.demo {}', '/tmp/demo.css')).toEqual([
      {
        ruleId: 'stylelint/bridge',
        message: 'Cannot resolve stylelint',
        line: 1,
        column: 1,
        severity: 2,
        fatal: true,
      },
    ])
  })

  it('reuses cached results for the same cwd, filename, and code', () => {
    runStylelintWorkerMock.mockReturnValue({
      ok: true,
      result: {
        warnings: [
          {
            rule: 'demo/rule',
            text: 'first result',
            line: 1,
            column: 1,
          },
        ],
      },
    })

    const first = runStylelintSync('.demo {}', '/tmp/demo.css', '/tmp')
    const second = runStylelintSync('.demo {}', '/tmp/demo.css', '/tmp')

    expect(first).toEqual(second)
    expect(first).not.toBe(second)
    expect(runStylelintWorkerMock).toHaveBeenCalledTimes(1)
  })

  it('misses the cache when the source changes', () => {
    runStylelintWorkerMock.mockReturnValue({
      ok: true,
      result: {
        warnings: [],
      },
    })

    runStylelintSync('.demo {}', '/tmp/demo.css', '/tmp')
    runStylelintSync('.demo { color: red; }', '/tmp/demo.css', '/tmp')

    expect(runStylelintWorkerMock).toHaveBeenCalledTimes(2)
  })

  it('evicts the least recently used cache entry when the cache is full', () => {
    runStylelintWorkerMock.mockReturnValue({
      ok: true,
      result: {
        warnings: [],
      },
    })

    for (let index = 0; index < 100; index += 1) {
      runStylelintSync(`.demo-${index} {}`, `/tmp/demo-${index}.css`, '/tmp')
    }

    expect(__getStylelintResultCacheSize()).toBe(100)
    expect(runStylelintWorkerMock).toHaveBeenCalledTimes(100)

    runStylelintSync('.demo-0 {}', '/tmp/demo-0.css', '/tmp')
    expect(runStylelintWorkerMock).toHaveBeenCalledTimes(100)

    runStylelintSync('.demo-100 {}', '/tmp/demo-100.css', '/tmp')
    expect(__getStylelintResultCacheSize()).toBe(100)
    expect(runStylelintWorkerMock).toHaveBeenCalledTimes(101)

    runStylelintSync('.demo-1 {}', '/tmp/demo-1.css', '/tmp')
    expect(runStylelintWorkerMock).toHaveBeenCalledTimes(102)
  })

  it('refreshes cache recency when an entry is read', () => {
    runStylelintWorkerMock.mockReturnValue({
      ok: true,
      result: {
        warnings: [],
      },
    })

    for (let index = 0; index < 100; index += 1) {
      runStylelintSync(`.demo-${index} {}`, `/tmp/demo-${index}.css`, '/tmp')
    }

    runStylelintSync('.demo-0 {}', '/tmp/demo-0.css', '/tmp')
    runStylelintSync('.demo-100 {}', '/tmp/demo-100.css', '/tmp')

    expect(runStylelintWorkerMock).toHaveBeenCalledTimes(101)

    runStylelintSync('.demo-0 {}', '/tmp/demo-0.css', '/tmp')
    expect(runStylelintWorkerMock).toHaveBeenCalledTimes(101)

    runStylelintSync('.demo-1 {}', '/tmp/demo-1.css', '/tmp')
    expect(runStylelintWorkerMock).toHaveBeenCalledTimes(102)
  })
})
