import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.isAuthenticated

  // 需要登录的页面
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  // 已登录用户访问登录页，重定向到首页
  else if (to.meta.requiresGuest && isAuthenticated) {
    next('/')
  }
  else {
    next()
  }
})

export default router
