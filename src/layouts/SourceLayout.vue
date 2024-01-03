<template>
  <el-scrollbar class="source-layout" ref="layoutRef">
    <navbar class="navbar"></navbar>
    <div class="main">
      <sidebar class="sidebar"></sidebar>
      <div class="container" :class="{ 'no-side': !showAnchor }">
        <div class="content">
          <div class="markdown-content">
            <RouterView />
          </div>
          <div class="footer">
            <PageSwitch />
          </div>
        </div>
        <el-scrollbar v-if="showAnchor" class="side">
          <Anchor />
        </el-scrollbar>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import Navbar from '@/components/navbar/Navbar.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import PageSwitch from '@/components/pageSwitch/PageSwitch.vue'
import Anchor from '@/components/anchor/Anchor.vue'
import type { ScrollbarInstance } from 'element-plus'

const showAnchor = ref(true)
const layoutRef = ref<ScrollbarInstance>()
const route = useRoute()

const handleResize = () => {
  if (window.innerWidth < 1000) {
    showAnchor.value = false
  } else {
    showAnchor.value = true
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(
  () => route.path,
  () => {
    layoutRef.value?.scrollTo(0, 0)
  }
)

provide('layoutRef', layoutRef)
</script>

<style scoped lang="scss">
.source-layout {
  height: 100vh;
  .navbar {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .main {
    display: flex;
    --sidebar-width: 230px;
    .sidebar {
      width: var(--sidebar-width);
      position: sticky;
      top: var(--navbar-height);
      height: calc(100vh - var(--navbar-height));
      z-index: 1;
    }
    .container {
      width: calc(100% - var(--sidebar-width));
      display: flex;
      position: relative;
      --content-padding-right: 200px;
      &.no-side {
        --content-padding-right: 0;
      }
      .content {
        width: 100%;
        min-height: calc(100vh - var(--navbar-height));
        display: flex;
        flex-direction: column;
        padding-right: var(--content-padding-right);
        .markdown-content {
          flex: 1 0 auto;
        }
        .footer {
          flex-shrink: 0;
          padding: 0 30px 30px;
        }
      }
      .side {
        --side-width: 180px;
        position: fixed;
        top: calc(var(--navbar-height) + 30px);
        right: calc((var(--content-padding-right) - var(--side-width)));
        width: var(--side-width);
        height: calc(100vh - var(--navbar-height) - 60px);
      }
    }
  }
}
</style>
