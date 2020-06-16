import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import './test/es-module/test2'
import './test/es-module/test4'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import { hasBtnPermission } from './utils/permission'
import * as API from '@/api'
import HintButton from '@/components/HintButton'
import CategorySelector from '@/components/CategorySelector'

// 注册全局组件
Vue.component('HintButton', HintButton)
Vue.component('CategorySelector', CategorySelector)

Vue.prototype.$hasBP = hasBtnPermission
Vue.prototype.$API = API // 将包含所有接口请求函数的对象让所有组件可见

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
