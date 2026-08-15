import type { MonorepoConfig } from 'repoctl'

export default {
  commands: {
    create: {
      defaultTemplate: 'unbuild',
      renameJson: false,
    },
    clean: {
      autoConfirm: false,
      includePrivate: true,
    },
    upgrade: {
      skipOverwrite: false,
      mergeTargets: true,
    },
  },
} satisfies MonorepoConfig
