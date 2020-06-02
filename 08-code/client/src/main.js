import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 脚手架3
new Vue({
  render: h => h(App),
}).$mount('#app')


// 脚手架3中$mount('#app') 相当于脚手架2中el:'#app'
// 脚手架3中的使用App组件进行渲染的方式和脚手架2不一样

// 渲染虚拟DOM
// render:function (createElement){
//   return createElement(App)
// }

// render:(createElement)=>{
//   return createElement(App)
// }
// render:h=>{
//   return h(App)
// }
// render:h=>h(App)


// 脚手架2
// new Vue({
//   el:'#app',
//   components:App,
//   template:'<Appp/>'
// })