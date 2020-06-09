// 引入Vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 引入state
import state from './state'
// 引入mutations
import mutations from './mutations'
// 引入actions
import actions from './actions'
// 引入getters
import getters from './getters'
// 引入modules模块
import modules from './modules'
// // 引入home 模块
// import home from './modules/home'
// // 引入user 模块
// import user from './modules/user'
// 声明使用插件
Vue.use(Vuex)
// 实例化Vuex产生store对象并暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
  // modules:{
  //   home,
  //   user
  // }
})