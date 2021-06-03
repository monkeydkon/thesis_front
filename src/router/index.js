import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;



const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next()
    return
  }
  next('/login')
}

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name != "NavigationDuplicated") {
      throw err;
    }
  });
};


const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next('/dashboard')
      } else {
        next('/login')
      }
    }
  },
  {
    name: 'auth',
    path: '/',
    component: () => import('@/views/Auth'),
    beforeEnter: ifNotAuthenticated,
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
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('@/views/auth/Register')
      }
    ]
  },

  {
    name: 'main',
    path: '/',
    component: () => import('@/views/Main'),
    beforeEnter: ifAuthenticated,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/views/main/Dashboard')
      },
      {
        name: 'classes',
        path: 'classes',
        component: () => import('@/views/main/Classes'),
        children: [
          {
            name: 'posts',
            path: ':id/posts',
            component: () => import('@/views/main/classes/Posts')
          },
          {
            name: 'studentPosts',
            path: ':id/studentPosts',
            component: () => import('@/views/main/classes/StudentPosts')
          },
          {
            name: 'members',
            path: ':id/members',
            component: () => import('@/views/main/classes/Members')
          },
          {
            name: 'material',
            path: ':id/material',
            component: () => import('@/views/main/classes/Material')
          },
          {
            name: 'assignments',
            path: ':id/assignments',
            component: () => import('@/views/main/classes/Assignments')
          },
          {
            name: 'search',
            path: ':id/search/:query',
            component: () => import('@/views/main/classes/Search')
          }
        ]
      },
      {
        name: 'profile',
        path: 'profile',
        component: () => import('@/views/main/Profile')
      },
      {
        name: 'blog',
        path: 'blog',
        component: () => import('@/views/main/Blog')
      },
      {
        name: 'people',
        path: 'people',
        component: () => import('@/views/main/People')
      },
      {
        name: 'person',
        path: 'people/:id',
        component: () => import('@/views/main/Person')
      }
    ]
  },
  {
    path: '*',
    beforeEnter: (to, from, next) => {
      next('/')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
