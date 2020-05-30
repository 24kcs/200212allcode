// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App'
// 设置浏览器的控制台中不提示默认信息(下面的这行代码可写可不写)
Vue.config.productionTip = false

// 创建Vue的实例对象
/* eslint-disable no-new */
new Vue({
  // 获取index.html文件中的id为app的div容器
  el: '#app',
  // 注册组件
  components: { App },
  // 使用App模版
  template: '<App/>'
})
