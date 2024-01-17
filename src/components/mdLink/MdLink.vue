<template>
  <el-link class="md-link" type="primary" :href="url" :underline="false" @click="handleClick">
    <span>
      <span class="link-text">
        <slot />
        <el-icon v-if="isOutLink" class="md-link-icon"><OutLink /></el-icon>
      </span>
    </span>
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
  &:hover {
    color: var(--primary);
  }
  .link-text {
    background: linear-gradient(var(--primary), var(--primary)) no-repeat bottom right;
    background-size: 0 1px;
    transition: background-size 0.5s linear;
    &:hover {
      background-size: 100% 1px;
      background-position-x: left;
    }
    .md-link-icon {
      margin-left: 2px;
      vertical-align: middle;
    }
  }
}
</style>
