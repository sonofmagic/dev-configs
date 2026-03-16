# stylelint-plugin-tailwindcss

面向 Tailwind CSS 与 utility-first 选择器约束的 Stylelint 插件。

## 内置规则

- `tailwindcss/no-atomic-class`

## 行为

插件支持三种模式：

- Tailwind CSS v3：从使用方项目解析并基于真实安装的 Tailwind 运行时做精确校验
- Tailwind CSS v4：从使用方项目解析并基于真实安装的 Tailwind 运行时做精确校验
- 没有安装 Tailwind：自动退化成启发式 utility-first 类名检测，对 UnoCSS 一类项目同样有用

## 安装

```bash
pnpm add -D stylelint stylelint-plugin-tailwindcss
```

如果使用方项目本身装了 Tailwind，并且你希望得到精确判断，只需要照常在该项目里安装 `tailwindcss`。

## 用法

```ts
import tailwindcssPlugin, { ruleName } from 'stylelint-plugin-tailwindcss'

export default {
  plugins: [tailwindcssPlugin],
  rules: {
    [ruleName]: true,
  },
}
```
