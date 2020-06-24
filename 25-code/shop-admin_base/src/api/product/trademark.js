// 引入ajax
import request from '@/utils/request'
// 设置api接口的公共路径
const api_name = '/admin/product/baseTrademark'
// 向外暴露对象结构
export default {

  // 获取当前品牌信息的列表数据(需要页码数--当前默认显示第几页的数据,每页的条数)
  getTrademarkList (page, limit) {
    if (page && limit) {
      return request({
        url: `${api_name}/${page}/${limit}`,
        method: 'GET',
      })
    } else {
      return request({
        url: `${api_name}/getTrademarkList`,
        method: 'GET',
      })
    }


    // 第二种写法
    // return request.get(`${api_name}/${page}/${limit}`)
  },
  // 添加品牌信息
  addTrademark (trademark) {
    // 添加品牌或者将来添加数据(id的值是不需要准备这个参数,为什么?后台在数据库中的id是自动生成的)
    // 以后如果涉及到了添加数据的操作,如果说参数的个数一般超过了2个,一般都是传入对象,方便
    return request({
      url: `${api_name}/save`,
      method: 'POST',
      data: trademark
    })
    // return request.post(`${api_name}/save`,trademark)
  },
  // 修改品牌信息(更新)
  updateTrademark (trademark) {
    // 修改或者更新操作,内部是需要id值的
    // 将来在更新或者添加的操作中,很有可能使用的是同一个按钮,判断到底是添加还是修改,只需要判断id值是否存在即可
    return request({
      url: `${api_name}/update`,
      method: 'PUT',
      data: trademark
    })
  },
  // 删除品牌信息
  deleteTrademark (id) {
    // DELETE /admin/product/baseTrademark/remove/{id}
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'DELETE'
    })
  }
}
