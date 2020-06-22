// 引入ajax
import request from '@/utils/request'
// 设置api接口的公共路径
const api_name = '/admin/product'
// 向外暴露对象结构
export default {
  // 获取销售属性
  getSaleAttrList () {
    return request.get(`${api_name}/baseSaleAttrList`)
  },
  // 根据spuId删除对应的spu
  deleteSpuBySpuId (spuId) {
    return request.delete(`${api_name}/deleteSpu/${spuId}`)
  },
  // 根据spuId获取spu信息
  getSpuBySpuId (spuId) {
    return request.get(`${api_name}/getSpuById/${spuId}`)
  },
  // 保存spu
  // addSpu(spuInfo){
  //   return request.post(`${api_name}/saveSpuInfo`,spuInfo)
  // },
  // // 修改spu
  // updateSpu(spuInfo){
  //   return request.post(`${api_name}/updateSpuInfo`,spuInfo)
  // },
  // 保存spu或者修改spu
  addOrUpdateSpu (spuInfo) {
    return request.post(`${api_name}/${spuInfo.id ? 'update' : 'save'}SpuInfo`, spuInfo)
  },
  // 根据页码及每页的条数获取spu数据列表信息
  getSpuList (page, limit, category3Id) {
    return request.get(`${api_name}/${page}/${limit}`, { params: { category3Id } })
  }

}