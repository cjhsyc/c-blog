export const routeTag = (markdown: string) => {
  return markdown.replace(/<route([\s\S]*)<\/route>/, '')
}
