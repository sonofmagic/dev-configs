# stylelint-plugin-tailwindcss

面向 Tailwind CSS 与 utility-first 选择器约束的 Stylelint 插件。

## 概览

这个包专注解决一个问题：

> 手写样式里，是否应该允许声明 `.flex`、`.grid`、`.text-center`、`.hover\:bg-red-500` 这类原子类选择器？

它适合下面这些团队约束：

- utility class 只允许写在模板 / JSX / HTML 中
- 手写 CSS / SCSS / Vue `<style>` 更偏语义化类名
- 即使项目不用 Tailwind，而是用 UnoCSS 一类工具，也希望这条规则依然有价值

## 内置规则

- `tailwindcss/no-atomic-class`
- `tailwindcss/no-invalid-apply`
- `tailwindcss/no-apply`
- `tailwindcss/no-arbitrary-value`
- `unocss/no-atomic-class`
- `unocss/no-invalid-apply`
- `unocss/no-apply`
- `unocss/no-arbitrary-value`

## 会拦截什么

这个规则会拦截类似下面这些选择器：

- `.flex`
- `.grid`
- `.text-center`
- `.hover\:bg-red-500`
- `.w-\[10px\]`
- `.md\:flex`
- `.\!mt-4`

它不会拦截这类语义化选择器：

- `.page-shell`
- `.card__body`
- `.hero-banner--primary`

## 检测模式

插件支持三种模式：

- Tailwind CSS v3：从使用方项目解析并基于真实安装的 Tailwind 运行时做精确校验
- Tailwind CSS v4：从使用方项目解析并基于真实安装的 Tailwind 运行时做精确校验
- 没有安装 Tailwind：自动退化成启发式 utility-first 类名检测，对 UnoCSS 一类项目同样有用

也就是说，这个包能覆盖两类项目：

1. Tailwind 项目
   会从使用方项目解析真实安装的 `tailwindcss`，并按真实运行时做判断。

2. 没有安装 Tailwind 的 utility-first 项目
   不会因为缺少 `tailwindcss` 就失效，而是退化成常见原子类命名的启发式检测。

所以虽然包名是 `stylelint-plugin-tailwindcss`，它并不只对 Tailwind 项目有价值。

## 安装

```bash
pnpm add -D stylelint stylelint-plugin-tailwindcss
```

如果使用方项目本身装了 Tailwind，并且你希望得到精确判断，只需要照常在该项目里安装 `tailwindcss`。

## 用法

```ts
// stylelint.config.ts
import { recommended } from 'stylelint-plugin-tailwindcss'

export default recommended
```

现在 `recommended` 默认同时启用两套命名空间：

- `tailwindcss/*`
- `unocss/*`

最小基础配置：

```ts
import { base } from 'stylelint-plugin-tailwindcss'

export default base
```

`base` 默认启用：

- `tailwindcss/no-atomic-class`
- `tailwindcss/no-invalid-apply`
- `unocss/no-atomic-class`
- `unocss/no-invalid-apply`

只保留 Tailwind 规则：

```ts
import { tailwindRecommended } from 'stylelint-plugin-tailwindcss'

export default tailwindRecommended
```

只保留 UnoCSS 规则：

```ts
import { unocssRecommended } from 'stylelint-plugin-tailwindcss'

export default unocssRecommended
```

保留默认双开，但关闭整组 UnoCSS：

```ts
import { recommended } from 'stylelint-plugin-tailwindcss'

export default {
  ...recommended,
  rules: {
    ...recommended.rules,
    'unocss/no-atomic-class': false,
    'unocss/no-invalid-apply': false,
    'unocss/no-apply': false,
    'unocss/no-arbitrary-value': false,
  },
}
```

按单条规则逐个关闭：

```ts
import { recommended } from 'stylelint-plugin-tailwindcss'

export default {
  ...recommended,
  rules: {
    ...recommended.rules,
    'tailwindcss/no-apply': false,
    'unocss/no-arbitrary-value': false,
  },
}
```

