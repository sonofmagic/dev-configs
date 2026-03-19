export interface BetterStylelintMessage {
  ruleId: string
  message: string
  line: number
  column: number
  endLine?: number
  endColumn?: number
  severity: 1 | 2
  fatal?: boolean
}

export interface BetterStylelintProcessor {
  meta?: {
    name?: string
    version?: string
  }
  preprocess: (text: string, filename: string) => string[]
  postprocess: (messages: unknown[][], filename: string) => BetterStylelintMessage[]
  supportsAutofix?: boolean
}

export interface BetterStylelintRuleOptions {
  cwd?: string
}
