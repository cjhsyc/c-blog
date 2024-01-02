import type markdownIt from 'markdown-it'
import { store } from '../../store'

const routeRegex = /^\s*<route[\s\S]*?<\/route>\s*$/
const styleRegex = /^\s*<style[\s\S]*?<\/style>\s*$/
const scriptSetupRegex = /^\s*<script\s(.*\s)?setup(\s.*)?>([\s\S]*?)<\/script>\s*$/
/** 注释 */
const annotationRegex = /^\s*<!--[\s\S]*?-->\s*$/

export const htmlBlock = (md: markdownIt) => {
  const defaultRender =
    md.renderer.rules.html_block ||
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))
  md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (annotationRegex.test(token.content)) {
      return defaultRender(tokens, idx, options, env, self)
    }
    token.content = token.content.replace(routeRegex, '')
    token.content = token.content.replace(styleRegex, (substring: string) => {
      store.styleBlockList.push(substring)
      return ''
    })
    token.content = token.content.replace(scriptSetupRegex, (...match: any[]) => {
      store.scriptSetupContent = match[3] || ''
      return ''
    })
    return defaultRender(tokens, idx, options, env, self)
  }
}
