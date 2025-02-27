---
title: "Vercel 与 Cloudflare 对比"
description: "Vercel与Cloudflare部署平台对比：功能、成本与可访问性分析"
pubDate: '2025-02-19'
---

## 初次尝试：Vercel 的挑战

前两天找好模板后修改了个人信息，本打算部署到 Vercel。作为一个经常使用 Vercel 的开发者，我认为这会是一个简单的过程。然而，事实证明并非如此 - 部署过程一直失败。

## 突破：重新思考方案

今天，怀着记录的冲动，我决定彻底解决这个问题。这一次，我采取了更系统的方法：

1. 首先在 Google 上搜索 "astro vercel deploy"
2. 查阅 Astro 官方文档，发现需要安装 `@astrojs/vercel` 并配置 adapter
3. 准备安装时，意外发现 `astro.config.mjs` 中已经配置了 Cloudflare adapter

这个发现让我意识到原作者选择了 Cloudflare 作为部署平台，难怪我在 Vercel 上遇到了问题。

## Vercel vs Cloudflare：深入对比

带着好奇心，我研究了这两个平台的区别：

1. **服务集成**
   - Vercel：提供丰富且易用的数据服务集成
   - Cloudflare：服务集成相对有限，配置较复杂

2. **团队协作**
   - Vercel：功能完善但收费较高
   - Cloudflare：团队权限管理功能较弱

3. **成本考虑**
   - Cloudflare 提供更高的免费额度
   
4. **中国大陆访问**
   - Cloudflare：域名未被屏蔽
   - Vercel：需要绑定自定义域名才能访问

## 最终选择

考虑到：
- 原模板作者的选择
- Cloudflare 的优势
- 避免不必要的迁移工作

我决定遵循原作者的方案，直接使用 Cloudflare。注册账号后，顺利完成了部署。

## 经验总结

1. 在开始项目前，仔细查看项目配置
2. 选择部署平台时，考虑多个因素：
   - 技术兼容性
   - 访问性能
   - 成本效益
   - 目标用户群的访问便利性

3. 有时候，最好的解决方案就是遵循项目原有的技术选择

以上。
