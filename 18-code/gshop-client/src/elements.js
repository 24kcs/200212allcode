// 引入Vue
import Vue from 'vue'
// 引入element-ui
import {MessageBox,Message} from 'element-ui'

// 把element-ui组件库中的某几个组件引入后直接 添加到Vue的原型上,组件内部可以直接通过组件的实例对象.方式来使用相关的组件
Vue.prototype.$msgbox = MessageBox // 组件中通过this.$msgbox 显示对话框
Vue.prototype.$alert = MessageBox.alert // 组件中通过this.$alert 解析html标签
Vue.prototype.$message = Message // 组件中通过this.$message 显示提示消息