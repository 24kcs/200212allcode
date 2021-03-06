// 引入storageUtils
import { getUUID } from '@/utils/storageUtils'
// 引入api接口函数
import { reqLogin, reqRegister, reqLogout } from '@/api'
const state = {
  // 用户信息对象
  userInfo: {},
  // 用户临时凭证id
  userTempId: getUUID()
}
const mutations = {
  // 直接修改userInfo的方法
  RECEIVE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  // 清空用户信息
  RESET_USER_INFO (state) {
    state.userInfo = {}
  }
}
const actions = {
  // 登录
  async login ({ commit }, { mobile, password }) {
    const result = await reqLogin(mobile, password)
    if (result.code === 200) {
      commit('RECEIVE_USER_INFO', result.data)
    } else {
      throw new Error(result.message || '登录失败')
    }
  },
  // 注册
  async register ({ commit }, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code !== 200) {
      throw new Error(result.message || '注册失败')
    }
  },
  // 退出
  async logout ({ commit }) {
    const result = await reqLogout()
    if (result.code !== 200) {
      throw new Error(result.message || '退出失败')
    } else {
      commit('RESET_USER_INFO')
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