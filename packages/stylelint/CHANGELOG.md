# @icebreakers/stylelint-config

## 2.0.6

### Patch Changes

- 📦 **Dependencies**
  → `stylelint-plugin-tailwindcss@0.0.2`

## 2.0.5

### Patch Changes

- 🐛 **Migrate all packages under `packages/` to build with `tsdown`.** [`45c73ca`](https://github.com/sonofmagic/dev-configs/commit/45c73ca9f70ba813052c9970b54e08d853e638ce) by @sonofmagic
  - This removes the remaining `tsup` and `unbuild` package-level build configs,
  - switches package scripts to `tsdown`, and keeps the package outputs aligned with
  - the existing published entry points.

- 🐛 **Add a dedicated Stylelint plugin that blocks authored Tailwind utility selectors** [`7045cc1`](https://github.com/sonofmagic/dev-configs/commit/7045cc1742e8a9101fe2a567f96356482ce7b186) by @sonofmagic
  - and enable it by default in `@icebreakers/stylelint-config`.
  - The new plugin supports both Tailwind CSS v3 and v4 projects by detecting the
  - installed major version at runtime.
- 📦 **Dependencies** [`3847047`](https://github.com/sonofmagic/dev-configs/commit/38470476b5ceb034bd6661f653a8f9a889f660ea)
  → `stylelint-plugin-tailwindcss@0.0.1`

## 2.0.4

### Patch Changes

- 🐛 **Align the default `media-feature-range-notation` rule with Prettier and ESLint formatter output by using prefix media queries such as `max-width`.** [`42eeab4`](https://github.com/sonofmagic/dev-configs/commit/42eeab415269967e4f378d84d3ee2a4b2e3e23ac) by @sonofmagic
  - This avoids formatter conflicts in repositories that run both Stylelint fixes and CSS formatting through ESLint.

## 2.0.3

### Patch Changes

- 🐛 **bump package dependencies for changelog, commitlint, eslint, and stylelint configs.** [`0554cd5`](https://github.com/sonofmagic/dev-configs/commit/0554cd5b3dc3c02e965d579083e7df3f15399332) by @sonofmagic

## 2.0.2

### Patch Changes

- 🐛 **chore(deps): upgrade** [`2ab5b70`](https://github.com/sonofmagic/dev-configs/commit/2ab5b706fd41b17752ed8a013a242a70e6d97e39) by @sonofmagic

## 2.0.1

### Patch Changes

- 🐛 **Fix preset resolution for ESM-only stylelint configs.** [`4b67efc`](https://github.com/sonofmagic/dev-configs/commit/4b67efcc651371e2fd14024454d2478c09cfde0c) by @sonofmagic

## 2.0.0

### Major Changes

- 🚀 **Switch to ESM-only builds and remove CJS exports.** [`227a310`](https://github.com/sonofmagic/dev-configs/commit/227a3100526300876c7c0b44810d04a69a4e2860) by @sonofmagic

## 1.2.6

### Patch Changes

- 🐛 **Improve eslint config option handling and unit coverage.** [`c0e39e3`](https://github.com/sonofmagic/dev-configs/commit/c0e39e3e5c813d7214fd106dabb4818f772a0bd4) by @sonofmagic
  - Harden stylelint preset resolution for ESM-only configs.

## 1.2.5

### Patch Changes

- 🐛 **chore: upgrade** [`461103c`](https://github.com/sonofmagic/dev-configs/commit/461103ce0671ea6fdae12b065c218ae0a4d7e4e5) by @sonofmagic

## 1.2.4

### Patch Changes

- 🐛 **Allow BEM/OOCSS class naming by default via selector-class-pattern and document/test the behavior.** — [`65e9e74`](https://github.com/sonofmagic/dev-configs/commit/65e9e741315315c180e11ea51f9f2a6573d010ea) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

- 🐛 **chore(deps): upgrade** — [`65e9e74`](https://github.com/sonofmagic/dev-configs/commit/65e9e741315315c180e11ea51f9f2a6573d010ea) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.2.3

### Patch Changes

- 🐛 **Disable the `function-name-case` rule so function helpers with uppercase letters pass linting.** — [`149b11e`](https://github.com/sonofmagic/dev-configs/commit/149b11ef108528be84e9afdd5695d53ab849c6ef) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.2.2

### Patch Changes

- 🐛 **docs: reflow package READMEs for better rendering** — [`44d4b37`](https://github.com/sonofmagic/dev-configs/commit/44d4b37a47e0a0c327fedce97d3d04ce36425a87) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

- 🐛 **chore(deps): upgrade** — [`d6e6a5b`](https://github.com/sonofmagic/dev-configs/commit/d6e6a5bd8c3fd0c593dfe3c16402c4e254ee979a) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.2.1

### Patch Changes

- [`e9e9faf`](https://github.com/sonofmagic/dev-configs/commit/e9e9faf3c55e368d61330da5d1251758f9bb0f62) Thanks [@sonofmagic](https://github.com/sonofmagic)! - fix: use requireFromConfig.resolve to get config preset

## 1.2.0

### Minor Changes

- [`fe94f59`](https://github.com/sonofmagic/dev-configs/commit/fe94f591a991b38845c1122693ba9e88f610cce9) Thanks [@sonofmagic](https://github.com/sonofmagic)! - - 重构核心配置工厂，新增 `createStylelintConfig` 以支持开关预设、扩展忽略列表并保持 `icebreaker()` 向后兼容
  - 精简 VS Code 初始化逻辑，移除 `get-value`/`set-value` 依赖，保留原有设置输出
  - 更新包导出结构与 README 用法示例，覆盖 CLI、构建产物和文档说明

## 1.1.6

### Patch Changes

- [`5054a5f`](https://github.com/sonofmagic/dev-configs/commit/5054a5fddcffcfa2c3961bdefb5f0f68d4050077) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.1.5

### Patch Changes

- [`c201d06`](https://github.com/sonofmagic/dev-configs/commit/c201d06b9e4d001c083f71c7b3819b61219a106c) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.1.4

### Patch Changes

- [`ff56985`](https://github.com/sonofmagic/dev-configs/commit/ff5698537710eb3faedbdf6902d47b50f8243cd0) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.1.3

### Patch Changes

- [`324a269`](https://github.com/sonofmagic/dev-configs/commit/324a269f66aba1a8c3a6243a8d77900792508ba8) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.1.2

### Patch Changes

- [`a939a06`](https://github.com/sonofmagic/dev-configs/commit/a939a06c16c831fe56f1ebf46da6421e6ab56ba1) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.1.1

### Patch Changes

- [`d3dbad4`](https://github.com/sonofmagic/dev-configs/commit/d3dbad46db6d3a2a8db252072917dda32aeeef8d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.1.0

### Minor Changes

- [`cd6f624`](https://github.com/sonofmagic/dev-configs/commit/cd6f624b3ab5c572b8147e8332cfd3786e5a74f2) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.0.2

### Patch Changes

- [`84e0907`](https://github.com/sonofmagic/dev-configs/commit/84e0907133d66e497e949276c0c8a65f998feaad) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.0.1

### Patch Changes

- [`0db8f3a`](https://github.com/sonofmagic/dev-configs/commit/0db8f3a871ca7efb797ce6dfdf532aef41ff8776) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.0.0

### Major Changes

- [`a3a085e`](https://github.com/sonofmagic/dev-configs/commit/a3a085e041267b66e6705d9f982bca213df90da4) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: upgrade to latset version

## 0.1.3

### Patch Changes

- [`d59c750`](https://github.com/sonofmagic/dev-configs/commit/d59c75001bef52bbf4cfa3c8f128ca91f2b1b67d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade
