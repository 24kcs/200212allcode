// 创建路由器,并注册路由(普通组件变路由组件),并把当前的路由器对象暴露出去，在main.js中注册路由器
// 路由器:管理路由的
// 引入Vue
import Vue from 'vue'
// 引入路由器
import VueRouter from 'vue-router'


// 引入组件
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'

// 声明使用路由器
Vue.use(VueRouter)
//创建路由器对象,并暴露出去
export default new VueRouter({
  // 配置路由器的
  // mode: 'history', // 设置浏览器的地址栏中是否有#的
  // 默认mode的是hash 模式,带#的
  mode: 'history', // 不带#的
  // 注册路由的数组,每个路由都是一个对象
  routes: [
    // 配合路由(路由要形成一种映射关系,地址:组件)
    {
      path: '/about', // 地址
      component: About // 组件
    },
    {
      path: '/home',
      component: Home
    }
  ]

})