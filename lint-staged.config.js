function shellQuote(file) {
  return `'${file.replaceAll(`'`, `'\\''`)}'`
}

function isStylelintDemoFile(file) {
  return file.includes('/apps/mock/src/stylelint-demo/')
    || file.startsWith('apps/mock/src/stylelint-demo/')
}

function isGeneratedFixtureOutput(file) {
  return file.includes('/packages/eslint/fixtures/output/')
    || file.startsWith('packages/eslint/fixtures/output/')
}

function createStylelintCommand(files) {
  const filteredFiles = files.filter(file => !isStylelintDemoFile(file) && !isGeneratedFixtureOutput(file))

  if (filteredFiles.length === 0) {
    return []
  }

  return [`stylelint --fix --allow-empty-input ${filteredFiles.map(shellQuote).join(' ')}`]
}

export {
  createStylelintCommand,
  isGeneratedFixtureOutput,
  isStylelintDemoFile,
}

export default {
  '*.{js,jsx,mjs,ts,tsx,mts}': [
    'eslint --fix',
  ],
  '*.vue': [
    'eslint --fix',
    createStylelintCommand,
  ],
  '*.{json,md,mdx,html,yml,yaml}': [
    // 'prettier --with-node-modules --ignore-path .prettierignore --write',
    'eslint --fix',
  ],
  '*.{css,scss,sass,less}': createStylelintCommand,
  // for rust
  // '*.rs': ['cargo fmt --'],
}
