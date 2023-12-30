import markdownIt from 'markdown-it'

export const table = (md: markdownIt) => {
  md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    return `<div class="md-table-container">${self.renderToken(tokens, idx, options)}`
  }
  md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
    return `${self.renderToken(tokens, idx, options)}</div>`
  }
}