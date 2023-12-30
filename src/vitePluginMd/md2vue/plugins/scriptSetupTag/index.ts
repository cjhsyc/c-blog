const regex = /<script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/script>/

export const scriptSetupTag = (markdown: string) => {
  const matches = markdown.match(regex)
  const newMarkdown = matches ? markdown.replace(matches[0], '') : markdown
  const scriptSetupContent = matches ? matches[3] : ''
  return {
    newMarkdown,
    scriptSetupContent
  }
}
