import markdownItAnchor from 'markdown-it-anchor'
import type markdownIt from 'markdown-it'
import type { Anchor } from '@/types/anchor'
import { store } from '../../store'

/** 给h标签设置锚点，并生成锚点数据 */
export const anchor = (md: markdownIt) => {
  md.use(markdownItAnchor, {
    tabIndex: false,
    permalink: (slug, opts, state, idx) => {
      const token = state.tokens[idx]
      store.anchors.push({
        tag: token.tag as Anchor['tag'],
        slug,
        content: state.tokens[idx + 1].content
      })
      token.attrPush(['class', 'md-anchor'])
    }
  })
}
