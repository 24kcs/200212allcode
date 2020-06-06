// 引入api接口函数
import { reqBaseCategoryList, reqBanners, reqFloors } from '@/api'
const state = {
  // 分类信息数据数组
  baseCategoryList: [],
  // 轮播图数据
  banners: [],
  // 楼层数据
  floors: []
}
const mutations = {
  // 直接修改baseCategoryList状态
  RECEIVE_CATEGORY_LIST (state, baseCategoryList) {
    // state.baseCategoryList = baseCategoryList
    // 干掉后面的两个数据
    state.baseCategoryList = baseCategoryList.splice(0, baseCategoryList.length - 2)
  },
  // 直接修改轮播图的数据
  RECEIVE_BANNERS (state, banners) {
    state.banners = banners
  },
  // 直接修改楼层的数据
  RECEIVE_FLOORS (state, floors) {
    state.floors = floors
  },
}
const actions = {
  // 获取分类信息数据数组
  async getBaseCategoryList ({ commit }) {
    // 发送异步请求获取分类信息数据数组
    const result = await reqBaseCategoryList()
    if (result.code === 200) {
      const baseCategoryList = result.data
      // console.log(baseCategoryList)
      // 提交mutation
      commit('RECEIVE_CATEGORY_LIST', baseCategoryList)
    }
  },
  // 获取轮播图的数据数组
  async getBanners ({ commit }) {
    const result = await reqBanners()
    if (result.code === 200) {
      commit('RECEIVE_BANNERS', result.data)
    }
  },


  // 获取楼层的数据数组
  async getFloors ({ commit }) {
    const result = await reqFloors()
    if (result.code === 200) {
      commit('RECEIVE_FLOORS', result.data)
    }
  },
}
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}