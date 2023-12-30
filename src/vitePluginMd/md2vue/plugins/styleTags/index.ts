const regex = /<style[\s\S]*<\/style>/g

/** 获取并移除markdown文本中的style标签 */
export const styleTags = (markdown: string) => {
  return {
    newMarkdown: markdown.replace(regex, ''),
    styleTagList: markdown.match(regex) || []
  }
}
