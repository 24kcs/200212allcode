// 引入ajax
import request from '@/utils/request'
// 设置api接口的公共路径
const api_name = '/admin/product'
// 向外暴露对象结构
export default {
  // 下架
  cancelSale(skuId){
    return request.get(`${api_name}/cancelSale/${skuId}`)
  },
  // 上架
  onSale(skuId){
    return request.get(`${api_name}/onSale/${skuId}`)
  },
  // 根据skuId删除对应的sku
  deleteSkuBySkuId(skuId){
    return request.delete(`${api_name}/deleteSku/${skuId}`)
  },
  // 根据spuId查找对应的spu下的所有的sku列表数据
  getSkuListBySpuId(spuId){
    return request.get(`${api_name}/findBySpuId/${spuId}`)
  },
  // 根据skuId查找对应的sku的详情信息
  getSkuBySkuId(skuId){
    return request.get(`${api_name}/getSkuById/${skuId}`)
  },
  // 根据页码和每页的条数获取sku列表信息数据
  getSkuList(page,limit){
    return request.get(`${api_name}/list/${page}/${limit}`)
  },
  // 保存sku
  // addSku(skuInfo){
  //   return request.post(`${api_name}/saveSkuInfo`,skuInfo)
  // },
  // // 修改sku
  // updateSku(skuInfo){
  //   return request.post(`${api_name}/updateSkuInfo`,skuInfo)
  // },
  // 保存或者修改sku
  addOrUpdateSku(skuInfo){
    return request.post(`${api_name}/${skuInfo.id?'update':'save'}SkuInfo`,skuInfo)
  },
  // 获取指定的spu的图片列表信息数据
  getSpuImageList(spuId){
    return request.get(`${api_name}/spuImageList/${spuId}`)
  },
  // 根据spuId获取销售属性列表数据
  getSpuSaleAttrList(spuId){
    return request.get(`${api_name}/spuSaleAttrList/${spuId}`)
  }
}
