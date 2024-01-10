import markdownIt from 'markdown-it'
import { store } from './store'
import { highlight, codeInline, link, anchor, container, table, htmlBlock } from './plugins'

const md: markdownIt = markdownIt({
  html: true, // 解析markdown文本中的html标签
  linkify: true, // 将类似URL的文本自动转换为链接
  breaks: true, // 转换 '\n' 为 <br/>
  typographer: true, // 一些特殊文本的替换，详情查看：https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
  highlight: (str, lang) => highlight(str, lang, md) // 代码块：代码高亮
})
codeInline(md)
link(md)
anchor(md)
container(md)
table(md)
htmlBlock(md)

/** 将markdown文本转换为vue文本 */
export const md2vue = (markdown: string, file: string) => {
  store.reset(file)
  // 使用markdown-it将markdown文本转换为html
  const html = md.render(markdown, { file })
  store.setSearchContent(html)
  return `
<template>
  <div class="markdown-container">
    ${html}
  </div>
</template>

<script setup lang="ts">
import { useAnchor } from '@/hooks/anchor'
${[...store.importStr].join('\n')}
${store.scriptSetupContent}

const { setAnchors } = useAnchor()
onBeforeMount(() => {
  setAnchors(${JSON.stringify(store.anchors)})
})
</script>

<style lang="scss" scoped>
@use '@/vitePluginMd/md2vue/style.scss' as *;
</style>

${store.styleBlockList.join('\n')}
`
}

export const searchContent = store.searchContent
