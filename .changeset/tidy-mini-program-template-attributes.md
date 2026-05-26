---
"@icebreakers/eslint-config": patch
---

Disable `vue/no-useless-template-attributes` when `miniProgram: true` is enabled so Mini Program compiler-only attributes on `<template #slot>` do not need local eslint comments.
