// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'

// 解决编程式路由中push方法或者replace方法多次跳转的时候出现的bug,需要重写这两个方法,进行统一的处理
const originPush= VueRouter.prototype.push
const originReplace =VueRouter.prototype.replace
// 重写push方法,给成功的回调函数指定一个默认为空的函数参数即可
VueRouter.prototype.push = function(location, onComplete=()=>{}, onAbort){
  return originPush.call(this,location, onComplete, onAbort)
}
// 重写replace方法,给失败的回调函数指定一个默认为空的函数参数即可
VueRouter.prototype.replace = function(location, onComplete, onAbort=()=>{}){
  return originReplace.call(this,location, onComplete, onAbort)
}

// 声明使用插件
Vue.use(VueRouter)
// 创建路由器对象,并暴露出去
export default new VueRouter({
  // 设置路由地址是否携带#
  mode:'history', // 不带#
  // 注册路由组件
  routes,
  // 设置路由跳转的时候,滚动的位置操作
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})