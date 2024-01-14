<template>
  <div class="number-block" :class="{ empty: num === 0 }">{{ num }}</div>
</template>

<script setup lang="ts">
defineProps({
  num: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 60
  }
})
</script>

<style scoped lang="scss">
.number-block {
  height: var(--size);
  width: var(--size);
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  font-size: calc(var(--size) / 2);
  user-select: none;
  &.empty {
    opacity: 0;
  }
}
</style>
