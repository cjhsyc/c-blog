import type { Plugin } from 'vite'
import { md2vue, searchContent } from './md2vue'

/** vite插件：将markdown文件转为vue */
export default (): Plugin => {
  return {
    name: 'vite-plugin-md', // 插件名称
    enforce: 'pre', // 插件调用顺序
    /**
     * Rollup钩子，转换文件内容
     * @param {string} content 加载的文件的文本内容
     * @param {string} file 加载的文件路径全名
     * */
    transform(content, file) {
      if (/\.md$/.test(file)) {
        return {
          code: md2vue(content, file)
        }
      }
    },
    // Vite钩子，用于热更新
    async handleHotUpdate(ctx) {
      if (/\.md$/.test(ctx.file)) {
        const readSource = ctx.read
        ctx.read = async function () {
          return md2vue(await readSource(), ctx.file)
        }
      }
    },
    resolveId(id) {
      if (id === 'md:search') {
        return `\0` + 'md:search'
      }
    },
    load(id) {
      if (id === '\0md:search') {
        const documents = [...searchContent.entries()].map(([file, data], index) => {
          return {
            id: index,
            file,
            ...data
          }
        })
        return `export const documents = ${JSON.stringify(documents)}`
      }
    }
  }
}
