// 引入组件
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
// 引入News组件和Message组件
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
// 引入MessageDetail组件
import MessageDetail from '../pages/MessageDetail.vue' 
export default [
  // 配合路由(路由要形成一种映射关系,地址:组件)
  {
    path: '/about', // 地址
    component: About // 组件
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/news',
        component: News
      }, {
        path: '/home/message',
        component: Message,
        children:[
          {
            // 路由的链接地址未必一定要和这个地址对应的组件名字一致
            path:'/home/message/detail/:id', // :id --->: 占位,传入的参数会在id属性中存储
            component:MessageDetail,
            props:(route)=>({id:route.params.id})
          }
        ]
      },
       {
        path: '/home', // 或者path:''
        redirect: '/home/news'
      }
    ]
  },
  // 设置路由链接的重定向
  {
    path: '/',
    redirect: '/about'
  }
]