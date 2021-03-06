// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入路由器对象
import router from './router'
// 引入store对象
import store from './store'

// 引入TypeNav商品分类导航 组件,并注册成全局组件
import TypeNav from './components/TypeNav'

// 引入mockServer.js文件,执行一次
import './mock/mockServer'
// 引入Swiper的样式
import 'swiper/css/swiper.css'
// 引入Carousel 轮播图组件
import Carousel from './components/Carousel'

// 引入分页组件Pagination
import Pagination from './components/Pagination'
// 设置浏览器控制台默认的提示信息不显示
Vue.config.productionTip = false

// 注册全局组件
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)

// 数据初始化之前定义事件总线
// Vue.prototype.$bus = new Vue()
// 实例化Vue
new Vue({
  // 数据初始化之前的生命周期回调
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  // 注册路由器
  router,
  // 注册vuex仓库对象
  store
}).$mount('#app')
