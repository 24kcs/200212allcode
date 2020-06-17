// 引入ajax(二次封装axios),内部有请求拦截器和响应拦截
import request from '@/utils/request'
// 封装公共的基础路径
const API_NAME = '/admin/acl/index'
// 默认暴露
export default {
  /* 
  登录
  */
  login(username, password) {
    return request({
      url: `${API_NAME}/login`,
      method: 'post',
      data: {
        username,
        password
      }
    })
  },

  /* 
  根据token获取用户信息
  */
  getInfo() {
    return request({
      url: `${API_NAME}/info`,
      method: 'get',
    })
  },

  /* 
  登出
  */
  logout() {
    return request({
      url: `${API_NAME}/logout`,
      method: 'post'
    })
  },

  /* 
  获取当前用户的菜单权限列表
  */
  getMenu() {
    return request({
      url: `${API_NAME}/menu`,
      method: 'get'
    })
  }
}