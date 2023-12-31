<!-- 侧边导航菜单 -->
<template>
  <div class="sidebar">
    <el-menu class="menu" router :default-active="currPath">
      <SubmenuList :submenu-list="currSubMenuList"></SubmenuList>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useMenu } from '@/hooks/menu'
import SubmenuList from './submenuList/SubmenuList.vue'

const { currPath, currSubMenuList } = useMenu()
</script>

<style scoped lang="scss">
.sidebar {
  border-right: 1px solid var(--border-color);
  width: 100%;
  .menu {
    border: unset;
    width: 100%;
  }
}
</style>
