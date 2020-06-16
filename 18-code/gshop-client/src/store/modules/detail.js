// 引入api接口函数
import { reqDetailInfo } from '@/api'
const state = {
  // 商品详情信息数据对象
  detailInfo: {}
}
const mutations = {
  // 直接修改当前商品详情信息数据
  RECEIVE_DETAIL_INFO (state,detailInfo) {
    state.detailInfo = detailInfo
  }
}
// 间接修改商品详情信息数据
const actions = {
  async getDetailInfo ({ commit }, skuId) {
    // 调用接口发送请求获取数据
    const result = await reqDetailInfo(skuId)
    // 判断是否成功
    if (result.code === 200) {
      // 修改状态数据
      commit('RECEIVE_DETAIL_INFO', result.data)
    }
  }
}
// 状态数据的计算属性
const getters = {
  // 为了组件内部获取或者操作数据方便,该数据和当前的状态数据息息相关,所以,可以通过定义计算属性的方式来获取相关的数据
  // 三级分类的名称数据对象
  categoryView (state) {
    return state.detailInfo.categoryView || {}
  },
  // 商品的sku相关信息对象
  skuInfo (state) {
    return state.detailInfo.skuInfo || {}
  },
  // 商品的轮播图的图片数据数组
  skuImageList (state) {
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo.skuImageList : []
  },
  // 商品SPU的销售属性列表数组
  spuSaleAttrList (state) {
    return state.detailInfo.spuSaleAttrList || []
  }

}
export default {
  state,
  mutations,
  actions,
  getters
}