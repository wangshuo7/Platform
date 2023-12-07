import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import { done, start } from '../utils/nprogress'
const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: '/language',
        name: 'Language',
        component: () => import('@/views/Language/index.vue')
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/Category/index.vue')
      },
      {
        path: '/platform',
        name: 'Platform',
        component: () => import('@/views/Platform/index.vue')
      },
      {
        path: '/invitation',
        name: 'Invitation',
        component: () => import('@/views/Invitation/index.vue')
      },
      {
        path: '/payment',
        name: 'Payment',
        component: () => import('@/views/Payment/index.vue')
      },
      {
        path: '/withdraw',
        name: 'Withdraw',
        component: () => import('@/views/Withdraw/index.vue')
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/Setting/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (_pre, _next) => {
  start()
})
router.afterEach(() => {
  done()
})

router.beforeEach((to, _from, next) => {
  const isAuthenticated = localStorage.getItem('authtoken')

  if (to.name !== 'Login' && !isAuthenticated) {
    // 如果未登录且目标路由不是登录页，则重定向到登录页面
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticated) {
    // 如果已登录且目标路由是登录页，则重定向到首页
    next({ name: 'Home' })
  } else {
    // 否则，继续正常导航
    next()
  }
})
export function useRouter() {
  return router
}

export function useRoute() {
  return router.currentRoute
}

export default router
