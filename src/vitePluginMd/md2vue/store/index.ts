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
  searchContent: new Map<string, { title: string; path: string; anchors: string }>(),
  reset(file: string) {
    this.currFile = file
    this.importStr = new Set()
    this.anchors = []
    this.styleBlockList = []
    this.scriptSetupContent = ''
  },
  setSearchContent() {
    this.searchContent.set(this.currFile, {
      title: this.currFile.match(/\/source\/(.+).md$/)?.[1] || '',
      path: this.currFile.match(/(\/source\/(.+)).md$/)?.[1] || '',
      anchors: store.anchors.map((anchor) => anchor.content).join('\n')
    })
  }
}
