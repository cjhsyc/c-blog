<template>
  <div class="default-layout">
    <navbar></navbar>
    <div class="main">
      <sidebar></sidebar>
      <el-scrollbar class="scrollbar" ref="scrollbarRef">
        <div class="container" :class="{ 'no-side': !showAnchor }">
          <div class="content">
            <div class="markdown-content">
              <RouterView />
            </div>
            <div class="footer">
              <PageSwitch />
            </div>
          </div>
          <el-scrollbar v-if="showAnchor" class="side" max-height="calc(var(--main-height) - 80px)">
            <Anchor />
          </el-scrollbar>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/navbar/Navbar.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import PageSwitch from '@/components/pageSwitch/PageSwitch.vue'
import Anchor from '@/components/anchor/Anchor.vue'

const showAnchor = ref(true)
const scrollbarRef = ref()
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
    scrollbarRef.value?.scrollTo(0, 0)
  }
)
</script>

<style scoped lang="scss">
.default-layout {
  height: 100vh;
  .main {
    --main-height: calc(100vh - var(--navbar-height));
    height: var(--main-height);
    display: flex;
    .scrollbar {
      height: 100%;
      flex: 1;
      .container {
        display: flex;
        position: relative;
        --content-padding-right: 200px;
        &.no-side {
          --content-padding-right: 0;
        }
        .content {
          min-height: var(--main-height);
          display: flex;
          flex-direction: column;
          padding-right: var(--content-padding-right);
          width: 100%;
          box-sizing: border-box;
          .markdown-content {
            flex: 1 0 auto;
          }
          .footer {
            flex-shrink: 0;
            padding: 0 10px 10px;
          }
        }
        .side {
          --side-width: 180px;
          position: fixed;
          top: 80px;
          right: calc((var(--content-padding-right) - var(--side-width)));
          width: var(--side-width);
        }
      }
    }
  }
}
</style>
