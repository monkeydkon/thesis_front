import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'auth',
    path: '/',
    component: () => import('@/views/Auth'),
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('@/views/auth/Login')
      },
      {
        name: 'forgot',
        path: 'forgot',
        component: () => import('@/views/auth/Forgot')
      }
    ]
  },

  {
    name: 'main',
    path: '/',
    component: () => import('@/views/Main'),
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/views/main/Dashboard')
      },
      {
        name: 'classes',
        path: 'classes/:id',
        component: () => import('@/views/main/Classes'),
        children: [
          {
            name: 'posts',
            path: 'posts',
            component: () => import('@/views/main/classes/Posts')
          },
          {
            name: 'studentPosts',
            path: 'studentPosts',
            component: () => import ('@/views/main/classes/StudentPosts')
          },
          {
            name: 'members',
            path: 'members',
            component: () => import('@/views/main/classes/Members')
          },
          {
            name: 'material',
            path: 'material',
            component: () => import('@/views/main/classes/Material')
          }
        ]
      },
      {
        name: 'profile',
        path: 'profile',
        component: () => import('@/views/main/Profile')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
