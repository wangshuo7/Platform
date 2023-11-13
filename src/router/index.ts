import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
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
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export function useRouter() {
  return router
}

export function useRoute() {
  return router.currentRoute
}

export default router
