<template>
  <div class="doc-search">
    <el-icon :size="24" @click="handleSearch"> <Search /> </el-icon>
    <SearchDialog ref="dialogRef"/>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import SearchDialog from './searchDialog/SearchDialog.vue'

const dialogRef = ref<InstanceType<typeof SearchDialog>>()

const handleSearch = () => {
  dialogRef.value?.open()
}
</script>

<style scoped lang="scss">
.doc-search {
  cursor: pointer;
}
</style>
