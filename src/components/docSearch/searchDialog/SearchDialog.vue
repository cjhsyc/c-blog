<template>
  <el-dialog
    v-model="showDialog"
    class="doc-search-dialog"
    append-to-body
    :before-close="handleClose"
    :show-close="false"
    :width="500"
  >
    <template #header="{ titleId, titleClass }">
      <div class="search-dialog-header">
        <el-form
          class="search-form"
          :id="titleId"
          :class="titleClass"
          @submit.prevent="handleSearch"
        >
          <el-input
            size="large"
            v-model="query"
            placeholder="搜索文档"
            clearable
            :prefix-icon="Search"
            @input="handleSearch"
          ></el-input>
        </el-form>
      </div>
    </template>
    <el-scrollbar class="dialog-content" :max-height="500">
      <div class="search-result">
        <div
          class="result-item"
          v-for="item in searchResults"
          :key="item.id"
          @click="handleClick(item.path)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="empty" v-if="searchResults.length === 0">没有搜索结果</div>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup lang="ts">
import { useSearch } from '@/hooks/search'
import { Search } from '@element-plus/icons-vue'
import type { SearchResult } from 'minisearch'

const router = useRouter()
const showDialog = ref(false)
const query = ref('')
const { search } = useSearch()
const searchResults = ref<SearchResult[]>([])

const handleSearch = () => {
  const results = search(query.value)
  searchResults.value = results
}

const handleClick = (path: string) => {
  if (path) {
    router.push(path)
    handleClose()
  }
}

const open = () => {
  showDialog.value = true
}

const handleClose = () => {
  showDialog.value = false
  query.value = ''
  searchResults.value = []
}

defineExpose({
  open
})
</script>

<style scoped lang="scss">
.dialog-content {
  .search-result {
    user-select: none;
    .result-item {
      height: 40px;
      border-radius: 4px;
      border: 2px solid transparent;
      background-color: var(--info-bgc);
      display: flex;
      align-items: center;
      padding: 0 10px;
      &:hover {
        border: 2px solid var(--primary);
      }
      & + .result-item {
        margin-top: 10px;
      }
    }
  }
  .empty {
    text-align: center;
    line-height: 80px;
    height: 80px;
    color: var(--placeholder-color);
  }
}
</style>

<style lang="scss">
.doc-search-dialog {
  .el-dialog__header {
    margin: 0;
    padding: 10px;
  }
  .el-dialog__body {
    padding: 10px;
  }
}
</style>
