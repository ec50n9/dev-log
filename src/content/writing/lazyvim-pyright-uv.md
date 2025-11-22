---
title: LazyVim 中 Pyright 无法识别 uv 虚拟环境
description: 解决 LazyVim 编辑 Python 时 Pyright 找不到 typer 的问题
pubDate: "2025-11-21"
---

## 问题

在 LazyVim 中编辑 `.py` 文件时，`import typer` 始终报 “cannot resolve typer”。通过 `uv` 已经安装依赖，项目运行正常，但编辑器的类型检查器依旧报错。

## 根因

Pyright 并不知道你的虚拟环境位置。即便 `uv` 已安装模块，LSP 仍需要明确的 Python 解释器路径或虚拟环境配置。

## 解决方法

### 方法 1：选择 Python 解释器（推荐）

在 LazyVim 中按 `<leader>cv`，或运行：

```vim
:lua vim.lsp.buf.execute_command({ command = 'python.setInterpreter' })
```

选择 `uv` 生成的虚拟环境后，Pyright 会立即指向正确的解释器。

### 方法 2：创建 `pyrightconfig.json`

在项目根目录新建：

```json
{
  "venvPath": ".",
  "venv": ".venv"
}
```

若 `uv` 使用默认 3.11，可写：

```json
{
  "venvPath": ".",
  "venv": ".venv",
  "pythonVersion": "3.11"
}
```

### 方法 3：使用 `pyproject.toml`

```toml
[tool.pyright]
venvPath = "."
venv = ".venv"
```

### 方法 4：重启 LSP

当配置已就绪但诊断仍旧，执行：

```vim
:LspRestart
```

## 检查虚拟环境路径

确认 `uv` 的虚拟环境位置：

```bash
uv venv --help  # 查看默认位置
which python    # 激活虚拟环境后运行
```

通常 `uv` 会在项目根目录创建 `.venv`。

## 验证配置

执行：

```vim
:LspInfo
```

检查 Pyright 的 `root directory` 与 `Python path` 是否指向 `.venv/bin/python`。最简单的方式仍是使用 **方法 1** 的 `<leader>cv` 快捷键直接选择解释器。
