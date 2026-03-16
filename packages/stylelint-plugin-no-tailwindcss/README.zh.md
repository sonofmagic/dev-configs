# stylelint-plugin-no-tailwindcss

这个插件用于禁止在样式文件里声明 Tailwind 原子类选择器。

## 作用

它会拦截这类选择器声明：

- `.flex`
- `.mt-4`
- `.hover\:bg-red-500`
- `.w-\[10px\]`

适合下面这类约束场景：

- Tailwind utility 只能写在模板 / JSX / HTML 中
- 手写样式必须使用语义化类名
- 避免团队重复声明框架自带的原子类

## 兼容性

插件支持三种模式：

- Tailwind CSS v3：从使用方项目解析并基于真实安装的 Tailwind 运行时做精确校验
- Tailwind CSS v4：从使用方项目解析并基于真实安装的 Tailwind 运行时做精确校验
- 没有安装 Tailwind：自动退化成启发式 utility-first 类名检测，对 UnoCSS 一类项目同样有用

运行时会自动解析当前项目安装的 `tailwindcss` 主版本，并选择对应的检测逻辑。如果当前项目解析不到 Tailwind 安装，不会直接报错，而是退化成常见原子类命名的启发式检测。

## 安装

```bash
pnpm add -D stylelint stylelint-plugin-no-tailwindcss
```

如果使用方项目本身装了 Tailwind，并且你希望得到“是否真的是 Tailwind utility”的精确判断，只需要照常在该项目里安装 `tailwindcss`。这个依赖现在是可选 peer。

## 用法

```ts
// stylelint.config.ts
import noTailwindcssPlugin, { ruleName } from 'stylelint-plugin-no-tailwindcss'

export default {
  plugins: [noTailwindcssPlugin],
  rules: {
    [ruleName]: true,
  },
}
```

导出的规则名是：

```txt
no-tailwindcss/no-atomic-class
```

## 配合 `@icebreakers/stylelint-config`

如果你已经在用 `@icebreakers/stylelint-config`，这个插件默认已经启用，不需要再重复配置。
