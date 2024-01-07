// vite-plugin-pages插件生成的路由
import generatedRoutes from '~pages'
// vite-plugin-vue-layouts插件
import { setupLayouts } from 'virtual:generated-layouts'
import { menuSortConfig } from '@/config/menu'
import type { RouteRecordRaw } from 'vue-router'

/** 不同路径对应的排序值 */
const orderNoObj = menuSortConfig.reduce(
  (obj, path, index) => {
    obj[path] = index
    return obj
  },
  {} as Record<string, number>
)

// 给所有路由套一层布局
const menuRoutes = setupLayouts(generatedRoutes)

// 按照配置的菜单顺序排序
menuRoutes.sort(
  (routeA, routeB) =>
    (orderNoObj[routeA.path] ?? menuSortConfig.length) -
    (orderNoObj[routeB.path] ?? menuSortConfig.length)
)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/source',
    redirect: menuRoutes[0]?.path
  },
  ...menuRoutes
]

export { routes, menuRoutes }
