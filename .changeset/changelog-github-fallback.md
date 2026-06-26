---
"@icebreakers/changelog-github": patch
---

修复 GitHub 元数据请求偶发失败时中断 changeset version 的问题，失败时会保留基础提交链接并继续生成 changelog。
