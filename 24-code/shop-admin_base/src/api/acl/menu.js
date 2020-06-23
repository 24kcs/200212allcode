import request from '@/utils/request'

const api_name = '/admin/acl/permission'

export default {
  
  /* 
  获取权限菜单列表树
  */
  getNestedTreeList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  },
  
  /* 
  删除一个菜单项
  */
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: "delete"
    })
  },
  
  /* 
  保存一级菜单项
  */
  savePermission(permission) {
    return request({
      url: `${api_name}/save`,
      method: "post",
      data: permission
    })
  },

  /* 
  更新某个菜单项
  */
  update(menu) {
    return request({
      url: `${api_name}/update`,
      method: "put",
      data: menu
    })
  },

  /* 
  查看某个角色的权限菜单
  */
  toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  },

  /* 
  给角色授权
  */
  doAssign(roleId, permissionId) {
    return request({
      url: `${api_name}/doAssign`,
      method: "post",
      params: {roleId, permissionId}
    })
  }
}
