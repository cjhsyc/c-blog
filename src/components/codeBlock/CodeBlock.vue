<template>
  <div class="code-block">
    <pre><code class="hljs"><slot /></code></pre>
    <div class="copy" :class="{ success: copySuccess }" @click="handleCopy">
      <el-icon :size="16">
        <Transition name="icon">
          <CopyDocument v-if="!copySuccess" />
          <Select v-else />
        </Transition>
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CopyDocument, Select } from '@element-plus/icons-vue'

const props = defineProps({
  code: {
    type: String,
    default: ''
  }
})

const copySuccess = ref(false)
let timer: NodeJS.Timeout

const handleCopy = () => {
  navigator.clipboard?.writeText(props.code).then(() => {
    copySuccess.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      copySuccess.value = false
    }, 1000)
  })
}
</script>

<style scoped lang="scss">
@use '@/assets/style/mixins/scrollbar.scss' as *;

.code-block {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  pre {
    margin: 0;
    .hljs {
      font-family: var(--code-font-family);
      background-color: var(--bgc-code);
      color: var(--text-color);
      @include scrollbar();
    }
  }
  .copy {
    display: none;
    position: absolute;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 0;
    cursor: pointer;
    background-color: var(--bgc-code);
    &.success {
      display: flex;
      .icon-enter-active {
        transition: transform 0.15s linear;
      }
      .icon-enter-from {
        transform: scale(0);
      }
    }
  }
  &:hover {
    .copy {
      display: flex;
    }
  }
}
</style>
<style lang="scss">
@use 'highlight.js/styles/github.css' as *;
</style>
