// 代码高亮
import type markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { store } from '../../store'

export const highlight = (str: string, lang: string, md: markdownIt) => {
  store.importStr.add('import CodeBlock from "@/components/codeBlock/CodeBlock.vue"')
  if (lang === 'vue') {
    lang = 'html'
  }
  if (lang && hljs.getLanguage(lang)) {
    return (
      '<CodeBlock>' +
      hljs.highlight(str, { language: lang, ignoreIllegals: true }).value.replace(/{/g, '&#123;').replace(/}/g, '&#125;') +
      '</CodeBlock>'
    )
  }
  // md.utils.escapeHtml: 会转义这四个字符: & < > "
  return '<CodeBlock>' + md.utils.escapeHtml(str).replace(/{/g, '&#123;').replace(/}/g, '&#125;') + '</CodeBlock>'
}
