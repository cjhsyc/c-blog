<template>
  <el-link class="md-link" type="primary" @click="handleClick"><slot /></el-link>
</template>

<script setup lang="ts">
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

const handleClick = () => {
  if (isOutLink.value) {
    window.open(props.url)
  } else if (props.url) {
    router.push(props.url)
  }
}
</script>

<style scoped lang="scss">
.md-link {
  vertical-align: baseline;
}
</style>
