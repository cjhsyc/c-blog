<template>
  <div class="anchor" v-if="anchors.length">
    <div class="anchor-title">本页目录</div>
    <div
      v-for="anchor in anchors"
      :key="anchor.slug"
      :ref="(el) => (itemRefs[anchor.slug] = el)"
      class="anchor-item"
      :class="{
        'anchor-item-active': anchor.slug === currAnchorSlug
      }"
      :style="{
        paddingLeft: getPaddingLeft(anchor.tag)
      }"
      @click="handleClick(anchor.slug)"
    >
      {{ anchor.content }}
    </div>
    <div ref="markerRef" class="marker" :class="{ show: currAnchorSlug }"></div>
  </div>
</template>

<script setup lang="ts">
import { useAnchor } from '@/hooks/anchor'
import { tags } from './const'
import type { ScrollbarInstance } from 'element-plus'

const props = defineProps({
  /** 不显示为锚点的h标签 */
  filterTags: {
    type: Array as PropType<string[]>,
    default: () => ['h5', 'h6']
  }
})

const itemRefs = ref<Record<string, any>>({})
const markerRef = ref<HTMLDivElement>()
// 当前页面锚点数据
const { currAnchors } = useAnchor()
/** 当前选中的锚点 */
const currAnchorSlug = ref('')
/** 过滤不显示为锚点的h标签 */
const anchors = computed(() =>
  currAnchors.value.filter((anchor) => !props.filterTags.includes(anchor.tag))
)
const showTags = computed(() => tags.filter((tag) => !props.filterTags.includes(tag)))

const layoutRef = inject<Ref<ScrollbarInstance | undefined>>('layoutRef')

const setCurrAnchorSlug = (slug: string) => {
  if (markerRef.value) {
    markerRef.value.style.top = `${itemRefs.value[slug].offsetTop}px`
    currAnchorSlug.value = slug
  }
}

/** 点击跳转至对应的锚点 */
const handleClick = (slug: string) => {
  const dom = document.getElementById(slug)
  if (layoutRef?.value && dom) {
    layoutRef.value.wrapRef?.scrollTo({
      top: dom.offsetTop,
      behavior: 'smooth'
    })
  }
}

const getPaddingLeft = (tag: string) => {
  return `${(showTags.value.findIndex((showTag) => showTag === tag) || 0) * 8}px`
}

const intersectingAnchors = ref<string[]>([])

const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.isIntersecting && intersectingAnchors.value.push(entry.target.id)
    !entry.isIntersecting &&
      (intersectingAnchors.value = intersectingAnchors.value.filter((id) => id !== entry.target.id))
  })
  const slug = intersectingAnchors.value[0]
  slug && setCurrAnchorSlug(slug)
})

const resetObserver = () => {
  intersectionObserver.disconnect()
  const domList = document.querySelectorAll('.md-anchor')
  domList.forEach((dom) => {
    intersectionObserver.observe(dom)
  })
}

// 切换页面后，重置锚点选中状态
watch(currAnchors, () => {
  currAnchorSlug.value = ''
  markerRef.value && (markerRef.value.style.top = '0px')
  nextTick(() => {
    resetObserver()
  })
})

onMounted(() => {
  resetObserver()
})

onUnmounted(() => {
  intersectionObserver.disconnect()
})
</script>

<style scoped lang="scss">
.anchor {
  padding: 0 10px;
  position: relative;
  .anchor-title {
    font-weight: bolder;
    font-size: smaller;
  }
  .anchor-item {
    cursor: pointer;
    font-size: smaller;
    margin-top: 6px;
    &.anchor-item-active {
      color: var(--primary);
    }
    &:hover {
      color: var(--primary);
    }
  }
  .marker {
    width: 4px;
    border-radius: 2px;
    height: 16px;
    background-color: var(--primary);
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    transition:
      top 0.6s cubic-bezier(0, 1, 0.5, 1),
      opacity 0.25s;
    &.show {
      opacity: 1;
    }
  }
}
</style>
