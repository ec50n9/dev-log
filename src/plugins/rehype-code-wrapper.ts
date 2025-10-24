import { visit } from 'unist-util-visit'
import type { Root, Element } from 'hast'

export interface CodeWrapperOptions {
  codeCopyButtonTitle?: string
  languageLabel?: Record<string, string>
}

export function rehypeCodeWrapper(options: CodeWrapperOptions = {}) {
  const {
    codeCopyButtonTitle = 'Copy code',
    languageLabel = {}
  } = options

  const langLabel = Object.fromEntries(
    Object.entries(languageLabel).map(([k, v]) => [k.toLowerCase(), v])
  )

  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      // 查找 <pre> 标签中包含 <code> 的代码块
      if (
        node.tagName === 'pre' &&
        node.children[0]?.type === 'element' &&
        node.children[0].tagName === 'code'
      ) {
        // 提取语言信息
        let lang = node.properties.dataLanguage as string || 'plaintext'


        // 获取语言显示标签
        const label = langLabel[lang.toLowerCase()] || lang.replace(/_/g, ' ')

        // 创建包装器 div
        const wrapper: Element = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: `language-${lang} bg-gray-100`
          },
          children: [
            // 复制按钮
            {
              type: 'element',
              tagName: 'button',
              properties: {
                title: codeCopyButtonTitle,
                className: ['text-gray-500']
              },
              children: []
            },
            // 语言标签
            {
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['lang']
              },
              children: [{ type: 'text', value: label }]
            },
            // 原始的 pre 元素
            node
          ]
        }

        // 替换原始节点
        if (parent && typeof index === 'number') {
          parent.children[index] = wrapper
        }
      }
    })
  }
}

