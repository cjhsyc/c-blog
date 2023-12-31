<template>
  <div class="code-block">
    <pre><code class="hljs"><slot /></code></pre>
    <div class="copy" @click="handleCopy">
      <el-icon :size="16"> <CopyDocument /> </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CopyDocument } from '@element-plus/icons-vue'

const props = defineProps({
  code: {
    type: String,
    default: ''
  }
})

const handleCopy = () => {
  navigator.clipboard.writeText(props.code).then(() => {
    ElMessage.success('复制成功')
  })
}
</script>

<style scoped lang="scss">
@use '@/assets/style/mixins/scrollbar.scss' as *;

.code-block {
  position: relative;
  pre .hljs {
    border-radius: 4px;
    font-family: var(--code-font-family);
    background-color: var(--bgc-code);
    color: var(--text-color);
    @include scrollbar();
  }
  .copy {
    display: none;
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
    background-color: var(--bgc-code);
  }
  &:hover {
    .copy {
      display: block;
    }
  }
}
</style>
<style lang="scss">
@use 'highlight.js/styles/xcode.css' as *;
</style>
