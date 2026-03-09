import { createRouter, createWebHistory, useRouter } from 'vue-router'
import HelloWorld from '../pages/HelloWorld.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HelloWorld,
    meta: {
      title: '首页',
      requiresAuth: true,
      keepAlive: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/About.vue'),

    meta: {
      title: '关于页面',
      requiresAuth: true,
      keepAlive: false
    },
    // children
  },
  // 百川云页面路由配置
  {
    path: '/baichuan',
    name: 'baichuan',
    component: () => import('../pages/BaichuanCloud.vue'),
    meta: {
      title: '百川页面',
      requiresAuth: true,
      keepAlive: true
    },
    children: [
      {
        path: '',
        component: () => import('../components/CarInfor.vue'),
        meta: { title: '车辆详情' },
        name: 'carinfor',
      },
      {
        path: 'changecar/:carId?',
        component: () => import('../components/ChangeCar.vue'),
        meta: { title: '车辆更改' },
        name: 'changecar',
        props:true,
      },
      {
        path: 'addcar',
        name: 'addcar',
        component: () => import('../components/AddCar.vue'),
        meta: {
          title: '新增车辆',
          requiresAuth: false,
          keepAlive: true
        }
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../pages/NotFound.vue'),
    meta: {
      title: '页面未找到',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫:可以用于校验登陆权限，可以用于做拦截
router.beforeEach((to, from, next) => {
  console.log('路由跳转:', from.path, '->', to.path)

  next()
})

router.afterEach((to, from) => {
  console.log('路由跳转完成:', from.path, '->', to.path)
})

// 路由工具函数
export const useRouterUtils = () => {
  const router = useRouter()
  
  const back = () => {
    router.back()
  } // 返回上一页
  
  const go = (delta) => {
    router.go(delta)
  }
  // 前进

  
  const push = (location) => {
    return router.push(location)
  } // 跳转页面
  
  const replace = (location) => {
    return router.replace(location)
  }// 替换页面
  
  const getRoute = () => {
    return router.currentRoute.value
  }// 获取当前路由信息
  
  const getQuery = () => {
    return router.currentRoute.value.query
  }
  
  const getParams = () => {
    return router.currentRoute.value.params
  }
  
  const close = (fallbackPath = '/') => {
    if (window.history.length > 1) {
      back()
    } else {
      replace(fallbackPath)
    }
  }  // 关闭当前页面
  
  return {
    back,
    go,
    push,
    replace,
    getRoute,
    getQuery,
    getParams,
    close
  }
}

export default router