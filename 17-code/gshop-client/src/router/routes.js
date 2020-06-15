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

// 引入Trade---结算组件
import Trade from '@/pages/Trade'
// 引入Pay---支付组件
import Pay from '@/pages/Pay'
// 引入PaySuccess---支付成功组件
import PaySuccess from '@/pages/PaySuccess'
// 引入Center---个人中心
import Center from '@/pages/Center'
// 引入MyOrder---我的订单
import MyOrder from '@/pages/Center/MyOrder'
// 引入GroupBuy--团购
import GroupBuy from '@/pages/Center/GroupBuy'
// 引入store
import store from '@/store'

export default [
  // 注册路由组件
  // 结算路由组件
  {
    path: '/trade',
    component: Trade,
    // 4. 只能从购物车的界面,才能跳转到交易界面(trade)
    beforeEnter (to, from, next) {
      // 是不是从购物车的界面过来的
      if (from.path === '/shopcart') {
        next() // 放行
      } else {
        // 不是从购物车界面来的,那就给跳到购物车界面去
        next('/shopcart')
      }
    }

  },

  // 支付路由组件
  {
    path: '/pay',
    component: Pay,
    // 5. 只能从交易的界面,才能跳转到支付的界面(pay)
    beforeEnter (to, from, next) {
      // 是不是从交易界面过来的
      if (from.path === '/trade') {
        next()
      } else {
        next('/trade')
      }
    }
  },

  // 支付成功路由组件
  {
    path: '/paysuccess',
    component: PaySuccess,
    // 6. 只能从支付的界面,才能跳转到支付成功的界面(paysuccess)
    beforeEnter (to, from, next) {
      // 是不是从pay界面过来的
      if (from.path === '/pay') {
        next()
      } else {
        next('/pay')
      }
    }
  },

  // 个人中心路由组件
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: '/center/myorder',
        component: MyOrder
      },
      {
        path: 'groupbuy',  // 这是一种简写的方式
        component: GroupBuy
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },


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
    },
    // // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 2.只有在没有登录的情况下,才能看到登录界面
      if (store.state.user.userInfo.name) {
        next('/')
      } else {
        // 没有登录可以正常的访问其他的界面
        next()
      }
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
    name: 'detail',
    path: '/detail/:skuId', // 大小写都可以
    component: Detail
  },
  // 添加购物车成功的组件
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    beforeEnter (to, from, next) {
      // 3. 只有携带了skuId和skuNum以及sessionStorage中有skuInfo对象信息,才能看到添加购物车成功的界面addcartsuccess
      const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO'))
      const { skuId, skuNum } = to.query
      // 判断三个数据是否都存在
      if (skuInfo && skuId && skuNum) {
        next() // 放行
      } else {
        // 如果某个数据不存在,从哪里来的就给我回到哪里去
        next(from.path)
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  // 重定向的设置
  {
    path: '/',
    redirect: '/'
  }


]