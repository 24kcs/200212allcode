// 引入组件,并注册路由组件
// 引入Home组件
import Home from '../pages/Home'
// 引入Login组件
import Login from '../pages/Login'
// 引入Register组件
import Register from '../pages/Register'
// 引入Search组件
import Search from '../pages/Search'
export default [
  // 注册路由组件
  // 主体路由组件
  {
    path: '/',
    component: Home
  },
  // 登录路由组件
  {
    path: '/login',
    component: Login,
    // 默认隐藏底部
    meta: {
      isHideFooter: true
    }
  },
  // 注册路由组件
  {
    path: '/register',
    component: Register,
    // 默认隐藏底部
    meta: {
      isHideFooter: true
    }
  },
  // 搜索路由组件
  {
    path: '/search',
    component: Search
  },
  // 重定向的设置
  {
    path: '/',
    redirect: '/'
  }


]