/* 
所有路由的配置
*/

import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import MessageDetail from '../pages/MessageDetail.vue'

export default [{
    path: '/about',
    component: About
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        name: 'news',
        path: '/home/news',
        component: News
      },
      {
        path: 'message',  // path最左边/代表根路径
        component: Message,
        children: [
          {
            path: '/home/message/detail/:id',
            component: MessageDetail,
            props: (route) => ({// 将路由参数映射成标签属性传入
              id: route.params.id
            })
          }
        ]
      },
      { // 自动重定向路由
        path: '',
        redirect: '/home/news'
      }
    ]
  },

  { // 自动重定向路由
    path: '/',
    redirect: '/about'
  }
]