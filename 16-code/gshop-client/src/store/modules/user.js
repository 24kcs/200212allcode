// 引入storageUtils
import {getUUID} from '@/utils/storageUtils'
const state = {
  // 用户信息对象
  userInfo: {},
  // 用户临时凭证id
  userTempId:getUUID()
}
const mutations = {
  // 直接修改userInfo的方法
}
const actions = {
  // 获取userInfo的异步的方法
}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}