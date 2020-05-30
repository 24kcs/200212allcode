import Vue from 'vue'
import App from './App.vue'
// 引入store对象
import store from './vuex/store.js'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 注册Vuex仓库对象
  store
})
