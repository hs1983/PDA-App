import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {

    path: '/',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  }, {

    path: '/main',
    name: 'main',
    component: () => import('@/views/main'),
    hidden: true
  }, {

    path: '/error404',
    name: 'error404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {

    path: '/putin',
    name: 'putin',
    component: () => import('@/views/putin/index'),
    hidden: true
  },
  {

    path: '/putout',
    name: 'putout',
    component: () => import('@/views/putout/index'),
    hidden: true
  },
  {

    path: '/return',
    name: 'return',
    component: () => import('@/views/return/index'),
    hidden: true
  },

 {

    path: '/emptyin',
    name: 'emptyin',
    component: () => import('@/views/emptyin/index'),
    hidden: true
  }, 
  {

    path: '/emptyout',
    name: 'emptyout',
    component: () => import('@/views/emptyout/index'),
    hidden: true
  }
  ,
  {

    path: '/package',
    name: 'package',
    component: () => import('@/views/package/index'),
    hidden: true
  }
  ,
  {
    path: '*',
    redirect: '/error404'
  }



]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
