import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Transactions from '../pages/Transactions.vue'
import { isTokenValid } from '@/utils/auth.js'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})


// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')

//   if (to.meta.requiresAuth && !isTokenValid(token)) {
//     next('/login')
//   } else if (to.path === '/login' && isTokenValid(token)) {
//     next('/dashboard')
//   } else {
//     next()
//   }
// })

export default router
