import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (/%[0-9A-Fa-f]{2}/.test(to.path)) {
    // 中文url解码
    return decodeURI(to.path) + to.hash
  }
  return true
})

export default router
