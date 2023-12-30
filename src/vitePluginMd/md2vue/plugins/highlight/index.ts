// 代码高亮
import markdownIt from 'markdown-it'
import hljs from 'highlight.js'

export const highlight = (str: string, lang: string, md: markdownIt) => {
  if (lang === 'vue') {
    lang = 'html'
  }
  if (lang && hljs.getLanguage(lang)) {
    return (
      '<pre><code class="hljs">' +
      hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
      '</code></pre>'
    )
  }
  // md.utils.escapeHtml: 会转义这四个字符: & < > "
  return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>'
}
