import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import getters from './getters'

Vue.use(Vuex)

/* 
动态加载vuex中所有的modules模块
不再需要通过import手动一个一个引入
*/
const context = require.context('./modules', false, /\.js$/)
const modules = context.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  modules[moduleName] = context(modulePath).default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  // 解决刷新vuex状态丢失问题
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        // 只储存state中的assessmentData
        dict: val.dict
      }
    }
  })]
})

export default store
