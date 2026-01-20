let exists = false
let readValue = '{}'

const mkdirSync = vi.fn()
const existsSync = vi.fn(() => exists)
const readFileSync = vi.fn(() => readValue)
const writeFileSync = vi.fn()

const parse = vi.fn(() => ({}))
const stringify = vi.fn(() => '{"ok":true}')

vi.mock('node:fs', () => {
  return {
    default: {
      mkdirSync,
      existsSync,
      readFileSync,
      writeFileSync,
    },
    mkdirSync,
    existsSync,
    readFileSync,
    writeFileSync,
  }
})

vi.mock('node:process', () => {
  return {
    default: {
      cwd: () => '/repo',
    },
  }
})

vi.mock('comment-json', () => {
  return {
    default: {
      parse,
      stringify,
    },
  }
})

describe('cli', () => {
  const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})

  afterEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('initializes settings when the file is missing', async () => {
    exists = false
    readValue = '{}'
    parse.mockReturnValueOnce({})

    await import('@/cli')

    expect(mkdirSync).toHaveBeenCalledWith('/repo/.vscode', { recursive: true })
    expect(existsSync).toHaveBeenCalledWith('/repo/.vscode/settings.json')
    expect(readFileSync).not.toHaveBeenCalled()
    expect(stringify).toHaveBeenCalled()
    expect(writeFileSync).toHaveBeenCalledWith('/repo/.vscode/settings.json', '{"ok":true}', 'utf8')
    expect(infoSpy).toHaveBeenCalledWith(expect.stringContaining('init'))

    const [writtenConfig] = stringify.mock.calls[0]
    expect(writtenConfig['stylelint.validate']).toEqual(expect.arrayContaining(['vue', 'css', 'scss']))
  })

  it('updates settings when the file exists', async () => {
    exists = true
    readValue = '{"stylelint.validate":["scss"]}'
    parse.mockReturnValueOnce({
      'stylelint.validate': ['scss'],
    })

    await import('@/cli')

    expect(readFileSync).toHaveBeenCalledWith('/repo/.vscode/settings.json', 'utf8')
    expect(parse).toHaveBeenCalledWith(readValue)
    expect(infoSpy).toHaveBeenCalledWith(expect.stringContaining('update'))
  })

  it('handles falsy parsed config values', async () => {
    exists = true
    readValue = 'null'
    parse.mockReturnValueOnce(null)

    await import('@/cli')

    const [writtenConfig] = stringify.mock.calls[0]
    expect(writtenConfig['stylelint.validate']).toEqual(expect.arrayContaining(['vue', 'css', 'scss']))
  })
})
