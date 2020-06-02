// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 设置浏览器控制台默认的提示信息不显示
Vue.config.productionTip = false
// 实例化Vue
new Vue({
  render: h => h(App),
}).$mount('#app')
