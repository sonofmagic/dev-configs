import type {
  Awaitable,
  OptionsConfig,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import type { IcebreakerStylelintOptions } from '@icebreakers/stylelint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

export interface TailwindcssOption {
  /**
   * Tailwind CSS v4 entry point, e.g. `src/global.css`.
   */
  entryPoint?: string
  /**
   * Tailwind CSS v3 config file path, e.g. `tailwind.config.js`.
   */
  tailwindConfig?: string
}

export type TailwindcssConfig = boolean | TailwindcssOption
export interface StylelintBridgeOption extends IcebreakerStylelintOptions {
  cwd?: string
}
export type StylelintBridgeConfig = boolean | StylelintBridgeOption

export type UserDefinedOptions = OptionsConfig & TypedFlatConfigItem & {
  /**
   * Enable Mini Program support.
   * @default false
   */
  miniProgram?: boolean
  /**
   * Enable TailwindCSS support
   * @default false
   */
  tailwindcss?: TailwindcssConfig
  /**
   * Bridge Stylelint diagnostics into ESLint for style files.
   * @default false
   */
  stylelint?: StylelintBridgeConfig
  /**
   * Enable MDX support
   * @default false
   */
  mdx?: boolean
  /**
   * Enable A11y support
   * @default false
   */
  a11y?: boolean
  /**
   * Enable NestJS support
   * @default false
   */
  nestjs?: boolean
  /**
   * Enable TanStack Query support
   * @default false
   */
  query?: boolean
  /**
   * Enable Ionic support
   * @default false
   */
  ionic?: boolean
  /**
   * Enable Weapp support
   * @deprecated Use `miniProgram` instead.
   * @default false
   */
  weapp?: boolean
}

export type UserConfigItem = Awaitable<
  | TypedFlatConfigItem
  | TypedFlatConfigItem[]
  | FlatConfigComposer<any, any>
  | Linter.Config[]
>

export type {
  OptionsConfig,
  TypedFlatConfigItem,
}
