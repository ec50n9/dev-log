---
title: "通过 CI/CD 实现配置文件的多语言翻译"
description: "使用 GitHub Actions 和 ChatGPT API 自动化处理多语言配置文件的翻译流程"
pubDate: '2024-02-19'
---

## 背景介绍

在开发国际化应用时，维护多语言配置文件往往是一项繁琐的工作。每次添加新的文本内容，都需要手动更新各个语言版本的配置文件。这不仅容易出错，还会占用大量开发时间。本文将介绍如何通过 CI/CD 流程来自动化这个过程。

## 技术方案概述

我们将使用以下技术栈来实现自动化翻译流程：

1. GitHub Actions 作为 CI/CD 平台
2. ChatGPT API 用于文本翻译
3. Node.js 脚本处理文件操作
4. YAML/JSON 作为配置文件格式

## 工作流程设计

整个自动化翻译流程如下：

1. 开发者更新中文配置文件（zh-CN.json）作为翻译基准
2. 提交代码到 GitHub 仓库
3. GitHub Actions 检测到配置文件变更
4. 触发翻译脚本，执行以下操作：
   - 对比基准文件与目标语言文件的差异
   - 仅翻译新增、修改的文本内容
   - 删除目标语言文件中已不存在的文本
5. 自动创建包含翻译更新的 Pull Request
6. 团队成员审查翻译内容并合并 PR

## 具体实现

### 1. GitHub Actions 工作流配置

```yaml
name: i18n-auto-translate
on:
  push:
    paths:
      - 'src/locales/zh-CN.json'
    branches:
      - main

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install

      - name: Run translation script
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: node scripts/translate.js

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: "chore: update translations"
          title: "🌐 Update translations"
          body: |
            自动更新多语言翻译文件

            - 基于最新的中文配置文件更新
            - 仅更新了变更的翻译内容
            - 请检查翻译质量
          branch: i18n/update-translations
          base: main
          labels: i18n,automated pr
          delete-branch: true
```

### 2. 翻译脚本实现

```javascript
const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 获取文件差异
function getConfigDiff(baseConfig, targetConfig) {
  const diff = {
    added: {},
    modified: {},
    deleted: []
  };

  // 检查新增和修改的键
  for (const [key, value] of Object.entries(baseConfig)) {
    if (!targetConfig[key]) {
      diff.added[key] = value;
    } else if (targetConfig[key] !== value) {
      diff.modified[key] = value;
    }
  }

  // 检查删除的键
  for (const key of Object.keys(targetConfig)) {
    if (!baseConfig[key]) {
      diff.deleted.push(key);
    }
  }

  return diff;
}

async function translateText(text, targetLang) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: `Translate the following text to ${targetLang}:\n${text}`
    }],
  });
  return completion.data.choices[0].message.content;
}

async function processTranslations() {
  // 读取中文基准配置文件
  const baseConfig = require('../src/locales/zh-CN.json');
  const supportedLangs = ['en', 'ja', 'ko'];
  
  for (const lang of supportedLangs) {
    let targetConfig = {};
    const targetPath = path.join(__dirname, `../src/locales/${lang}.json`);
    
    // 如果目标语言文件存在，则读取它
    if (fs.existsSync(targetPath)) {
      targetConfig = require(targetPath);
    }

    // 获取配置文件差异
    const diff = getConfigDiff(baseConfig, targetConfig);

    // 翻译新增和修改的内容
    for (const [key, value] of Object.entries({...diff.added, ...diff.modified})) {
      targetConfig[key] = await translateText(value, lang);
    }

    // 删除不再存在的键
    for (const key of diff.deleted) {
      delete targetConfig[key];
    }
    
    // 写入更新后的配置文件
    fs.writeFileSync(
      targetPath,
      JSON.stringify(targetConfig, null, 2)
    );
  }
}

processTranslations().catch(console.error);
```

## 优化建议

1. **增量翻译策略**
   - 仅翻译变更的内容
   - 保留已有的优质翻译
   - 显著降低 API 调用成本

2. **翻译缓存**
   - 建立翻译记忆库
   - 避免重复翻译相同内容

3. **质量控制**
   - 添加人工审核步骤
   - 设置关键词词典确保专业术语翻译准确

4. **版本控制**
   - 自动创建翻译更新提交
   - 清晰的提交信息
   - 方便追踪变更历史

## 注意事项

1. **API 密钥安全**
   - 使用 GitHub Secrets 存储敏感信息
   - 定期轮换 API 密钥

2. **错误处理**
   - 添加重试机制
   - 完善错误日志
   - 失败通知机制

3. **PR 管理**
   - 清晰的 PR 标题和描述
   - 添加合适的标签
   - 及时审查和合并
   - 必要时进行人工校对

## 总结

通过优化后的 CI/CD 自动化翻译流程，我们实现了：

1. 基于中文配置文件的翻译基准
2. 智能的增量翻译策略
3. 自动化的版本控制
4. 更低的维护成本

这种优化后的方案不仅提高了翻译效率，还大大降低了运营成本。通过增量翻译和自动提交机制，我们可以更好地管理多语言配置文件的更新，同时保证翻译质量和项目的可维护性。 