/* 
Vue的路由器对象
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({
  // 路由模式
  mode: 'history', // 不带#

  // 配置应用中所有路由
  routes
})

