import process from 'node:process'
import { execa } from 'execa'

const npmTag = process.env.CHANGESETS_NPM_TAG?.trim() || 'latest'

await execa('pnpm', ['turbo', 'run', 'build', 'lint', 'test', 'test:types'], {
  stdio: 'inherit',
})

await execa('pnpm', ['changeset', 'version'], {
  stdio: 'inherit',
})

await execa('pnpm', ['changeset', 'publish', '--tag', npmTag], {
  stdio: 'inherit',
})