推荐使用的规则名和插件导出：

```ts
import {
  noApplyPlugin,
  noApplyRuleName,
  noArbitraryValuePlugin,
  noArbitraryValueRuleName,
  noAtomicClassPlugin,
  noAtomicClassRuleName,
  noInvalidApplyPlugin,
  noInvalidApplyRuleName,
  tailwindBase,
  tailwindRecommended,
  unocssBase,
  unocssNoApplyPlugin,
  unocssNoApplyRuleName,
  unocssNoArbitraryValuePlugin,
  unocssNoArbitraryValueRuleName,
  unocssNoAtomicClassPlugin,
  unocssNoAtomicClassRuleName,
  unocssNoInvalidApplyPlugin,
  unocssNoInvalidApplyRuleName,
  unocssRecommended,
} from 'stylelint-plugin-tailwindcss'
```

- `tailwindcss/no-atomic-class`
  对应导出名为 `noAtomicClassRuleName`，匹配插件为 `noAtomicClassPlugin`。
- `tailwindcss/no-invalid-apply`
  检查 `@apply` 里那些“看起来像 utility、但在当前 Tailwind 运行时里并不存在”的 candidate。
- `tailwindcss/no-apply`
  只要出现 `@apply` 就报错。
- `tailwindcss/no-arbitrary-value`
  检查 Tailwind 风格的 arbitrary value / arbitrary property，例如 `w-[10px]`、`[mask-type:luminance]`。
- `unocss/no-atomic-class`
  对应导出名为 `unocssNoAtomicClassRuleName`，匹配插件为 `unocssNoAtomicClassPlugin`。
- `unocss/no-invalid-apply`
  对应导出名为 `unocssNoInvalidApplyRuleName`，匹配插件为 `unocssNoInvalidApplyPlugin`。
- `unocss/no-apply`
  对应导出名为 `unocssNoApplyRuleName`，匹配插件为 `unocssNoApplyPlugin`。
- `unocss/no-arbitrary-value`
  对应导出名为 `unocssNoArbitraryValueRuleName`，匹配插件为 `unocssNoArbitraryValuePlugin`。
  这个命名空间还会检查 UnoCSS 常见的裸值写法，例如 `w-10px`、`w-50%`、`top--10px`、`bg-$brand`、`text-rgb(255,0,0)`、`translate-x-50%`、`outline-#fff`、`[&>*]:w-10px`。

## 配合 `@icebreakers/stylelint-config`

如果你已经在用 `@icebreakers/stylelint-config`，这个插件默认已经启用，不需要再手动注册。

## 精确模式与启发式模式

当项目安装了 Tailwind：

- 判断更精确
- 会基于使用方项目真实安装的 Tailwind 版本运行
- v3 / v4 内部会走不同逻辑

当项目没有安装 Tailwind：

- 插件不会直接失效
- 会自动退化成 utility-first 启发式检测
- 精确度不如真实 Tailwind runtime，但对 UnoCSS 一类项目仍然足够有用

换句话说，这个插件的设计目标是“优雅降级”，而不是“缺少 Tailwind 就完全没用”。

## 支持的文件类型

凡是 Stylelint 能处理的样式文件，它都可以工作，包括：

- `.css`
- `.scss`
- Vue SFC 的 `<style>`
- Vue SFC 的 `<style lang="scss">`

## 演示

本仓库里有一套可以直接在 IDE 里看到效果的演示，目录在：

- [apps/mock/src/stylelint-demo](/Users/icebreaker/Documents/GitHub/eslint-config/apps/mock/src/stylelint-demo)

终端复现命令：

```bash
pnpm --dir apps/mock run lint:styles:demo
```

## 相关包

- `postcss-tailwindcss`
  这个插件会复用它来做 selector 收集和 Tailwind runtime 解析。
- `@icebreakers/stylelint-config`
  Monorepo 内默认启用了本插件。
