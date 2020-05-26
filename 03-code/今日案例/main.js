// 引入Vue
import Vue from 'vue'
// 引入App组件,.vue可以省略
import App from './App.vue'
// 设置浏览器的控制台中不显示默认提示信息
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
