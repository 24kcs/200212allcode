import Vue from 'vue'
// 引入插件
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 声明使用插件---必须先使用
Vue.use(VeeValidate)
// 如果没有配置zh_CN默认就是英文提示,如果配置就是中文的提示
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    mobile: '手机号码',
    code:'图形验证码',
    password:'密码',
    password2:'确认密码'
  }
})
// 表单验证的扩展方法的书写
VeeValidate.Validator.extend('phone1111', {
  // 提示信息
  getMessage: field => `请输入正确的` + field,
  validate: value => (/^[1]\d{10}$/.test(value))
})
VeeValidate.Validator.extend('code', {
  // 提示信息
  getMessage: field => `请输入正确的` + field,
  validate: value => (/^\d{4}$/.test(value))
})


