import Vue from 'vue'
import App from './App.vue'
// 引入路由器
import router from './router'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 注册路由器----Vue中已经深度的继承了router
  router
})
