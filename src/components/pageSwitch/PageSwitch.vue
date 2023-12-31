<!-- 上下页切换 -->
<template>
  <div class="page-switch" v-if="prevMenuItem || nextMenuItem">
    <div class="prev">
      <el-button
        v-show="prevMenuItem"
        type="primary"
        :icon="ArrowLeftBold"
        text
        size="large"
        @click="handleClick(prevMenuItem?.path)"
      >
        <span class="title prev-title">{{ prevMenuItem?.menuName }}</span>
      </el-button>
    </div>
    <div class="next">
      <el-button
        v-show="nextMenuItem"
        type="primary"
        text
        size="large"
        @click="handleClick(nextMenuItem?.path)"
      >
        <span class="title next-title">{{ nextMenuItem?.menuName }}</span>
        <el-icon style="margin-left: 5px" :size="14"><ArrowRightBold /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'
import { useMenu } from '@/hooks/menu'
import type { MenuListItem } from '@/types/menu'

const router = useRouter()
const { currPath, currSubMenuList } = useMenu()

/** 扁平化菜单项 */
const flatMenuList = computed(() => {
  return getFlatList(currSubMenuList.value)
})

const currItemIndex = computed(() => {
  return flatMenuList.value.findIndex((menuItem) => menuItem.path === currPath.value)
})

/** 前一个菜单项 */
const prevMenuItem = computed(() => flatMenuList.value[currItemIndex.value - 1])
/** 后一个菜单项 */
const nextMenuItem = computed(() => flatMenuList.value[currItemIndex.value + 1])

const getFlatList = (subMenuList: MenuListItem[]) => {
  return subMenuList.reduce(
    (list, menuItem) => {
      if (menuItem.path) {
        list.push(menuItem)
      } else {
        list.push(...getFlatList(menuItem.submenuList || []))
      }
      return list
    },
    [] as Omit<MenuListItem, 'submenuList'>[]
  )
}

/** 切换页面 */
const handleClick = (path?: string) => {
  path && router.push(path)
}
</script>

<style scoped lang="scss">
.page-switch {
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  .prev,
  .next {
    .title {
      max-width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
