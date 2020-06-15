// 引入api接口函数
import { reqProductList } from '@/api'
const state = {
  // 产品信息数据对象
  productList: {}
}
const mutations = {
  // 修改产品信息数据
  RECEIVE_PRODUCT_LIST (state, productList) {
    state.productList = productList
  }
}
const actions = {
  // 获取产品信息数据
  async getProductList ({ commit }, searchParams) {
    // 在不想修改原来参数对象中的数据的情况下,进行优化操作
    searchParams ={...searchParams}
    // 过滤掉内部空串的参数数据
    Object.keys(searchParams).forEach(key=>{
      if(searchParams[key]===''||searchParams[key] instanceof Array && searchParams[key].length===0){
        delete searchParams[key]
      }
    })

    // 调用接口,发送异步请求,并传入参数数据---对象(包含了很多的参数)
    const result = await reqProductList(searchParams)
    if (result.code === 200) {
      commit('RECEIVE_PRODUCT_LIST', result.data)
    }
  }

}
const getters = {
  // 为了外部组件方便的操作品牌,平台属性,商品信息,封装成计算属性
  // 品牌信息数据---数组
  trademarkList (state) {
    return state.productList.trademarkList
  },
  // 平台属性数据---数组
  attrsList (state) {
    return state.productList.attrsList
  },
  // 商品信息数据---数组
  goodsList (state) {
    return state.productList.goodsList
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}