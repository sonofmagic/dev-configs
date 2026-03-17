# @icebreakers/stylelint-config

## 概览

`@icebreakers/stylelint-config` 为 Vue + SCSS 技术栈提供开箱即用的 Stylelint 预设，并附带一个 CLI，可快速生成编辑器配置。它在上游推荐规则的基础上，补充了常用的单位白名单、UnoCSS / Tailwind 指令忽略项，以及默认启用的 Tailwind 原子类声明拦截规则，同时保留对预设开关和自定义规则的控制能力。

## 环境要求

- Node.js 18+
- Stylelint 16（支持 Flat Config）

## 安装

```bash
pnpm add -D stylelint @icebreakers/stylelint-config
```

全新项目可以直接运行 CLI 初始化 VS Code 设置：

```bash
npx @icebreakers/stylelint-config
```

该命令会创建或更新 `.vscode/settings.json`，为 VS Code 添加 `stylelint.validate` 条目，确保代码诊断来自 Stylelint 而非内置 CSS 校验器。同时它会把 `css`、`less`、`scss`、`pcss`、`postcss` 从 `eslint.validate` 中移除，避免 ESLint 与 Stylelint 在保存时同时改同一个样式文件。

## 基本用法

```ts
// stylelint.config.ts
import { icebreaker } from '@icebreakers/stylelint-config'

export default icebreaker()
```

`icebreaker()` 会返回默认预设，并与传入的额外 Stylelint 配置合并。

## 进阶配置

若需细粒度控制预设、忽略列表或规则，可使用 `createStylelintConfig`：

```ts
import { createStylelintConfig } from '@icebreakers/stylelint-config'

export default createStylelintConfig({
  presets: {
    vue: false, // 纯 SCSS 项目无需 Vue 规则
  },
  ignores: {
    units: ['upx'], // 覆盖默认单位白名单
    addAtRules: ['tailwind'],
  },
  extends: [
    '@acme/stylelint-config',
  ],
  overrides: [
    {
      files: ['**/*.html'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'color-hex-length': 'long',
  },
})
```

### 配置说明

- `presets.scss`：是否包含 `stylelint-config-standard-scss`，默认开启
- `presets.vue`：是否包含 `stylelint-config-recommended-vue/scss`，默认开启
- `presets.order`：是否包含 `stylelint-config-recess-order`，默认开启
- `ignores.*`：替换默认的忽略列表（单位、选择器类型、指令）
- `ignores.add*`：在默认忽略列表基础上追加项
- `extends`：在预设之后追加自定义 Stylelint 配置
- `overrides`：声明文件级别的覆盖（如指定 `customSyntax`）
- `rules`：合并额外 Stylelint 规则

默认行为包括：

- 允许 BEM / OOCSS 风格的类名（如 `block__element--modifier`、`object--state`）
- 允许 `rpx` 单位，兼容小程序
- 忽略 Tailwind / UnoCSS 常见指令（如 `apply`、`screen`）
- 禁止在手写样式中声明 `.flex`、`.hover\:bg-red-500` 这类 Tailwind 原子类选择器
- 忽略多端平台常见的 `page` 选择器

## Tailwind 原子类拦截

该预设默认启用了 `stylelint-plugin-tailwindcss`，对应规则为：

```txt
tailwindcss/no-atomic-class
tailwindcss/no-invalid-apply
tailwindcss/no-apply
tailwindcss/no-arbitrary-value
```

这些规则会：

- 拦截在样式文件中直接声明 Tailwind utility selector，但不会影响正常的语义化类名，例如 BEM / OOCSS 风格命名
- 拦截无效的 `@apply` utility candidate
- 直接禁止 `@apply`
- 拦截 `w-[10px]`、`[mask-type:luminance]` 这类 arbitrary value / arbitrary property

底层插件同时兼容 Tailwind CSS v3 和 v4，会根据使用方项目实际安装的 `tailwindcss` 主版本自动切换检测逻辑。

## 推荐脚本

- `pnpm --filter @icebreakers/stylelint-config build` 构建 `dist/` 产物。
- 在应用内新增 `lint:styles` 脚本，例如 `stylelint "src/**/*.{css,scss,vue}" --fix`。

## 常见问题

- Tailwind 指令需要在 `postcss.config.*` 中配合忽略列表，否则可能误报，可通过 `ignores.addAtRules` 添加新指令。
- 如果 Stylelint 无法解析预设，请确认包已安装在当前 workspace 的 `devDependencies` 中，或已正确 hoist。
- 建议使用 CLI 生成的 VS Code 设置，避免内置 CSS 校验、ESLint 与 Stylelint 对样式文件重复报错或冲突修复。
