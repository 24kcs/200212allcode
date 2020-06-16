import request from '@/utils/request'
const API_NAME = '/admin/acl/index'

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