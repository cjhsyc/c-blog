import markdownItAnchor from 'markdown-it-anchor'
import markdownIt from 'markdown-it'
import type { Anchor } from '@/types/anchor'
import { store } from '../../store'

/** 给h标签设置锚点，并生成锚点数据 */
export const anchor = (md: markdownIt) => {
  md.use(markdownItAnchor, {
    tabIndex: false,
    permalink: (slug, opts, state, idx) => {
      if (!store.anchorsObj[state.env.file]) {
        store.anchorsObj[state.env.file] = []
      }
      store.anchorsObj[state.env.file].push({
        tag: state.tokens[idx].tag as Anchor['tag'],
        slug,
        content: state.tokens[idx + 1].content
      })
    }
  })
}
