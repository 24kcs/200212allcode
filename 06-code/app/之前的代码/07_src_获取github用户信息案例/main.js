import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 定义一个事件总线
Vue.prototype.$bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
