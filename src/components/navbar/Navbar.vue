<!-- 顶部导航 -->
<template>
  <div class="navbar">
    <div class="menu">
      <div
        v-for="(item, index) in navConfig"
        :key="index"
        class="menu-item"
        :class="{ active: route.path.startsWith(item.path) }"
        @click="handleClick(item.path)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="search"><DocSearch /></div>
  </div>
</template>

<script setup lang="ts">
import { navConfig } from '@/config/nav'
import DocSearch from '@/components/docSearch/DocSearch.vue'

const router = useRouter()
const route = useRoute()

const handleClick = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  font-size: 1.1rem;
  border-bottom: 1px solid var(--border-color);
  height: var(--navbar-height);
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  .menu {
    display: flex;
    gap: 2rem;
    .menu-item {
      cursor: pointer;
      &:hover {
        color: var(--primary);
      }
      &.active {
        color: var(--primary);
      }
    }
  }
}
</style>
