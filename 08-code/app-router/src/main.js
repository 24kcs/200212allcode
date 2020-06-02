// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入路由器对象
import router from './router'
// 设置浏览器的控制台中的默认提示显示不显示
Vue.config.productionTip = false
// 创建Vue的实例
new Vue({
  render: h => h(App),
  // 注册路由器
  router
}).$mount('#app')
