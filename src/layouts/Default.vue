<template>
  <el-scrollbar class="default-layout" ref="layoutRef">
    <navbar class="navbar"></navbar>
    <div class="main">
      <RouterView />
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import Navbar from '@/components/navbar/Navbar.vue'
</script>

<style scoped lang="scss">
.default-layout {
  height: 100vh;
  .navbar {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1;
  }
}
</style>
