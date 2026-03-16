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

插件同时兼容 Tailwind CSS v3 和 v4：

- Tailwind CSS v3：使用内置的 v3 兼容运行时校验
- Tailwind CSS v4：使用 `@tailwindcss/node` 校验

运行时会自动解析当前项目安装的 `tailwindcss` 主版本，并选择对应的检测逻辑。

## 安装

```bash
pnpm add -D stylelint stylelint-plugin-no-tailwindcss tailwindcss
```

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
