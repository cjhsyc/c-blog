import { menuRoutes } from '@/router/routes'
import type { MenuListItem } from '@/types/menu'
import type { RouteRecordRaw } from 'vue-router'

/** 菜单数据 */
const menuList = ref<MenuListItem[]>([])
/** 当前选中的一级菜单项名称 */
const currNavItem = ref('')
/** 是否已经加载过菜单数据 */
const flag = ref(false)
/** 当前子菜单列表 */
const currSubMenuList = computed(
  () =>
    menuList.value.find((item) => {
      return item.menuName === currNavItem.value
    })?.submenuList || []
)

/** 菜单数据 */
export const useMenu = () => {
  const route = useRoute()
  /** 当前路径 */
  const currPath = computed(() => route.path.toLowerCase())

  onBeforeMount(() => {
    if (!flag.value) {
      menuList.value = getMenuList(menuRoutes)
      flag.value = true
    }
  })

  return {
    /** 菜单数据 */
    menuList,
    /** 当前选中的一级菜单项名称 */
    currNavItem,
    /** 当前路径 */
    currPath,
    /** 当前子菜单列表 */
    currSubMenuList
  }
}

/** 根据路由生成菜单数据 */
const getMenuList = (routes: RouteRecordRaw[]) => {
  const menuList: MenuListItem[] = []
  routes
    .filter((route) => route.path.startsWith('/source'))
    .forEach((route) => {
      const names = (route.children?.[0].name as string).replace(/^source\//, '').split('/')
      names.reduce((menuList, nameItem, index) => {
        let menuItem = menuList.find((menuItem) => {
          if (index === names.length - 1) {
            return menuItem.path === route.path
          } else {
            return menuItem.menuName === nameItem
          }
        })
        if (!menuItem) {
          if (index === names.length - 1) {
            menuItem = {
              menuName: (route.children?.[0].meta?.title as string) || nameItem,
              path: route.path
            }
          } else {
            menuItem = {
              menuName: nameItem,
              submenuList: []
            }
          }
          menuList.push(menuItem)
        }
        return menuItem.submenuList || []
      }, menuList)
    })
  return menuList
}
