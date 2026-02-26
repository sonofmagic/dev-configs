# @icebreakers/eslint-config

## 1.6.22

### Patch Changes

- 🐛 **deps: upgrade** [`64b1558`](https://github.com/sonofmagic/dev-configs/commit/64b15581c9294e97a97f76e606b6b146daee4949) by @sonofmagic

## 1.6.21

### Patch Changes

- 🐛 **deps: upgrade** [`3a9b9fe`](https://github.com/sonofmagic/dev-configs/commit/3a9b9fefcae6e9775ea3c87ad48d42a7fadf8727) by @sonofmagic

## 1.6.20

### Patch Changes

- 🐛 **upgrade** [`94a5a87`](https://github.com/sonofmagic/dev-configs/commit/94a5a87e3f0dc6876b0baa614aec1d71aacca2bb) by @sonofmagic

- 🐛 **Disable core `dot-notation` in the base preset to avoid conflicts with TypeScript `noPropertyAccessFromIndexSignature` (`ts(4111)`) when bracket notation is required for index-signature properties.** [`94a5a87`](https://github.com/sonofmagic/dev-configs/commit/94a5a87e3f0dc6876b0baa614aec1d71aacca2bb) by @sonofmagic

## 1.6.19

### Patch Changes

- 🐛 **deps: upgrade** [`05c6690`](https://github.com/sonofmagic/dev-configs/commit/05c6690ea607f1d3300ea524397f0626d31e9101) by @sonofmagic

## 1.6.18

### Patch Changes

- 🐛 **chore(deps): upgrade** [`2ab5b70`](https://github.com/sonofmagic/dev-configs/commit/2ab5b706fd41b17752ed8a013a242a70e6d97e39) by @sonofmagic

## 1.6.17

### Patch Changes

- 🐛 **chore(deps): upgrade** [`c3c641e`](https://github.com/sonofmagic/dev-configs/commit/c3c641e119faf2e0d0ffa64cd8610cf17eed9952) by @sonofmagic

## 1.6.16

### Patch Changes

- 🐛 **chore(deps): upgrade** [`bc9c23f`](https://github.com/sonofmagic/dev-configs/commit/bc9c23f87bde886a20c6b01c2d880fe6a4fde806) by @sonofmagic

## 1.6.15

### Patch Changes

- 🐛 **Update @antfu/eslint-config to 7.2.0.** [`227a310`](https://github.com/sonofmagic/dev-configs/commit/227a3100526300876c7c0b44810d04a69a4e2860) by @sonofmagic

## 1.6.14

### Patch Changes

- 🐛 **Improve eslint config option handling and unit coverage.** [`c0e39e3`](https://github.com/sonofmagic/dev-configs/commit/c0e39e3e5c813d7214fd106dabb4818f772a0bd4) by @sonofmagic
  - Harden stylelint preset resolution for ESM-only configs.

## 1.6.13

### Patch Changes

- 🐛 **chore(deps): upgrade** [`f1dabc9`](https://github.com/sonofmagic/dev-configs/commit/f1dabc9c29bb0decfb7e1ff4035ad9ad58ef590f) by @sonofmagic

## 1.6.12

### Patch Changes

- 🐛 **chore: upgrade** [`461103c`](https://github.com/sonofmagic/dev-configs/commit/461103ce0671ea6fdae12b065c218ae0a4d7e4e5) by @sonofmagic

## 1.6.11

### Patch Changes

- 🐛 **chore(deps): upgrade** [`271dc88`](https://github.com/sonofmagic/dev-configs/commit/271dc88cbb544070431d58397796b7daccef7dae) by @sonofmagic

## 1.6.10

### Patch Changes

- 🐛 **Fix deterministic preset resolution in pnpm monorepos** [`bb9cbce`](https://github.com/sonofmagic/dev-configs/commit/bb9cbce84c2980c7545c2dfcfe391be8a9f48299) by @sonofmagic
  - Resolve `eslint` + `@eslint/js` version drift when using pnpm workspaces
  - Ensure optional peers (ex: `@typescript-eslint/*`) fail softly when absent
  - Clarify flat-config layering: `languageOptions`, `plugins`, `rules`, `settings`
  - Document import surface: `@icebreakers/eslint-config` and `@icebreakers/eslint-config/preset`
  - See [preset docs](https://github.com/sonofmagic/dev-configs/tree/main/packages/eslint) for migration notes and examples

## 1.6.9

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`b10f8bd`](https://github.com/sonofmagic/dev-configs/commit/b10f8bd4d576295011e8e440b79da28b7b346d1d) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.8

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`f4f7a44`](https://github.com/sonofmagic/dev-configs/commit/f4f7a4442b346b030224a31fffc9a35708f1d9e0) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.7

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`65e9e74`](https://github.com/sonofmagic/dev-configs/commit/65e9e741315315c180e11ea51f9f2a6573d010ea) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.6

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`bf471f9`](https://github.com/sonofmagic/dev-configs/commit/bf471f9ba57e099567b3ad14c887881c7ced1ecc) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.5

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`a7cc796`](https://github.com/sonofmagic/dev-configs/commit/a7cc796869b27cd980585eaccc979081513a0f92) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.4

### Patch Changes

- 🐛 **Remove the opt-out for better-tailwindcss unregistered class checks and keep pnpm integration disabled by default.** — [`a870144`](https://github.com/sonofmagic/dev-configs/commit/a870144d5f141e55d85e4e7e546884459f58c387) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.3

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`97c2c01`](https://github.com/sonofmagic/dev-configs/commit/97c2c01f2c9d273097d180576a0b0c389a530aa7) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

- 🐛 **默认关闭 better-tailwindcss/no-unregistered-classes，并同步修正相关类型定义。** — [`6c6d6c1`](https://github.com/sonofmagic/dev-configs/commit/6c6d6c137eb131d87a6d5ed247b09db3f27cf04d) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.2

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`efd6a5b`](https://github.com/sonofmagic/dev-configs/commit/efd6a5b540f21ace0409fb602d37f6aa672aafa5) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.1

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`a24c546`](https://github.com/sonofmagic/dev-configs/commit/a24c546f6e01352b09fb5b219b7b867b22a96da3) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.0

### Minor Changes

- ✨ **Add a `query` option to turn on the TanStack Query flat preset only when requested.** — [`485de0e`](https://github.com/sonofmagic/dev-configs/commit/485de0e32d0ad03c99b4859521f8d3870a7f445f) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Minor release

## 1.5.10

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`baafc8c`](https://github.com/sonofmagic/dev-configs/commit/baafc8cacc4ece4070429eaa55dd7264d276205c) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.9

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`4ce36ce`](https://github.com/sonofmagic/dev-configs/commit/4ce36cec792ba317955087c32d95e338e4d7fe24) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.8

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`ec47a2f`](https://github.com/sonofmagic/dev-configs/commit/ec47a2f67c1e4dea4d71bb9e4f88e7e8036d390c) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.7

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`149b11e`](https://github.com/sonofmagic/dev-configs/commit/149b11ef108528be84e9afdd5695d53ab849c6ef) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.6

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`aa8958e`](https://github.com/sonofmagic/dev-configs/commit/aa8958eedaa80ab81ed6463e04f180b0df76fe82) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.5

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`31b9df5`](https://github.com/sonofmagic/dev-configs/commit/31b9df5f2a3d6189d81cc6442f5c01cd382d3a04) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.4

### Patch Changes

- 🐛 **Enhance the NestJS preset by inlining best-practice TypeScript relaxations (decorated empty constructors, DI parameter properties, ambient declaration merging) and expose dedicated documentation covering the improved workflow.** — [`296f575`](https://github.com/sonofmagic/dev-configs/commit/296f575a5c388baa7ab4287acff3763f77508e57) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.3

### Patch Changes

- 🐛 **docs: reflow package READMEs for better rendering** — [`44d4b37`](https://github.com/sonofmagic/dev-configs/commit/44d4b37a47e0a0c327fedce97d3d04ce36425a87) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

- 🐛 **chore(deps): upgrade** — [`d6e6a5b`](https://github.com/sonofmagic/dev-configs/commit/d6e6a5bd8c3fd0c593dfe3c16402c4e254ee979a) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.2

### Patch Changes

- [`4f717f5`](https://github.com/sonofmagic/dev-configs/commit/4f717f5353f11f72853936045fde8ae546a2b9ea) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: upgrade @antfu/eslint-config to 6.0.0

## 1.5.1

### Patch Changes

- [`d6f5d2c`](https://github.com/sonofmagic/dev-configs/commit/d6f5d2c167ea65577714ab1c5f45fa82a577efe3) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: "eslint-plugin-react-hooks": "^7.0.0"

## 1.5.0

### Minor Changes

- [`ce5ac2d`](https://github.com/sonofmagic/dev-configs/commit/ce5ac2d46badac3943aad225f02d32628c5d362b) Thanks [@sonofmagic](https://github.com/sonofmagic)! - - 重构选项解析为独立模块，确保 Vue/TypeScript 默认和 Tailwind、MDX、无障碍插件按需加载
  - 新增 `TailwindcssOption` 类型导出，明确 v3/v4 配置入口字段
  - 更新 README，说明如何组合可选预设并扩展 @antfu/eslint-config 配置

## 1.4.6

### Patch Changes

- [`5054a5f`](https://github.com/sonofmagic/dev-configs/commit/5054a5fddcffcfa2c3961bdefb5f0f68d4050077) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.4.5

### Patch Changes

- [`c201d06`](https://github.com/sonofmagic/dev-configs/commit/c201d06b9e4d001c083f71c7b3819b61219a106c) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.4.4

### Patch Changes

- [`ac3f818`](https://github.com/sonofmagic/dev-configs/commit/ac3f81863c89583556e25448dfe26fce68d6ccda) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.4.3

### Patch Changes

- [`5889f23`](https://github.com/sonofmagic/dev-configs/commit/5889f234adee6f2fa8365e2be65a7a1c0c659605) Thanks [@sonofmagic](https://github.com/sonofmagic)! - <br/>

  chore(deps): upgrade

## 1.4.2

### Patch Changes

- [`ff56985`](https://github.com/sonofmagic/dev-configs/commit/ff5698537710eb3faedbdf6902d47b50f8243cd0) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.4.1

### Patch Changes

- [`324a269`](https://github.com/sonofmagic/dev-configs/commit/324a269f66aba1a8c3a6243a8d77900792508ba8) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.4.0

### Minor Changes

- [`c4a1e7f`](https://github.com/sonofmagic/dev-configs/commit/c4a1e7f7511a16d76a507711adf040a41029d063) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: 添加 `eslint-plugin-better-tailwindcss` 支持

  chore: 重命名 `nest` 到 `nestjs`

## 1.3.6

### Patch Changes

- [`114949c`](https://github.com/sonofmagic/dev-configs/commit/114949c4212d3094dab363617b58cc755ff018d2) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: add vitest rules overrides

## 1.3.5

### Patch Changes

- [`fbe27c8`](https://github.com/sonofmagic/dev-configs/commit/fbe27c8389963d3e19637f6c606a0002c642d246) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.3.4

### Patch Changes

- [`a939a06`](https://github.com/sonofmagic/dev-configs/commit/a939a06c16c831fe56f1ebf46da6421e6ab56ba1) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.3.3

### Patch Changes

- [`8d77e2b`](https://github.com/sonofmagic/dev-configs/commit/8d77e2bb1f0b4fd9b8c608f668875e4e26726adf) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.3.2

### Patch Changes

- [`0bd9ead`](https://github.com/sonofmagic/dev-configs/commit/0bd9ead88b56c11b6dc5c20c7fd9e5fffb4c355d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.3.1

### Patch Changes

- [`79602a1`](https://github.com/sonofmagic/dev-configs/commit/79602a108d21f449e78756694ab1ab1df1b600c7) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.3.0

### Minor Changes

- [`0bd82f6`](https://github.com/sonofmagic/dev-configs/commit/0bd82f66524c0f7c3d4648ddd2fdf0d70261bbde) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: add nextjs support

## 1.2.5

### Patch Changes

- [`3a18a26`](https://github.com/sonofmagic/dev-configs/commit/3a18a2664504ea523f3ce1fae6534ee6efbfde6f) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.2.4

### Patch Changes

- [`cd0ef9d`](https://github.com/sonofmagic/dev-configs/commit/cd0ef9d8d51979c6c2a337af5e4877b5cddfa5f1) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.2.3

### Patch Changes

- [`ab2b2f8`](https://github.com/sonofmagic/dev-configs/commit/ab2b2f86c9abfcc739bdeff8d3545e1de9c9abdf) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: upgrade deps

## 1.2.2

### Patch Changes

- [`d3dbad4`](https://github.com/sonofmagic/dev-configs/commit/d3dbad46db6d3a2a8db252072917dda32aeeef8d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.2.1

### Patch Changes

- [`1dbd303`](https://github.com/sonofmagic/dev-configs/commit/1dbd3034a43b07ed2414aceab65147b85434d320) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: upgrade deps

## 1.2.0

### Minor Changes

- [`cd6f624`](https://github.com/sonofmagic/dev-configs/commit/cd6f624b3ab5c572b8147e8332cfd3786e5a74f2) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.1.8

### Patch Changes

- [`fb48f3b`](https://github.com/sonofmagic/dev-configs/commit/fb48f3bae625a2c9a4d1b76118302c51f46a732b) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: upgrade eslint config

## 1.1.7

### Patch Changes

- [`84e0907`](https://github.com/sonofmagic/dev-configs/commit/84e0907133d66e497e949276c0c8a65f998feaad) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.1.6

### Patch Changes

- [`258c044`](https://github.com/sonofmagic/dev-configs/commit/258c044cb226b15bf6ad075deeb8d5a01d90f812) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.1.5

### Patch Changes

- [`52d08d2`](https://github.com/sonofmagic/dev-configs/commit/52d08d24002a4930e24326805def1bcf1caeb042) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.1.4

### Patch Changes

- [`0db8f3a`](https://github.com/sonofmagic/dev-configs/commit/0db8f3a871ca7efb797ce6dfdf532aef41ff8776) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.1.1

### Patch Changes

- [`e92a75b`](https://github.com/sonofmagic/dev-configs/commit/e92a75ba7b292cf94c8c37f4816b3952788f0e0b) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.1.0

### Minor Changes

- [`302c8b5`](https://github.com/sonofmagic/dev-configs/commit/302c8b558649479c259fd0683b2f27f1eebb2d0d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.0.0

### Major Changes

- [`a3a085e`](https://github.com/sonofmagic/dev-configs/commit/a3a085e041267b66e6705d9f982bca213df90da4) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: upgrade to latset version

## 0.7.9

### Patch Changes

- [`739a357`](https://github.com/sonofmagic/dev-configs/commit/739a357bce0fce6180c5b6e976003493f50534a4) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 0.7.8

### Patch Changes

- [`2edf063`](https://github.com/sonofmagic/dev-configs/commit/2edf0638a76f589e72388ee28d6cc2d0c8c56815) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 0.7.7

### Patch Changes

- [`b3f296e`](https://github.com/sonofmagic/dev-configs/commit/b3f296e3a9c8f2ad7748a8c4dcc7be889bed10b5) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: upgrade deps

## 0.7.6

### Patch Changes

- [`d59c750`](https://github.com/sonofmagic/dev-configs/commit/d59c75001bef52bbf4cfa3c8f128ca91f2b1b67d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 0.7.2

### Patch Changes

- [`2e9b2fe`](https://github.com/sonofmagic/dev-configs/commit/2e9b2fe473de24520f4beee8a399df6676b2c444) Thanks [@sonofmagic](https://github.com/sonofmagic)! - fix: https://github.com/sonofmagic/monorepo-template/issues/110

## 0.7.1

### Patch Changes

- [`a744e70`](https://github.com/sonofmagic/dev-configs/commit/a744e7044258b261c0383fd41e0b9dcb9c50ffdb) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: add ionic and nest support

## 0.7.0

### Minor Changes

- [`084e7aa`](https://github.com/sonofmagic/dev-configs/commit/084e7aa46a05d1726506dec21d2186cc9f45bd2e) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: 移除部分依赖和 mdx / unocss 的直接支持

## 0.7.0-alpha.0

### Minor Changes

- [`084e7aa`](https://github.com/sonofmagic/dev-configs/commit/084e7aa46a05d1726506dec21d2186cc9f45bd2e) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: 移除部分依赖和 mdx / unocss 的直接支持

## 0.3.19

### Patch Changes

- [`5525e6a`](https://github.com/sonofmagic/dev-configs/commit/5525e6ae1740b31df78442370db6dce1d21af0a2) Thanks [@sonofmagic](https://github.com/sonofmagic)! - fix vue plugin rules and upgrade deps

## 0.3.18

### Patch Changes

- [`5ba0310`](https://github.com/sonofmagic/dev-configs/commit/5ba0310ee2f915b4721bfd0b43a18c21d9dd2ffa) Thanks [@sonofmagic](https://github.com/sonofmagic)! - upgrade typescript eslint plugin

## 0.3.17

### Patch Changes

- [`7a6a5c5`](https://github.com/sonofmagic/dev-configs/commit/7a6a5c564d5d7fec51161028bcd4b4130818b610) Thanks [@sonofmagic](https://github.com/sonofmagic)! - disabled `unused-imports/no-unused-vars` rule

## 0.3.16

### Patch Changes

- [`048dd98`](https://github.com/sonofmagic/dev-configs/commit/048dd98b66c2fc25cf9cdfa40803dc641c2f19da) Thanks [@sonofmagic](https://github.com/sonofmagic)! - add default vue rule

## 0.3.15

### Patch Changes

- [`18197ba`](https://github.com/sonofmagic/dev-configs/commit/18197baca36d096693efcbd1bd88b67a3a4ab290) Thanks [@sonofmagic](https://github.com/sonofmagic)! - Add `globals` as deps and upgrade `@types/eslint`

## 0.3.14

### Patch Changes

- [`6f68e91`](https://github.com/sonofmagic/dev-configs/commit/6f68e919b2c70e79cb4ab7fc90b3d137a01d010f) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: upgrade deps

## 0.3.13

### Patch Changes

- [`30dcbeb`](https://github.com/sonofmagic/dev-configs/commit/30dcbebf8e00e4ca70af250b3eeb1070ccb9d43d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 0.3.12

### Patch Changes

- [`fb7759c`](https://github.com/sonofmagic/dev-configs/commit/fb7759caa20658455ee8b40f0e0cde01d88d3168) Thanks [@sonofmagic](https://github.com/sonofmagic)! - fix: allow ts fn argsIgnorePattern

## 0.3.11

### Patch Changes

- [`aaccc60`](https://github.com/sonofmagic/dev-configs/commit/aaccc60d1fcb298daf04cea582a427c49c9402c1) Thanks [@sonofmagic](https://github.com/sonofmagic)! - 0.4.0
  - add `ally` support
  - fix ts enum error

## 0.3.10

### Patch Changes

- [`4ed5425`](https://github.com/sonofmagic/dev-configs/commit/4ed5425ec145e0f823747598331fc7343c416b4b) Thanks [@sonofmagic](https://github.com/sonofmagic)! - upgrade `@antfu/eslint-config` to `2.21.2`

## 0.3.3

### Patch Changes

- [`8a5a492`](https://github.com/sonofmagic/dev-configs/commit/8a5a4924152aa8bd7e4ea764cc3944603472237c) Thanks [@sonofmagic](https://github.com/sonofmagic)! - fix: eslint mdx plugin register error
