import type { Anchor } from '@/types/anchor'

export const store = {
  /** 当前正在解析的md文件路径 */
  currFile: '',
  /** 生成的vue中的import语句 */
  importStr: new Set<string>(),
  /** 文件的锚点数据 */
  anchors: [] as Anchor[],
  /** style标签列表 */
  styleBlockList: [] as string[],
  /** scriptSetup标签内容 */
  scriptSetupContent: '',
  /** 文档搜索内容 */
  searchContent: new Map<string, { title: string; path: string; anchors: string; text: string }>(),
  reset(file: string) {
    this.currFile = file
    this.importStr = new Set()
    this.anchors = []
    this.styleBlockList = []
    this.scriptSetupContent = ''
  },
  /** 设置可查询内容 */
  setSearchContent(html: string) {
    const m = this.currFile.match(/(\/source\/(.+)).md$/)
    this.searchContent.set(this.currFile, {
      title: m?.[2] || '',
      path: m?.[1] || '',
      anchors: store.anchors.map((anchor) => anchor.content).join('\n'),
      text: html.replace(/<h[1-6][\s\S]*?>[\s\S]*?<\/h[1-6]>|<[\s\S]*?>/g, '') // 移除 h标签(包括内容) 和 其他标签(保留文本内容)
    })
  }
}
