// 引入ajax
import request from '@/utils/request'
// 设置api接口的公共路径
const api_name = '/admin/product'
// 向外暴露对象结构
export default {
  // 根据三级分类的id获取平台数据列表数据
  getAttrList (category1Id, category2Id, category3Id) {
    return request.get(`${api_name}/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
  },
  // 添加或者修改平台属性
  addOrUpdateAttr (attr) {
    console.log(attr)
    return request.post(`${api_name}/saveAttrInfo`, attr)
  },
  // 删除平台属性
  deleteAttr (attrId) {
    return request.delete(`${api_name}/deleteAttr/${attrId}`)
  }
}
