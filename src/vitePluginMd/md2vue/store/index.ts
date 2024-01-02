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
  reset(file: string) {
    this.currFile = file
    this.importStr = new Set()
    this.anchors = []
    this.styleBlockList = []
    this.scriptSetupContent = ''
  }
}
