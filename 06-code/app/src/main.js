import Vue from 'vue'
import App from './App.vue'
// 引入store
import store from './store'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 注册store
  store
})
