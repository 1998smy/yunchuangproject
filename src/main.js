import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/base.css'
import './assets/css/golbal.css'
// 导入 element-ui
import '@/element-ui/element-ui.js'
// 导入时间过滤器
import * as filter from '@/filter/index.js'

Vue.config.productionTip = false

// 设置全局时间过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
