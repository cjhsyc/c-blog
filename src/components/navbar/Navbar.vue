<!-- 顶部导航 -->
<template>
  <div class="navbar">
    <div class="menu">
      <div
        v-for="item in menuList"
        :key="item.menuName"
        class="menu-item"
        :class="{ active: item.menuName === currNavItem }"
        @click="handleClick(item.menuName)"
      >
        {{ item.menuName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenu } from '@/hooks/menu'

const { menuList, currNavItem, currPath } = useMenu()

const handleClick = (menuName: string) => {
  currNavItem.value = menuName
}

watch(
  currPath,
  (path) => {
    currNavItem.value = path.split('/')[1]
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-size: 1.1rem;
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
  height: var(--navbar-height);
  .menu {
    display: flex;
    gap: 2rem;
    .menu-item {
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
      &.active {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
