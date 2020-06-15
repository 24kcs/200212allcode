// 二次封装的axios
// 封装请求拦截器和响应拦截器的
// 引入axios
import axios from 'axios'
// 引入nprogress插件及样式
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入store
import store from '../store'
// 1.设置通用的一个基础路径和请求的超时时间
const ajax = axios.create({
  baseURL: '/api', // 前缀路径
  timeOut: 20000 // 连接请求超时时间
})
// npm install --save nprogress 关于进度条的
// 2.请求拦截器
ajax.interceptors.request.use(config => {
  // 3.请求的时候显示进度条
  Nprogress.start() // 此时是显示进度条(响应成功了,或者是失败的时候需要隐藏进度条)
  // 把用户的临时凭证放在请求头中
  config.headers['userTempId']= store.state.user.userTempId
  // 判断是否有token,如果有token,说明已经登录了,携带token
  const token = store.state.user.userInfo.token
  if(token){
    config.headers['token']= token
  }

  // console.log(config)
  return config
})


// 响应拦截器
ajax.interceptors.response.use(response => {
  // 隐藏进度条
  Nprogress.done()
  // 4.响应成功后直接返回数据
  return response.data

}, error => {
  // 隐藏进度条
  Nprogress.done()
  // 5.统一处理请求的错误,具体的请求可以选择处理或者不处理
  alert('请求出错' + error.message || '未知错误')
  // 中断Promise链,具体的请求不再处理了
  // return new Promise(()=>{})
  return Promise.reject(error) // 返回失败的Promise,具体的请求也可以再处理

})

// 暴露axios对象
export default ajax

