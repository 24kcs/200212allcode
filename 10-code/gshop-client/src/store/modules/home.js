// 引入api接口函数
import { reqBaseCategoryList } from '@/api'
const state = {
  // 分类信息数据数组
  baseCategoryList: []
}
const mutations = {
  // 直接修改baseCategoryList状态
  RECEIVE_CATEGORY_LIST (state, baseCategoryList) {
    // state.baseCategoryList = baseCategoryList
    // 干掉后面的两个数据
    state.baseCategoryList = baseCategoryList.splice(0,baseCategoryList.length-2)
  }
}
const actions = {
  // 获取分类信息数据数组
  async getBaseCategoryList ({ commit }) {
    // 发送异步请求获取分类信息数据数组
    const result = await reqBaseCategoryList()
    if (result.code === 200) {
      const baseCategoryList = result.data
      // 提交mutation
      commit('RECEIVE_CATEGORY_LIST', baseCategoryList)
    }
  }
}
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}