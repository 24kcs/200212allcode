import Vue from 'vue'
import App from './App.vue'
// 引入vue-resource插件对象
import VueResource from 'vue-resource'
// 声明使用插件
Vue.use(VueResource)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
