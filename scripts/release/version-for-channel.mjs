import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import process from 'node:process'
import { execa } from 'execa'

const preTag = process.env.CHANGESETS_PRE_TAG?.trim()
const preStatePath = '.changeset/pre.json'

async function readPreState() {
  if (!existsSync(preStatePath)) {
    return undefined
  }

  return JSON.parse(await readFile(preStatePath, 'utf8'))
}

async function ensurePreMode(tag) {
  const preState = await readPreState()

  if (!preState) {
    await execa('pnpm', ['changeset', 'pre', 'enter', tag], {
      stdio: 'inherit',
    })
    return
  }

  if (preState.mode === 'exit') {
    preState.mode = 'pre'
  }

  preState.tag = tag
  await writeFile(`${preStatePath}`, `${JSON.stringify(preState, null, 2)}\n`)
}

if (preTag) {
  await ensurePreMode(preTag)
}

await execa('pnpm', ['changeset', 'version'], {
  stdio: 'inherit',
})
