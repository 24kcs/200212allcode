// 引入api接口函数
import { reqTradeInfo, reqPayInfo } from '@/api'
const state = {
  // 订单交易信息对象
  tradeInfo: {},
  // 支付信息对象
  payInfo: {}
}
const mutations = {
  // 修改订单交易信息-----参数也可以放在对象中进行书写
  RECEIVE_TRADE_INFO (state, { tradeInfo }) {
    state.tradeInfo = tradeInfo
  },
  // 修改支付信息
  RECEIVE_PAY_INFO (state, { payInfo }) {
    state.payInfo = payInfo
  }
}
const actions = {
  // 发送异步请求获取订单交易信息
  async getTradeInfo ({ commit }) {
    const result = await reqTradeInfo()
    if (result.code === 200) {
      const tradeInfo = result.data
      commit('RECEIVE_TRADE_INFO', { tradeInfo })
    }
  },
  // 发送异步请求获取支付信息
  async getPayInfo ({ commit }, orderId) {
    const result = await reqPayInfo(orderId)
    if (result.code === 200) {
      const payInfo = result.data
      commit('RECEIVE_PAY_INFO', { payInfo })
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