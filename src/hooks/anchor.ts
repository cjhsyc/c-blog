import type { Anchor } from '@/types/anchor'

/** 各页面锚点数据 */
const anchorsMap = ref(new Map<string, Anchor[]>())

const setAnchors = (path: string) => {
  return (anchors: Anchor[]) => {
    if (anchorsMap.value.has(path)) {
      return
    }
    anchorsMap.value.set(path, anchors)
  }
}

/** 各页面锚点数据 */
export const useAnchor = () => {
  const route = useRoute()

  /** 当前页面锚点数据 */
  const currAnchors = computed(() => anchorsMap.value.get(route.path) || [])
  return {
    currAnchors,
    anchorsMap,
    setAnchors: setAnchors(route.path)
  }
}
