import markdownItContainer from 'markdown-it-container'
import type markdownIt from 'markdown-it'
import { store } from '../../store'

const regex = /^(success|info|warning|danger|error)(?:\s+)?(.*)?$/

export const container = (md: markdownIt) => {
  md.use(markdownItContainer, 'msgContainer', {
    validate(params: string) {
      return params.trim().match(regex)
    },
    render(tokens: any[], idx: number) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        const m = token.info.trim().match(regex)
        store.importStr.add(
          'import MsgContainer from "@/components/msgContainer/MsgContainer.vue"'
        )
        // 开始标签
        return `<MsgContainer type="${m[1]}" title="${m[2] ?? ''}">\n`
      } else {
        // 结束标签
        return '</MsgContainer>\n'
      }
    }
  })
}
