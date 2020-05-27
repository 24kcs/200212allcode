import Vue from 'vue'
// 引入整个mint-ui组件库的文件
// import MintUI from 'mint-ui'
// 引入的mint-ui的样式文件
// import 'mint-ui/lib/style.css'
import App from './App.vue'
// 引入mint-ui组件库中的某个组件,Button组件
import { Button } from 'mint-ui';
// 把Button组件注册成一个全局组件(可以在当前这个项目中的任何一个组件中都可以使用了)
Vue.component(Button.name, Button);
// 使用MintUI插件
// Vue.use(MintUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
