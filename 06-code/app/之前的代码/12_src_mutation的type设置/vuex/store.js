// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入mutation的type
import {INCREMENT,DECREMENT} from './mutation-type'
// 声明使用Vuex
Vue.use(Vuex)

// 包含了多个状态数据的对象
const state = {
  count: 0
}
// 包含了多个直接修改状态数据的方法的对象
const mutations = {
  // mutations对象中的每个方法,都可以叫mutation,每个mutation都有自己的type(type就是类型),每个mutation的名字就是它的类型
  // 每个mutation的名字都是他的type
  // 有的时候,action中或者组件内部想要使用某个mutation的时候,需要传入字符串格式的mutation的type,容易出错,官方提示,可以把mutation的type定义城常量,可以单独的放在一个js文件中
  [INCREMENT] (state) {
    state.count++
  },
  [DECREMENT] (state) {
    state.count--
  }
}
// 包含了多个间接修改状态数据的方法的对象
const actions = {
  // actions对象中的每个方法,都可以叫action
  // 加的操作
  increment (context) {
    context.commit(INCREMENT)
  },
  // 减的操作
  decrement ({ commit }) {
    commit(DECREMENT)

  },
  // 奇数加
  incrementOrOdd ({ commit, state }) {
    if (state.count % 2 !== 0) {
      commit(INCREMENT)
    }
  },
  // 异步加
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit(INCREMENT)
    }, 1000);
  }


}
// 包含了多个状态数据的计算数据的get方法的对象
const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}


// 创建Vuex的实例对象(仓库对象),并暴露出去,在main.js注册仓库对象
export default new Vuex.Store({
  // 配置Vuex对象的
  state,
  mutations,
  actions,
  getters
})
