import type { Anchor } from '@/types/anchor'

export const store = {
  /** 当前正在解析的md文件路径 */
  currFile: '',
  /** 各md生成的vue中的import语句 */
  importStrObj: {} as Record<string, Set<string>>,
  /** 各md文件的锚点数据 */
  anchorsObj: {} as Record<string, Anchor[]>,
  reset(file: string) {
    this.currFile = file
    Reflect.deleteProperty(this.importStrObj, file)
    Reflect.deleteProperty(this.anchorsObj, file)
  }
}
