<template>
  <div class="msg-container" :class="type">
    <div class="title">{{ title || type.toUpperCase() }}</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<'success' | 'info' | 'warning' | 'danger'>,
    default: 'info'
  }
})
</script>

<style scoped lang="scss">
.msg-container {
  border-radius: 4px;
  padding: 10px 16px;
  margin: 14px 0;
  border-left: 4px solid var(--info);
  background-color: var(--info-plain-bg);
  &.success {
    border-left: 4px solid var(--success);
    background-color: var(--success-plain-bg);
  }
  &.warning {
    border-left: 4px solid var(--warning);
    background-color: var(--warning-plain-bg);
  }
  &.danger {
    border-left: 4px solid var(--danger);
    background-color: var(--danger-plain-bg);
  }
  .title {
    font-size: larger;
    font-weight: bolder;
    margin-bottom: 14px;
  }
}
</style>
