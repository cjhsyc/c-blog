// 自定义 `xxx`（行内代码） 的渲染
import markdownIt from 'markdown-it'

export const codeInline = (md: markdownIt) => {
  md.renderer.rules.code_inline = (tokens, idx) => {
    const token = tokens[idx]
    const code = token.content
    return `<code class="code-inline">${md.utils.escapeHtml(code)}</code>`
  }
}
