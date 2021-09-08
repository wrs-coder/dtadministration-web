import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import HelloPage from '../views/HelloPage'
import Home from '../views/Home'
import People from '../views/DT-people'
import Activity from '../views/DT-activity'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/HelloPage',
        name: 'HelloPage',
        component: HelloPage
      },
      {
        path: '/People',
        name: 'People',
        component: People
      },
      {
        path: '/Activity',
        name: 'Activity',
        component: Activity
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 若访问登录页，则放行
  if (to.path === '/') return next()
  // 获取存在sessionStorage中的token
  const tokenStr = window.sessionStorage.getItem('Authorization')
  // 若没有token, 强制跳转到登录页
  if (!tokenStr) return next('/')
  next()
})

export default router
