// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 引入store
import store from '@/store'

// 解决编程式路由中push方法或者replace方法多次跳转的时候出现的bug,需要重写这两个方法,进行统一的处理
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写push方法,给成功的回调函数指定一个默认为空的函数参数即可
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
  return originPush.call(this, location, onComplete, onAbort)
}
// 重写replace方法,给失败的回调函数指定一个默认为空的函数参数即可
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return originReplace.call(this, location, onComplete, onAbort)
}

// 声明使用插件
Vue.use(VueRouter)
// 创建路由器对象,并暴露出去
const router = new VueRouter({
  // 设置路由地址是否携带#
  mode: 'history', // 不带#
  // 注册路由组件
  routes,
  // 设置路由跳转的时候,滚动的位置操作
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})

// 全局的前置路由守卫
/**
 * 
 * to: 相当于$route路由信息对象,即将要进入的目标路由对象-----目标路由对象
 * from: 相当于$route路由信息对象,即将要离开的目标路由对象-----目标路由对象
 * next: 函数 , 用来控制路由跳转的函数----放行
 *  1. next() :不传入任何的参数, 代表的就是放行
 *  2. next(路径): 传入路径,代表的是强制跳转到指定的路径的路由
 * 没有next() 不放行
 */
// router.beforeEach((to, from, next) => {
//   // console.log(next)
//   // 需求: 如果当前请求的不是login,那么就跳转到login,否则放行

//   if (to.path !== '/login') {
//     next('/login')
//   } else {
//     next()
//   }
// })
router.beforeEach((to, from, next) => {
  // 只有登录的情况下,才能看到交易/支付/个人中心的界面
  // 收集要检测的路由地址
  const checkPath = ['/trade', '/pay', '/center'] // 如果要访问的路由地址中有: '/center/myorder'
  // 获取目标路由地址
  const targetPath = to.path
  // if(checkPath.indexOf(targetPath)!==-1){
  if (checkPath.find(path => targetPath.indexOf(path) === 0)) {
    // 判断是否已经登录
    if(store.state.user.userInfo.name){
      next() // 已经登录
    }else{
      // 没有登录的情况下
      next('/login?redirect='+targetPath)
    }
  } else {
    next()
  }

})
// 暴露路由器对象
export default router