---
title: 自用 kitty 配置
description: 一些常用的 kitty 配置，以及快捷键
pubDate: "2025-10-07"
---

- 配置路径：`~/.config/kitty/kitty.conf`
- 重载配置：`Control+Shift+F5`

配置内容：

```plaintext
# vim:fileencoding=utf-8:foldmethod=marker

# BEGIN_KITTY_THEME
# Base2Tone Drawbridge Dark
include current-theme.conf
# END_KITTY_THEME

# font
font_size 15.0
font_family         Maple Mono NF CN
bold_font           Maple Mono NF CN Bold
italic_font         Maple Mono NF CN Italic
bold_italic_font    Maple Mono NF CN Bold Italic

# window
hide_window_decorations     titlebar-only
window_padding_width        0
background_opacity          0.8
background_blur             30
remember_window_size        yes

# tab bar
tab_bar_edge                top
tab_bar_style               powerline
tab_powerline_style         round
tab_bar_min_tabs            1

# general key mapping
macos_option_as_alt         yes

# vim key mapping
map cmd+s send_text all \e:w\r
map cmd+p send_text all :Telescope find_files\r
map cmd+shift+f send_text all :Telescope live_grep\r
map cmd+b send_text all :Neotree toggle\r

# map f4 launch --location=split
# map f5 launch --location=hsplit
# map f6 launch --location=vsplit
map f7 layout_action rotate

# Move the active window in the indicated direction
map shift+up move_window up
map shift+left move_window left
map shift+right move_window right
map shift+down move_window down

# 分割窗口（推荐映射）
# map ctrl+shift+- launch --location=hsplit --cwd=current
# map ctrl+shift+\ launch --location=vsplit --cwd=current

# ============ 窗口导航（Vim 风格）============
map ctrl+shift+h neighboring_window left
map ctrl+shift+l neighboring_window right
map ctrl+shift+k neighboring_window up
map ctrl+shift+j neighboring_window down

# ============ 布局管理 ============
# 使用 Cmd+Shift（macOS 常见组合）
map cmd+shift+l next_layout
map cmd+shift+z toggle_layout stack

# 快速跳转到特定布局（Option = Alt 在 Mac 上）
map opt+shift+1 goto_layout splits
map opt+shift+2 goto_layout stack
map opt+shift+3 goto_layout tall
map opt+shift+4 goto_layout grid

# ============ 窗口分割 ============
map ctrl+shift+minus launch --location=hsplit --cwd=current
map ctrl+shift+backslash launch --location=vsplit --cwd=current
map ctrl+shift+enter launch --cwd=current

# ============ 窗口大小调整 ============
map cmd+ctrl+h resize_window narrower
map cmd+ctrl+l resize_window wider
map cmd+ctrl+k resize_window taller
map cmd+ctrl+j resize_window shorter

cursor_trail 1
cursor_trail_decay 0.1 0.4

enabled_layouts tall,fat,grid,horizontal,vertical,stack

allow_remote_control yes
```
