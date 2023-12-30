// 自定义 超连接 的渲染
import markdownIt from 'markdown-it'
import { store } from '../../store'

export const link = (md: markdownIt) => {
  md.renderer.rules.link_open = (tokens, idx) => {
    const token = tokens[idx]
    const url = token.attrGet('href') || ''
    if (!store.importStrObj[store.currFile]) {
      store.importStrObj[store.currFile] = new Set()
    }
    store.importStrObj[store.currFile].add('import MdLink from "@/components/mdLink/MdLink.vue"')
    return `<md-link url="${url}">`
  }
  md.renderer.rules.link_close = () => {
    return '</md-link>'
  }
}
