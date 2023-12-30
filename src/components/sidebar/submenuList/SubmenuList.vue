<template>
  <template v-for="item in submenuList">
    <el-sub-menu
      v-if="item.submenuList"
      :key="item.menuName"
      class="sub-menu"
      :index="item.menuName"
    >
      <template #title>
        <span :title="item.menuName">{{ item.menuName }}</span>
      </template>
      <SubmenuList :submenu-list="item.submenuList"></SubmenuList>
    </el-sub-menu>
    <el-menu-item v-else-if="item.path" :key="item.path" class="menu-item" :index="item.path">
      <span class="menu-item-text" :title="item.menuName">{{ item.menuName }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { MenuListItem } from '@/types/menu'

defineProps({
  /** 子菜单列表 */
  submenuList: {
    type: Array as PropType<MenuListItem[]>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.sub-menu {
  :deep(.el-sub-menu__title span) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.el-sub-menu .el-menu-item.menu-item {
  min-height: var(--el-menu-sub-item-height);
  height: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  .menu-item-text {
    white-space: wrap;
    line-height: 1.4em;
  }
}
</style>
