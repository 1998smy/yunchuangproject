import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/token.js'
import { getUserInfo } from '@/api/profile.js'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

// 导入需要配置路由的文件
import Login from "@/views/login/index.vue"
import Layout from '@/views/layout/layout.vue'
import User from '@/views/layout/components/user.vue'
import Companys from '@/views/layout/components/companys.vue'
import Setting from '@/views/layout/components/setting.vue'

const routes = [
  { path: '/login', component: Login },
  {
    path: '/layout', component: Layout,
    children: [
      { path: 'user', component: User },
      { path: 'enterprise', component: Companys },
      { path: 'setting', component: Setting },
    ]

  }
]

const router = new VueRouter({
  routes
})

// 导航守卫判断 token
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  }
  // 首页才需要判断token
  if (to.path === '/layout') {
    if (!getToken()) {
      Message.error('必须登录才可以访问首页')
      return next('/login')
    } else {
      if (!store.state.userName) {
        // token 正确判断
        getUserInfo().then(res => {
          // 保存用户信息 store需要在端部引入
          store.commit('SETUSERNAME', res.data.name)
          // 验证成功
          // next('/layout')
          router.push('/layout')
          // }
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})



export default router
