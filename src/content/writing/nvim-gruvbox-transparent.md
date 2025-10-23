---
title: nvim 中主题为透明
description: nvim 中主题为透明
pubDate: "2025-10-07"
---

编辑: `~/.config/nvim/lua/plugins/colorscheme.lua`，添加如下配置：

```lua
return {
  -- add gruvbox
  {
    "ellisonleao/gruvbox.nvim",
    opts = {
      transparent_mode = true,
      styles = {
        sidebars = "transparent",
        float = "transparent",
      },
    },
  },

  -- add tokyonight
  {
    "folke/tokyonight.nvim",
    lazy = true,
    opts = {
      transparent = true,
      styles = {
        sidebars = "transparent",
        floats = "transparent",
      },
      style = "moon",
    },
  },

  -- set colorscheme
  {
    "LazyVim/LazyVim",
    opts = {
      -- colorscheme = "gruvbox",
      colorscheme = "tokyonight",
    },
  },
}
```
