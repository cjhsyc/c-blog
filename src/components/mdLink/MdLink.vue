<template>
  <el-link class="md-link" type="primary" :href="url" @click="handleClick">
    <slot />
    <el-icon v-if="isOutLink" class="md-link-icon"><OutLink /></el-icon>
  </el-link>
</template>

<script setup lang="ts">
import OutLink from '~icons/c/outLink'

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})

const router = useRouter()

const isOutLink = computed(() => {
  return props.url.startsWith('http')
})

const handleClick = (e: MouseEvent) => {
  e.preventDefault()
  if (isOutLink.value) {
    window.open(props.url)
  } else if (props.url) {
    router.push(props.url)
  }
}
</script>

<style scoped lang="scss">
.md-link {
  font-size: inherit;
  vertical-align: baseline;
  .md-link-icon {
    margin-left: 2px;
  }
}
</style>
