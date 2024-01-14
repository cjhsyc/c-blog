<template>
  <div class="home">
    <NumberPuzzle />
  </div>
</template>

<script setup lang="ts">
import NumberPuzzle from '@/components/numberPuzzle/NumberPuzzle.vue'
</script>

<style scoped lang='scss'>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - var(--navbar-height));
}
</style>
