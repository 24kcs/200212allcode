// 引入About组件
import About from '../pages/About.vue'
// 引入Home组件
import Home from '../pages/Home.vue'
// 暴露出去一个数组
export default [
  // 注册路由组件
  {
    path: '/home',
    component: Home
  },
  // {
  //   path: '/about',
  //   component: About
  // }

  // params 方式进行路由传参:需要占位,同时需要通过组件对象中的$route对象获取参数数据
  // {
  //   path: '/about/:id',
  //   component: About
  // }

  // query 方式进行路由传参: 不需要占位,需要通过组件对象中的$route对象获取参数数据
  // {
  //   path: '/about',
  //   component: About
  // }


  // meta 方式进行路由传参:  无非就是自己需要手动的在注册路由的时候设置meta对象,内部书写自己想要的参数数据
  // {
  //   path: '/about',
  //   component: About,
  //   meta:{
  //     isShow:true
  //   }
  // }


  // props的参数方式1: 布尔模式
  // {
  //   path: '/about/:id',
  //   component: About,
  //   props:true
  // }

  // props的参数方式2: 对象模式
  // {
  //   path: '/about',
  //   component: About,
  //   props:{
  //     msg:'真香啊'
  //   }
  // }

  // props的参数方式3: 函数模式
  {
    path: '/about',
    component: About,
    props:route=>({path:route.path})
  }



  // // 重定向
  // {
  //   path:'/',
  //   redirect:'/home'
  // }
]