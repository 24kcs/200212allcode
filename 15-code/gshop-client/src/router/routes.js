// 引入组件,并注册路由组件
// 引入Home组件
import Home from '@/pages/Home'
// 引入Login组件
import Login from '@/pages/Login'
// 引入Register组件
import Register from '@/pages/Register'
// 引入Search组件
import Search from '@/pages/Search'
// 引入Detail组件
import Detail from '@/pages/Detail'
// 引入AddCartSuccess组件
import AddCartSuccess from '@/pages/AddCartSuccess'
// 引入ShopCart组件
import ShopCart from '@/pages/ShopCart'
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
  // params的方式传参
  // {
  //   path: '/search/:keyword',
  //   component: Search
  // },
  // query的方式传参
  // {
  //   path: '/search',
  //   component: Search
  // },
  // query 的方式传参----编程式路由以对象的方式进行书写
  // {
  //   path: '/search',
  //   component: Search
  // },
  // params 的方式传参-----编程式路由以对象的方式进行书写
  {
    // : ----占位,至于传参的数据需要通过keyword进行保存并传递
    // ? -----可传可不传
    path: '/search/:keyword?',
    component: Search,
    name: 'search'
  },
  // 商品详情组件
  {
    name:'detail',
    path:'/detail/:skuId', // 大小写都可以
    component:Detail
  },
  // 添加购物车成功的组件
  {
    path:'/addcartsuccess',
    component:AddCartSuccess
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  // 重定向的设置
  {
    path: '/',
    redirect: '/'
  }


]