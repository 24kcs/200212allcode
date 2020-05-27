// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 设置浏览器的控制台中的默认提示信息不显示(该行代码可以不写)
Vue.config.productionTip = false

// Vue.prototype.$sayHi=function(){
//   console.log('我喜欢吃榴莲沾大蒜和臭豆腐,华哥说')
// }

// 事件总线
Vue.prototype.$bus = new Vue()
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  // 根据id选择器获取index.html中id为div的容器(最终所有的内容都会渲染到这个容器中)
  el: '#app',
  // 注册组件
  components: { App },
  // 使用模版
  template: '<App/>'
})
